"""Regenerate public-script narration, shared scene timing, captions and Remotion MP4s.
Only the repository's approved public text is sent to Microsoft Edge TTS.
"""
import argparse
import asyncio
import hashlib
import json
import math
from pathlib import Path
import subprocess

import edge_tts

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
VOICES = {'en': 'en-US-AriaNeural', 'zh': 'zh-CN-XiaoxiaoNeural'}
FPS = 30
LEAD = 0.4
TAIL = 0.6


def run(*args):
    return subprocess.check_output([str(a) for a in args], text=True)


def duration(path):
    return float(run('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', path))


def save(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def timestamp(seconds):
    ms = round(seconds * 1000)
    return f'{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02}.{ms % 1000:03}'


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--reuse', action='store_true', help='Use matching committed Edge segments without network')
    parser.add_argument('--render', action='store_true')
    args = parser.parse_args()
    steps = json.loads((ROOT / 'src/data/extraction-video.json').read_text())
    assets = HERE / 'public/narration'
    assets.mkdir(parents=True, exist_ok=True)
    if not args.reuse:
        available = {v['ShortName'] for v in await edge_tts.list_voices()}
        assert set(VOICES.values()) <= available, 'Selected voices no longer available'
    records = {}
    for lang, voice in VOICES.items():
        records[lang] = []
        for i, (title, text) in enumerate(steps[lang]):
            spoken = title + ('. ' if lang == 'en' else '。') + text
            digest = hashlib.sha256((voice + '|+0%|' + spoken).encode()).hexdigest()
            path = assets / f'{lang}-{i + 1}.mp3'
            marker = path.with_suffix('.json')
            if args.reuse:
                assert path.exists() and json.loads(marker.read_text())['sha256'] == digest, f'Stale/missing segment: {path}'
            else:
                for attempt in range(3):
                    try:
                        await edge_tts.Communicate(spoken, voice, rate='+0%').save(str(path))
                        break
                    except Exception:
                        if attempt == 2:
                            raise
                        await asyncio.sleep(2 ** (attempt + 1))
                save(marker, {'sha256': digest, 'voice': voice, 'text': spoken, 'provider': 'edge-tts', 'version': edge_tts.__version__})
            records[lang].append({'file': path.name, 'duration': duration(path), 'text': spoken})
            print(lang, i + 1, records[lang][-1]['duration'], flush=True)
    frames = [math.ceil((LEAD + max(records[l][i]['duration'] for l in VOICES) + TAIL) * FPS) for i in range(8)]
    starts = [sum(frames[:i]) for i in range(8)]
    total = sum(frames)
    timing = {'fps': FPS, 'durationInFrames': total, 'duration': total / FPS, 'leadSeconds': LEAD, 'scenes': [{'startFrame': start, 'durationInFrames': length} for start, length in zip(starts, frames)], 'voices': VOICES, 'segments': records}
    captions = {}
    for lang in VOICES:
        padded = []
        captions[lang] = []
        vtt = ['WEBVTT', '']
        for i, scene in enumerate(timing['scenes']):
            path = assets / records[lang][i]['file']
            wav = HERE / f'out/{lang}-{i}.wav'
            wav.parent.mkdir(exist_ok=True)
            run('ffmpeg', '-v', 'error', '-y', '-i', path, '-af', f'adelay=400:all=1,apad', '-t', frames[i] / FPS, '-ar', '48000', '-ac', '1', wav)
            padded.append(wav)
            start, end = starts[i] / FPS, (starts[i] + frames[i]) / FPS
            text = '. '.join(steps[lang][i])
            vtt.extend([f'{timestamp(start)} --> {timestamp(end)}', text, ''])
            captions[lang].append({'text': text, 'startMs': round(start * 1000), 'endMs': round(end * 1000), 'timestampMs': None, 'confidence': None})
        concat = HERE / f'out/{lang}-concat.txt'
        concat.write_text(''.join(f"file '{p}'\n" for p in padded))
        run('ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', concat, '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', assets / f'{lang}.m4a')
        (ROOT / f'public/media/extraction-{lang}.vtt').write_text('\n'.join(vtt))
    timing['version'] = hashlib.sha256(json.dumps(timing, sort_keys=True).encode()).hexdigest()[:12]
    save(ROOT / 'src/data/extraction-timing.json', timing)
    save(HERE / 'src/timing.json', timing)
    save(HERE / 'src/steps.json', steps)
    save(HERE / 'captions.json', captions)
    if args.render:
        for lang in VOICES:
            raw = HERE / f'out/{lang}-raw.mp4'
            subprocess.run(['npx', 'remotion', 'render', 'src/index.ts', f'Extraction{lang.upper()}', str(raw), '--codec=h264', '--crf=28', '--concurrency=2'], cwd=HERE, check=True)
            run('ffmpeg', '-v', 'error', '-y', '-i', raw, '-i', assets / f'{lang}.m4a', '-map', '0:v:0', '-map', '1:a:0', '-c', 'copy', '-metadata:s:a:0', f'language={"eng" if lang == "en" else "zho"}', '-movflags', '+faststart', ROOT / f'public/media/extraction-{lang}.mp4')
    print(json.dumps({'duration': total / FPS, 'frames': total, 'version': timing['version']}))


if __name__ == '__main__':
    asyncio.run(main())

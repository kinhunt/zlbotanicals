import React from 'react';
import {Composition} from 'remotion';
import {Extraction} from './Composition';
export const RemotionRoot: React.FC = () => <>
 <Composition id="ExtractionEN" component={Extraction} durationInFrames={1200} fps={30} width={1280} height={720} defaultProps={{lang:'en' as const}} />
 <Composition id="ExtractionZH" component={Extraction} durationInFrames={1200} fps={30} width={1280} height={720} defaultProps={{lang:'zh' as const}} />
</>;

import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate} from 'remotion';
import timing from './timing.json';
import steps from './steps.json';
export const Extraction: React.FC<{lang:'en'|'zh'}> = ({lang}) => {
 const frame=useCurrentFrame();
 const index=timing.scenes.findIndex(scene=>frame < scene.startFrame+scene.durationInFrames);
 const local=frame-timing.scenes[index].startFrame;
 const zh=lang==='zh';
 const [title,description]=steps[lang][index];
 return <AbsoluteFill style={{background:'#edf3e8',color:'#193b2c',fontFamily:'"Noto Sans CJK SC", Arial, sans-serif',padding:64}}>
  <Audio src={staticFile(`narration/${lang}.m4a`)} />
  <div style={{fontSize:21,letterSpacing:2,fontWeight:700}}>ZL BOTANICALS / {zh?'植物知识库':'EXTRACTION EXPLAINED'}</div>
  <div style={{position:'absolute',right:64,top:64,fontSize:21}}>{String(index+1).padStart(2,'0')} / 08</div>
  <div style={{display:'flex',gap:42,alignItems:'center',height:420,opacity:interpolate(local,[0,12],[0,1],{extrapolateRight:'clamp'})}}>
   <div style={{width:170,height:170,flexShrink:0,border:'3px solid #719365',borderRadius:85,display:'flex',alignItems:'center',justifyContent:'center',fontSize:90,fontWeight:700,background:'#dce8d2'}}>{index===7?'↺':index+1}</div>
   <div style={{flex:1}}><div style={{fontSize:zh?66:58,lineHeight:1.15,fontWeight:700,marginBottom:24}}>{title}</div><div style={{fontSize:zh?34:32,lineHeight:1.5,maxWidth:830}}>{description}</div></div>
  </div>
  <div style={{display:'flex',gap:12,position:'absolute',bottom:140,left:64,right:64}}>{steps[lang].map((_,i)=><div key={i} style={{height:8,flex:1,background:i<=index?'#436d32':'#c8d6be',borderRadius:4}} />)}</div>
  <div style={{position:'absolute',bottom:66,left:64,right:64,fontSize:23,color:'#43583a',borderTop:'1px solid #b7c8ac',paddingTop:18}}>{zh?'概念示意 · 非真实厂房 · 路线需按产品验证':'CONCEPTUAL SCHEMATIC · NOT A REAL FACILITY · PRODUCT-SPECIFIC VALIDATION REQUIRED'}</div>
 </AbsoluteFill>;
};

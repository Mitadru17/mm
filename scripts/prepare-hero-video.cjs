/** Offline asset build. Runtime does not depend on FFmpeg or this tool. */
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const ffmpeg=process.env.MYSTIC_FFMPEG || require('../.codex/media-tools/node_modules/ffmpeg-static');
const source=path.join(root,'videos/hero.MOV'),desktop=path.join(root,'public/videos/mystic-hero-desktop.mp4'),mobile=path.join(root,'public/videos/mystic-hero-mobile.mp4');
if(!fs.existsSync(source)||!fs.existsSync(ffmpeg))throw new Error('Provide videos/hero.MOV and set MYSTIC_FFMPEG to a full FFmpeg build with libx264, zscale and tonemap.');
fs.mkdirSync(path.dirname(desktop),{recursive:true});
function run(args){const result=spawnSync(ffmpeg,['-hide_banner','-loglevel','warning','-y',...args],{stdio:'inherit'});if(result.status!==0)throw result.error||new Error(`FFmpeg exited ${result.status}`);}
// Scenic opening only. Slow the 60fps capture to120%, convert HLG to SDR709,
// and blend the tail into the opening so the native video loop has no hard cut.
run(['-i',source,'-filter_complex','[0:v]trim=duration=10.8,setpts=1.2*(PTS-STARTPTS),fps=30,scale=1600:-2,zscale=t=linear:npl=100,format=gbrpf32le,tonemap=tonemap=hable:desat=0,zscale=p=bt709:t=bt709:m=bt709:r=tv,format=yuv420p,split=2[body][head];[body]trim=start=1.2,setpts=PTS-STARTPTS[a];[head]trim=duration=1.2,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=1.2:offset=10.56,format=yuv420p[v]','-map','[v]','-an','-map_metadata','-1','-c:v','libx264','-preset','medium','-crf','23','-maxrate','4M','-bufsize','8M','-threads','4','-g','60','-sc_threshold','0','-movflags','+faststart','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709',desktop]);
run(['-i',desktop,'-vf','crop=506:900:547:0,scale=608:1080','-an','-map_metadata','-1','-c:v','libx264','-preset','medium','-crf','24','-threads','4','-g','60','-sc_threshold','0','-movflags','+faststart',mobile]);
run(['-i',desktop,'-frames:v','1','-c:v','libwebp','-quality','85',path.join(root,'public/images/hero-video-poster.webp')]);
console.log('Prepared desktop film, portrait phone film and matching poster. Original MOV retained.');

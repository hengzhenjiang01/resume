import { useMemo, useRef, useState } from 'react';
import { galleryPhotos } from '../data/projects';

export default function Gallery({language}) {
  const zh=language==='zh', sphere=useRef(null), stage=useRef(null), pointer=useRef(null), drag=useRef(0), rotation=useRef({x:-15,y:0}), ritualVideo=useRef(null);
  const [paused,setPaused]=useState(false), [selected,setSelected]=useState(null), [ritualPaused,setRitualPaused]=useState(false), [ritualOpen,setRitualOpen]=useState(false);
  const items=useMemo(()=>Array.from({length:114},(_,i)=>{const photo=galleryPhotos[i%galleryPhotos.length],phi=Math.acos(1-2*(i+.5)/114),theta=Math.PI*(1+Math.sqrt(5))*i,r=176;return {photo,transform:`translate3d(${r*Math.cos(theta)*Math.sin(phi)}px, ${r*Math.sin(theta)*Math.sin(phi)}px, ${r*Math.cos(phi)}px) rotateY(${theta*180/Math.PI+90}deg) rotateX(${90-phi*180/Math.PI}deg)`};}),[]);
  const down=e=>{pointer.current={x:e.clientX,y:e.clientY};drag.current=0;stage.current.setPointerCapture(e.pointerId);setPaused(true)};
  const move=e=>{if(!pointer.current)return;const dx=e.clientX-pointer.current.x,dy=e.clientY-pointer.current.y;drag.current+=Math.abs(dx)+Math.abs(dy);rotation.current.y+=dx*.35;rotation.current.x=Math.max(-50,Math.min(25,rotation.current.x-dy*.2));pointer.current={x:e.clientX,y:e.clientY};sphere.current.style.animation='none';sphere.current.style.transform=`rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`};
  const toggle=()=>{const next=!paused;if(!next){sphere.current.style.animation='';sphere.current.style.transform=''}setPaused(next)};
  const toggleRitual=e=>{e.stopPropagation();const video=ritualVideo.current;if(!video)return;if(video.paused){video.play();setRitualPaused(false)}else{video.pause();setRitualPaused(true)}};

  return <section className="gallery-section" id="gallery">
    <div className="gallery-copy">
      <p className="eyebrow">{zh?'生活片段 / 2024—26':'FIELD NOTES / 2024—26'}</p>
      <h2>{zh?<>这些瞬间让<br/><em>我的视角保持开阔。</em></>:<>Moments that keep<br/><em>my perspective wide.</em></>}</h2>
      <p>{zh?'拖动照片球进行探索，点击任意照片即可查看大图。':'Drag the sphere to explore. Select any image to see it full size.'}</p>
    </div>
    <figure className="ritual-card" onClick={()=>setRitualOpen(true)}>
      <figcaption><span>SMALL RITUAL / 01</span><small>{zh?'一杯咖啡的时间':'A quiet coffee interval'}</small></figcaption>
      <div className="ritual-media">
        <video ref={ritualVideo} autoPlay muted loop playsInline preload="metadata" poster="./assets/field-notes/coffee-ritual-poster.png">
          <source src="./assets/field-notes/coffee-ritual.mp4" type="video/mp4"/>
        </video>
        <button type="button" className="ritual-control" aria-label={ritualPaused?(zh?'播放咖啡动画':'Play coffee animation'):(zh?'暂停咖啡动画':'Pause coffee animation')} onClick={toggleRitual}>{ritualPaused?'▷':'‖'}</button>
      </div>
    </figure>
    <div className="orbit-wrap" aria-label="Interactive photo orbit">
      <div className="orbit-label label-top">FIELD NOTES / 2024—26</div>
      <div className="orbit-label label-bottom">{zh?'拖动 · 点击放大':'DRAG · CLICK TO EXPAND'}</div>
      <div ref={stage} className="sphere-stage" onPointerDown={down} onPointerMove={move} onPointerUp={()=>pointer.current=null} onPointerCancel={()=>pointer.current=null}><div ref={sphere} className={`sphere ${paused?'paused':''}`}>{items.map((item,i)=><figure className="photo" style={{transform:item.transform}} key={i}><button className="photo-button" type="button" aria-label={`View field note ${i+1}`} onClick={()=>{if(drag.current<=4)setSelected({...item,index:i+1})}}><img src={`./assets/gallery-v2/${item.photo}`} alt={`Jennifer's field note ${i+1}`} loading={i>16?'lazy':'eager'}/></button></figure>)}</div></div>
      <button className="orbit-control" type="button" aria-pressed={paused} onClick={toggle}>{paused?(zh?'继续旋转':'Resume motion'):(zh?'暂停旋转':'Pause motion')}</button>
    </div>
    {selected&&<dialog open className="photo-modal" onClick={e=>{if(e.currentTarget===e.target)setSelected(null)}}><button className="photo-modal-close" aria-label="Close image preview" onClick={()=>setSelected(null)}>×</button><img src={`./assets/gallery-v2/${selected.photo}`} alt={`Jennifer's field note ${selected.index}`}/><p>{zh?'生活片段':'Field note'} {selected.index} / {items.length}</p></dialog>}
    {ritualOpen&&<dialog open className="ritual-modal" onClick={e=>{if(e.currentTarget===e.target)setRitualOpen(false)}}><button className="ritual-modal-close" aria-label="Close coffee video" onClick={()=>setRitualOpen(false)}>×</button><video autoPlay muted loop playsInline controls poster="./assets/field-notes/coffee-ritual-poster.png"><source src="./assets/field-notes/coffee-ritual.mp4" type="video/mp4"/></video><p>SMALL RITUAL / 01</p></dialog>}
  </section>;
}

export default function Navbar({language,onToggle}) {
  const zh=language==='zh';
  return <header className="site-header"><a className="wordmark" href="#top">JENNIFER <span>JIANG</span></a><nav aria-label="Primary navigation"><a href="#work">{zh?'作品':'Work'}</a><a href="#skills">{zh?'技能':'Skills'}</a><a href="#about">{zh?'关于我':'About'}</a></nav><div className="header-actions"><button className="language-toggle" type="button" onClick={onToggle} aria-label={zh?'Switch to English':'切换为中文'}>{zh?'EN':'中文'}</button><a className="header-link" href="mailto:hengzhen.jiang@duke.edu">{zh?'联系我 ↗':'Get in touch ↗'}</a></div></header>;
}

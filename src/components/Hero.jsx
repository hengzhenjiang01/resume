export default function Hero({language}) {
  const zh=language==='zh';
  return <section className="hero">
    <div className="hero-sticky">
      <div className="hero-copy">
        <p className="eyebrow">{zh?'个人作品集 · 2026':'PORTFOLIO · 2026'}</p>
        <h1 aria-label="姜蘅珍 Jennifer">
          <span className="hero-title-line"><span>姜蘅珍</span></span>
          <span className="hero-title-line"><em>Jennifer</em></span>
        </h1>
        <div className="hero-education">
          <p>{zh?'杜克大学':'Duke University'}</p>
          <strong>{zh?'金融科技工程硕士':'Master of Engineering in Financial Technology'}</strong>
          <span>{zh?'硕士研究生 · 美国北卡罗来纳州达勒姆':'Graduate student · Durham, North Carolina'}</span>
        </div>
        <p className="intro">{zh?'我的工作横跨用户研究、数据分析、国际增长与可落地的 AI 系统。':'I work across audience research, data analysis, international growth, and practical AI systems.'}</p>
        <a className="text-link" href="#work">{zh?'查看精选作品':'Explore selected work'} <span>↓</span></a>
      </div>
      <figure className="hero-media">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="./assets/hero/hero-background.mp4" type="video/mp4"/>
        </video>
      </figure>
    </div>
  </section>;
}

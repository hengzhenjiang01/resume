const photos = Array.from({ length: 76 }, (_, index) => `gallery-${String(index + 1).padStart(3, '0')}.jpg`);
const photoBasePath = 'assets/gallery-v2';
const sphere = document.querySelector('#sphere');
const stage = document.querySelector('#sphere-stage');
const radius = 176;
const spherePhotos = Array.from({ length: 114 }, (_, index) => photos[index % photos.length]);
spherePhotos.forEach((photo, index) => {
  const node = document.createElement('figure');
  const phi = Math.acos(1 - 2 * (index + .5) / spherePhotos.length);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  const x = radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(phi);
  node.className = 'photo';
  node.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${theta * 180 / Math.PI + 90}deg) rotateX(${90 - phi * 180 / Math.PI}deg)`;
  node.innerHTML = `<button class="photo-button" type="button" aria-label="View field note ${index + 1}" data-photo="${photo}" data-index="${index + 1}"><img src="${photoBasePath}/${photo}?v=2" alt="Jennifer's field note ${index + 1}" loading="${index > 16 ? 'lazy' : 'eager'}"></button>`;
  sphere.appendChild(node);
});

let pointerStart = null;
let xRotation = -15;
let yRotation = 0;
let dragDistance = 0;
const spinToggle = document.querySelector('#spin-toggle');
const setPaused = (paused) => {
  sphere.classList.toggle('paused', paused);
  const isChinese = document.documentElement.lang === 'zh-CN';
  spinToggle.textContent = paused ? (isChinese ? '继续旋转' : 'Resume motion') : (isChinese ? '暂停旋转' : 'Pause motion');
  spinToggle.setAttribute('aria-pressed', String(paused));
};

stage.addEventListener('pointerdown', (event) => {
  pointerStart = { x:event.clientX, y:event.clientY };
  dragDistance = 0;
  stage.setPointerCapture(event.pointerId);
  setPaused(true);
});
stage.addEventListener('pointermove', (event) => { if (!pointerStart) return; const dx = event.clientX - pointerStart.x; const dy = event.clientY - pointerStart.y; dragDistance += Math.abs(dx) + Math.abs(dy); yRotation += dx * .35; xRotation -= dy * .2; xRotation = Math.max(-50, Math.min(25, xRotation)); pointerStart = { x:event.clientX, y:event.clientY }; sphere.style.animation = 'none'; sphere.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`; });
const endDrag = () => { pointerStart = null; };
stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);

spinToggle.addEventListener('click', () => {
  const shouldPause = !sphere.classList.contains('paused');
  if (!shouldPause && sphere.style.animation === 'none') {
    sphere.style.animation = '';
    sphere.style.transform = '';
  }
  setPaused(shouldPause);
});

const photoModal = document.querySelector('#photo-modal');
const photoModalImage = document.querySelector('#photo-modal-image');
const photoModalCaption = document.querySelector('#photo-modal-caption');
document.querySelectorAll('.photo-button').forEach((button) => button.addEventListener('click', () => {
  if (dragDistance > 4) return;
  photoModalImage.src = `${photoBasePath}/${button.dataset.photo}?v=2`;
  photoModalImage.alt = button.querySelector('img').alt;
  photoModalCaption.textContent = `${document.documentElement.lang === 'zh-CN' ? '生活片段' : 'Field note'} ${button.dataset.index} / ${spherePhotos.length}`;
  photoModal.showModal();
}));
document.querySelector('.photo-modal-close').addEventListener('click', () => photoModal.close());
photoModal.addEventListener('click', (event) => { if (event.target === photoModal) photoModal.close(); });

const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-content');
const projectDetails = {
  ethereum: { eyebrow:'BLOCKCHAIN ANALYTICS · TEAM RESEARCH PROJECT', title:'Ethereum Token Risk Classification', body:'<section class="ethereum-detail-section"><h3>01 / Key finding</h3><p>Spam tokens were more likely to cluster within a narrow block window and show concentrated distribution patterns.</p><p><b>34.0%</b> of spam tokens were active in only one block, compared with <b>7.2%</b> of legitimate tokens.</p><figure class="ethereum-bar-chart" aria-label="Tokens active in only one block"><figcaption>Tokens active in only one block</figcaption><div class="ethereum-bars"><div class="ethereum-bar-item"><span class="bar-value">7.2%</span><div class="bar-track"><i class="bar legitimate-bar"></i></div><span class="bar-label">Legitimate</span></div><div class="ethereum-bar-item"><span class="bar-value">34.0%</span><div class="bar-track"><i class="bar spam-bar"></i></div><span class="bar-label">Spam</span></div></div></figure></section><section class="ethereum-detail-section"><h3>02 / Method</h3><p>Symbol collisions were used to construct training labels, not as model inputs. The classifier learned on-chain behavior rather than memorizing the labeling rule.</p></section><aside class="ethereum-research-note"><h3>Research note</h3><p>We also tested semi-supervised expansion with approximately 8,750 unlabeled tokens, but it did not improve performance. Distribution shift and pseudo-label noise made the supervised model more reliable.</p></aside><section class="ethereum-detail-section"><h3>03 / Team contribution</h3><p>Team project. I contributed across the research pipeline—from problem framing and label construction to feature engineering, model comparison, and interpretation.</p></section>' },
  iqiyi: { eyebrow:'02 / AUDIENCE INTELLIGENCE', title:'How I structured the research', body:'<p>Rather than looking only at overall preference, I compared content, audiences, and pathways together.</p><section class="iqiyi-modal-step"><h3>01 Content preference</h3><p>Compared awareness, viewing interest, and preferences across Asian dramas, short-form dramas, animation, and AI content.</p></section><section class="iqiyi-modal-step"><h3>02 Audience segmentation</h3><p>Cross-analyzed country, age, membership status, and ethnicity to identify where the same content carries different value.</p></section><section class="iqiyi-modal-step"><h3>03 Growth pathways</h3><p>Examined how people discover content and how that interest connects to iQIYI touchpoints.</p></section><section class="iqiyi-modal-output"><h3>Output</h3><p>Synthesized the analysis into a research report to inform English-region content selection, off-platform discovery, and product consideration.</p></section>' },
  lovart: { eyebrow:'03 / CREATOR GROWTH + AUTOMATION', title:'Creator Operations at Lovart', body:'<p>I worked across campaign strategy, creator operations, content quality, and workflow design for an AIGC product expanding in U.S. and European markets.</p><ul class="modal-list"><li>Planned audience-specific campaign directions for SMB, design, and video-creator segments.</li><li>Conducted 500+ creator outreach conversations and supported 85 published assets generating 10M+ total views.</li><li>Reviewed creator content against product-understanding and expression standards.</li><li>Built a LangChain, Python, and Feishu API workflow to synchronize collaboration records, match duplicates, and backfill publishing information.</li></ul>' },
  dewu: { eyebrow:'04 / GROWTH EXPERIMENTATION', title:'Dewu Beauty Card Growth', body:'<p>For a beauty-card membership initiative, I used behavioral data to make activation more targeted and merchant incentives more measurable.</p><ul class="modal-list"><li>Used SQL and Python to segment high-intent and broader-intent audiences from purchase frequency and browsing depth.</li><li>Designed differentiated SMS outreach and validated the approach through A/B testing.</li><li>Contributed to 500+ new cardholders and an approximately 12% month-over-month lift in card activation.</li><li>Built a BI monitoring view for activation and SKU-redemption funnels, helping reduce subsidy cost by approximately 15%.</li></ul>' }
};
const projectDetailsZh = {
  ethereum: { eyebrow:'BLOCKCHAIN ANALYTICS · 团队研究项目', title:'以太坊代币风险识别', body:'<section class="ethereum-detail-section"><h3>01 / 主要发现</h3><p>Spam token 往往在较短的区块窗口内集中活动，并呈现更集中的分发结构。</p><p><b>34.0%</b> 的 spam token 仅活跃于一个区块；对应的 legitimate token 为 <b>7.2%</b>。</p><figure class="ethereum-bar-chart" aria-label="仅活跃于一个区块的代币比例"><figcaption>仅活跃于一个区块的代币比例</figcaption><div class="ethereum-bars"><div class="ethereum-bar-item"><span class="bar-value">7.2%</span><div class="bar-track"><i class="bar legitimate-bar"></i></div><span class="bar-label">Legitimate</span></div><div class="ethereum-bar-item"><span class="bar-value">34.0%</span><div class="bar-track"><i class="bar spam-bar"></i></div><span class="bar-label">Spam</span></div></div></figure></section><section class="ethereum-detail-section"><h3>02 / 方法说明</h3><p>同名冲突规则只用于构造训练标签，并未被作为模型特征输入。模型学习的是链上行为，而不是直接记住标签规则。</p></section><aside class="ethereum-research-note"><h3>研究注记</h3><p>团队还尝试利用约 8,750 个未标注 token 进行半监督扩充，但没有改善结果。未标注样本与已有标签的行为分布不同，伪标签会带入额外噪声，因此未被采用。</p></aside><section class="ethereum-detail-section"><h3>03 / 团队贡献</h3><p>团队项目；我参与了从问题定义、标签构建、特征工程到模型比较与结果解释的完整研究流程。</p></section>' },
  iqiyi: { eyebrow:'02 / 受众洞察', title:'我如何组织这次分析', body:'<p>不是只看整体偏好，而是同时比较内容、人群与路径：</p><section class="iqiyi-modal-step"><h3>01 内容偏好</h3><p>比较亚洲剧、微剧、动漫及 AI 内容的观看兴趣、认知与偏好差异。</p></section><section class="iqiyi-modal-step"><h3>02 受众分层</h3><p>按国家、年龄、会员状态和族裔交叉拆分，识别同一内容对不同人群的意义。</p></section><section class="iqiyi-modal-step"><h3>03 增长承接</h3><p>进一步查看用户通过哪些渠道发现内容，以及内容兴趣如何与 iQIYI 的产品触点连接。</p></section><section class="iqiyi-modal-output"><h3>研究产出</h3><p>将上述分析整理为面向英语地区内容与运营讨论的研究报告，为内容选型、站外触达与产品承接提供参考。</p></section>' },
  lovart: { eyebrow:'03 / 创作者增长与自动化', title:'Lovart 创作者运营', body:'<p>面向欧美市场的 AIGC 产品，我参与了活动策略、创作者运营、内容质量和工作流设计。</p><ul class="modal-list"><li>面向中小企业、设计师和视频创作者规划差异化活动方向。</li><li>完成 500+ 次创作者沟通，支持 85 条内容发布并获得 1,000 万+ 播放。</li><li>依据产品理解和表达标准审核创作者内容。</li><li>使用 LangChain、Python 和飞书 API 构建合作记录自动同步工作流。</li></ul>' },
  dewu: { eyebrow:'04 / 增长实验', title:'得物美妆卡增长', body:'<p>围绕美妆卡会员项目，我利用行为数据提升激活触达的针对性，并让商家激励效果可衡量。</p><ul class="modal-list"><li>使用 SQL 和 Python，基于购买频次与浏览深度划分高意向和泛意向人群。</li><li>设计差异化短信触达，并通过 A/B 测试验证。</li><li>贡献 500+ 新增持卡用户，激活率环比提升约 12%。</li><li>搭建激活与 SKU 核销漏斗看板，帮助补贴成本降低约 15%。</li></ul>' }
};

let currentLanguage = localStorage.getItem('portfolio-language') === 'zh' ? 'zh' : 'en';
const translations = [
  ['nav a:nth-child(1)','Work','作品'],['nav a:nth-child(2)','Skills','技能'],['nav a:nth-child(3)','About','关于我'],['.header-link','Get in touch ↗','联系我 ↗'],
  ['.hero .eyebrow','PORTFOLIO · 2026','个人作品集 · 2026'],['.hero h1','<span>姜蘅珍</span><br><em>Jennifer</em>','<span>姜蘅珍</span><br><em>Jennifer</em>',true],['.hero-education p','Duke University','杜克大学'],['.hero-education strong','Master of Engineering in Financial Technology','金融科技工程硕士'],['.hero-education span','Graduate student · Durham, North Carolina','硕士研究生 · 美国北卡罗来纳州达勒姆'],
  ['.hero .intro','I work across audience research, data analysis, international growth, and practical AI systems.','我的工作横跨用户研究、数据分析、国际增长与可落地的 AI 系统。'],['.hero .text-link','Explore selected work <span>↓</span>','查看精选作品 <span>↓</span>',true],['.hero-index span:first-child','JIANG HENGZHEN','姜蘅珍 JENNIFER'],['.hero-index span:last-child','DUKE FINTECH','杜克大学 · 金融科技'],
  ['.numbers article:nth-child(1) span','responses analyzed for international content strategy','份问卷，用于国际内容策略分析'],['.numbers article:nth-child(2) span','views delivered across 85 creator collaborations','次播放，来自 85 次创作者合作'],['.numbers article:nth-child(3) span','ROC–AUC on Ethereum token-spam detection','以太坊代币垃圾信息识别 ROC–AUC'],
  ['.section-heading .eyebrow','SELECTED WORK','精选作品'],['.section-heading>p:last-child','Research, systems, and experiments that turn ambiguous user behavior into decisions.','把模糊的用户行为转化为决策的研究、系统与实验。'],
  ['.ethereum-project .project-meta>span:first-child','01 / DATA RESEARCH','01 / 数据研究'],['.ethereum-project h2','Ethereum Token<br>Risk Classification','以太坊代币风险识别',true],['.ethereum-project .project-summary','For tokens that imitate the symbols of verified assets, we built a behavioral classification prototype. It analyzes approximately 2.16M transfer events to compare risk patterns across token contracts.','针对同名仿冒 token，我们构建了一个基于链上行为的分类研究原型：从约 216 万笔转账记录中提取行为信号，用于比较不同 token 的风险行为。'],['.ethereum-facts span:nth-child(1)','<b>2.16M</b> token transfers','<b>216 万</b>笔 token 转账',true],['.ethereum-facts span:nth-child(2)','<b>3,606</b> labeled tokens','<b>3,606</b> 个标注代币',true],['.ethereum-facts span:nth-child(3)','<b>27</b> behavioral features','<b>27</b> 个行为特征',true],['.ethereum-shap-figure figcaption','Rather than token names, the model relied most on activity spread, transfer value, and sender concentration.','模型最依赖的不是 token 名称，而是活跃区块范围、转账金额与发送者集中度等行为信号。'],['.ethereum-heldout span','held-out test tokens','留出测试代币'],['.ethereum-footer>span','Behavioral classification prototype','链上行为分类研究原型'],
  ['.iqiyi-project .project-meta>span:first-child','02 / AUDIENCE INTELLIGENCE','02 / 受众洞察'],['.iqiyi-project h2','English-region Content<br>Audience Insights','英语地区内容用户洞察',true],['.iqiyi-project .project-summary','For iQIYI’s annual English-region user research, I built a framework connecting content preference, audience segmentation, and growth pathways. Using Python, I analyzed 33,876 completed responses across content interests, membership status, age, country, and discovery channels.','面向英语地区年度用户调研，我搭建了「内容偏好—受众分层—增长承接」分析框架，基于 33,876 份回收问卷，使用 Python 对内容偏好、会员状态、年龄、国家及触达路径进行交叉分析。'],['.iqiyi-role','Research framework · Python visualization · Content insights','内容分析框架搭建 · Python 可视化分析 · 内容研究'],['.iqiyi-metrics>div:nth-child(1) span','completed responses','回收问卷'],['.iqiyi-metrics>div:nth-child(2) span','content directions','内容方向'],['.iqiyi-metrics>div:nth-child(2) small','Asian dramas / short-form dramas / animation / AI content','亚洲剧 / 微剧 / 动漫 / AI 内容'],['.iqiyi-metrics>div:nth-child(3) span','analysis layers','分析层'],['.iqiyi-metrics>div:nth-child(3) small','Content preference / audience segmentation / growth pathways','内容偏好 / 受众分层 / 增长承接'],['.iqiyi-path>div:nth-of-type(1) h3','Content preference','内容偏好'],['.iqiyi-path>div:nth-of-type(1) p','What role does each content direction play in English-region markets?','不同内容在英语地区承担什么角色'],['.iqiyi-path>div:nth-of-type(2) h3','Audience segmentation','受众分层'],['.iqiyi-path>div:nth-of-type(2) p','Country · age · membership status · ethnicity','国家 · 年龄 · 会员状态 · 族裔'],['.iqiyi-path>div:nth-of-type(3) h3','Growth pathways','增长承接'],['.iqiyi-path>div:nth-of-type(3) p','Where people discover content and how they enter iQIYI','用户从哪里发现内容，以及如何进入 iQIYI'],['.iqiyi-findings h3','Content does not play a single role in growth.','内容不是一个统一的增长变量。'],['.iqiyi-findings p:nth-child(1)','Different content categories serve different moments in the user journey. Chinese dramas form a consumption base; BL/GL resonates more strongly with younger members; Korean dramas and animation show stronger acquisition potential.','不同内容在用户生命周期中承担不同角色：陆剧是现有内容消费的基本盘；BL/GL 对年轻会员更具吸引力；韩剧与动漫显示出更强的拉新潜力。'],['.iqiyi-findings p:nth-child(2)','Short-form drama is discovered more often through social media. For non-users, social channels are an important opportunity to create discovery and guide interest toward iQIYI.','微剧的发现路径更偏向社交媒体。对于非用户，社媒是触达微剧、进一步引导其进入 iQIYI 的重要机会点。'],['.iqiyi-project .project-footer>span','iQIYI International · Audience Research','iQIYI International · 受众研究'],
  ['.project:nth-of-type(3) h2','Creator ecosystems,<br><em>made operational.</em>','让创作者生态<br><em>真正运转起来。</em>',true],['.project:nth-of-type(3) .project-summary',"For Lovart's U.S. and European campaigns, I paired creator operations with AI workflow design — from positioning and content review to collaboration-record automation.",'在 Lovart 欧美市场活动中，我把创作者运营与 AI 工作流设计结合起来，覆盖定位、内容审核与合作记录自动化。'],
  ['.project:nth-of-type(4) h2','From behavioral data<br>to <em>better activation.</em>','从行为数据<br>走向<em>更优激活。</em>',true],['.project:nth-of-type(4) .project-summary','At Dewu, I used SQL and Python to segment beauty-card users, design differentiated outreach, and measure results through A/B testing and a live funnel dashboard.','在得物，我使用 SQL 和 Python 细分美妆卡用户、设计差异化触达，并通过 A/B 测试和实时漏斗看板衡量结果。'],
  ['.project:nth-of-type(1) .project-button','View evidence <b>↗</b>','查看证据 <b>↗</b>',true],['.iqiyi-project .project-button','View research approach <b>↗</b>','查看研究路径 <b>↗</b>',true],['.project:nth-of-type(3) .project-button','Case overview <b>↗</b>','案例概览 <b>↗</b>',true],['.project:nth-of-type(4) .project-button','Case overview <b>↗</b>','案例概览 <b>↗</b>',true],
  ['.skills-section>.eyebrow','TECHNICAL TOOLKIT','技术工具箱'],['.skill-grid>div:nth-child(1) h3','Query & analyze','查询与分析'],['.skill-grid>div:nth-child(2) h3','Model & interpret','建模与解释'],['.skill-grid>div:nth-child(3) h3','Build & automate','构建与自动化'],['.skill-grid>div:nth-child(4) h3','Communicate & grow','沟通与增长'],
  ['.lab .eyebrow','AGENT LAB','智能体实验室'],['.lab h2','Building in<br><em>public.</em>','公开地<br><em>持续构建。</em>',true],['.lab-detail p','<b>In progress</b><br>An AI agent for competitive content intelligence — designed to monitor public creative signals, structure findings, and surface strategic patterns for AIGC products.','<b>进行中</b><br>一个面向竞品内容洞察的 AI 智能体：监测公开创意信号、结构化发现，并为 AIGC 产品提炼策略模式。',true],
  ['.about>.eyebrow','ABOUT','关于我'],['.about h2','Curious by<br>default.<br><em>Technical by<br>choice.</em>','天生好奇，<br><em>主动选择<br>技术。</em>',true],
  ['.about-grid>div p:nth-child(1)','I am currently pursuing an MEng in Financial Technology at Duke University. My work moves between user research, creator ecosystems, analytics, and the AI systems that make teams operate more intelligently.','我目前就读于杜克大学金融科技工程硕士项目。我的工作横跨用户研究、创作者生态、数据分析，以及让团队更智能运转的 AI 系统。'],['.about-grid>div p:nth-child(2)','Outside the spreadsheets and notebooks, I collect field notes from the places and people that keep my perspective wide.','在表格与代码之外，我也记录沿途的人与地点，让自己的视角保持开阔。'],
  ['.gallery-copy .eyebrow','FIELD NOTES / 2024—26','生活片段 / 2024—26'],['.gallery-copy h2','Moments that keep<br><em>my perspective wide.</em>','这些瞬间让<br><em>我的视角保持开阔。</em>',true],['.gallery-copy>p:last-child','Drag the sphere to explore. Select any image to see it full size.','拖动照片球进行探索，点击任意照片即可查看大图。'],['.label-bottom','DRAG · CLICK TO EXPAND','拖动 · 点击放大'],
  ['footer span:nth-child(2)','DUKE UNIVERSITY · FINTECH','杜克大学 · 金融科技'],['footer a','BACK TO TOP ↑','返回顶部 ↑']
];
const applyLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  translations.forEach(([selector,en,zh,html]) => { const element = document.querySelector(selector); if (element) element[html ? 'innerHTML' : 'textContent'] = language === 'zh' ? zh : en; });
  const toggle = document.querySelector('#language-toggle');
  toggle.textContent = language === 'zh' ? 'EN' : '中文';
  toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
  setPaused(sphere.classList.contains('paused'));
  localStorage.setItem('portfolio-language', language);
};
document.querySelector('#language-toggle').addEventListener('click', () => applyLanguage(currentLanguage === 'en' ? 'zh' : 'en'));
applyLanguage(currentLanguage);

document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => { const detail = (currentLanguage === 'zh' ? projectDetailsZh : projectDetails)[button.dataset.modal]; modalContent.innerHTML = `<p class="modal-eyebrow">${detail.eyebrow}</p><h2 class="modal-title">${detail.title}</h2><div class="modal-content">${detail.body}</div>`; modal.showModal(); }));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

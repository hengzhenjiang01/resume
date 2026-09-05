export const projects = {
  en: {
    lovart: { eyebrow:'03 / CREATOR GROWTH + AUTOMATION', title:'Creator Operations at Lovart', body:<><p>I worked across campaign strategy, creator operations, content quality, and workflow design for an AIGC product expanding in U.S. and European markets.</p><ul className="modal-list"><li>Planned audience-specific campaign directions for SMB, design, and video-creator segments.</li><li>Conducted 500+ creator outreach conversations and supported 85 published assets generating 10M+ total views.</li><li>Reviewed creator content against product-understanding and expression standards.</li><li>Built a LangChain, Python, and Feishu API workflow to synchronize collaboration records, match duplicates, and backfill publishing information.</li></ul></> },
    dewu: { eyebrow:'04 / GROWTH EXPERIMENTATION', title:'Dewu Beauty Card Growth', body:<><p>For a beauty-card membership initiative, I used behavioral data to make activation more targeted and merchant incentives more measurable.</p><ul className="modal-list"><li>Used SQL and Python to segment high-intent and broader-intent audiences from purchase frequency and browsing depth.</li><li>Designed differentiated SMS outreach and validated the approach through A/B testing.</li><li>Contributed to 500+ new cardholders and an approximately 12% month-over-month lift in card activation.</li><li>Built a BI monitoring view for activation and SKU-redemption funnels, helping reduce subsidy cost by approximately 15%.</li></ul></> }
  },
  zh: {
    lovart: { eyebrow:'03 / 创作者增长与自动化', title:'Lovart 创作者运营', body:<><p>面向欧美市场的 AIGC 产品，我参与了活动策略、创作者运营、内容质量和工作流设计。</p><ul className="modal-list"><li>面向中小企业、设计师和视频创作者规划差异化活动方向。</li><li>完成 500+ 次创作者沟通，支持 85 条内容发布并获得 1,000 万+ 播放。</li><li>依据产品理解和表达标准审核创作者内容。</li><li>使用 LangChain、Python 和飞书 API 构建合作记录自动同步工作流。</li></ul></> },
    dewu: { eyebrow:'04 / 增长实验', title:'得物美妆卡增长', body:<><p>围绕美妆卡会员项目，我利用行为数据提升激活触达的针对性，并让商家激励效果可衡量。</p><ul className="modal-list"><li>使用 SQL 和 Python，基于购买频次与浏览深度划分高意向和泛意向人群。</li><li>设计差异化短信触达，并通过 A/B 测试验证。</li><li>贡献 500+ 新增持卡用户，激活率环比提升约 12%。</li><li>搭建激活与 SKU 核销漏斗看板，帮助补贴成本降低约 15%。</li></ul></> }
  }
};

export const galleryPhotos = Array.from({length:76},(_,i)=>`gallery-${String(i+1).padStart(3,'0')}.jpg`);

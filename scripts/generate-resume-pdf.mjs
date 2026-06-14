import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const repoRoot = resolve(new URL("..", import.meta.url).pathname);
const outputPath = resolve(repoRoot, "assets/pdf/lu-yao-resume.pdf");
const profilePhotoUrl = `data:image/jpeg;base64,${readFileSync(resolve(repoRoot, "assets/img/profile-lu-yao.jpeg")).toString("base64")}`;

const resume = {
  name: "鹿尧",
  englishName: "Yao Lu",
  headline: "微软高级软件工程师 · 大数据工程 / 全栈工程 / AI Agent 工程",
  summary:
    "十年大数据开发与数据分析经验，长期在数据平台、数仓、实时计算、用户画像和业务分析场景做工程落地。在微软持续拓展全栈开发与 AI Agent 工程能力，关注如何把数据、产品系统和 LLM 工程结合成可交付软件。开源社区活跃者，原创公开仓库收获 1.6K+ 星标，并在 OpenClaw、Hermes Agent 等项目有可核验合入贡献。",
  contacts: [
    { label: "邮箱", value: "364939526@qq.com", href: "mailto:364939526@qq.com" },
    { label: "电话", value: "+86 136 9977 4962" },
    { label: "微信", value: "luyao4962" },
    { label: "GitHub", value: "github.com/luyao618", href: "https://github.com/luyao618" },
    { label: "个人主页", value: "luyao618.github.io", href: "https://luyao618.github.io" },
    { label: "城市", value: "苏州 / 杭州 / 上海" },
  ],
  education: {
    school: "湖南大学（985）",
    detail: "信息与计算科学 · 本科",
    period: "2012.09 - 2016.06",
    location: "长沙",
  },
  experience: [
    {
      company: "微软 STCA · Bing / Skype / Copilot",
      title: "高级软件工程师",
      period: "2022.04 - 至今",
      location: "苏州",
      bullets: [
        "先后承担 Bing App / Start App、Skype、Copilot Mac 与 Surfaces Connectivity 的数据和质量工作；从业务数据 owner、核心指标和数仓建设，扩展到跨端 telemetry、实验 scorecard、质量 RCA 和 AI-native 数据工作流。",
        "2025.11 - 2026.04 · Cross-Surface Connectivity：负责 Mac / CMC 等跨端 no-response、actionable-rate 与 chat funnel 质量分析；为 Mac 对齐 Mobile KQL、Grafana dashboard、Geneva monitor 与 baseline。",
        "在 CMC bot filter、background-tab 1DS terminal-event 丢失等问题中拆分真实产品失败和 telemetry artifact，帮助团队把排障聚焦到正确 root cause。",
        "2025.02 - 2025.11 · Copilot Mac：在数据基础薄弱阶段补齐核心指标、质量监控、实验 scorecard 与 feature dashboard；建立 ICM framework、daily / weekly OCV review 和 LT / PM 周会节奏。",
        "主导 telemetry guidance、native rewrite backfill 与 voice funnel 分析，使留存、WAU、Voice TDR、OCV 等指标可稳定跟踪、解释和优化；新用户留存从 24.0% 提升到 31.7%，Voice TDR 从 46.3% 降至 31.93%。",
        "2022.04 - 2025.02 · Bing App MiniApp / Growth / Acquisition：覆盖 Rewards、Wallpaper、Weather 及增长获客，负责 dashboard、funnel、ROI / LTV 与用户画像分析，支撑预算、投放和增长策略决策。",
        "2022.04 - 2025.02 · Skype call quality：主导 call quality funnel，从 telemetry 梳理、funnel dashboard 到优化点识别和 impact 计算；同时建设 ODS / DWS 表，服务 PM dashboard、dev debug、AB scorecard 与质量 review。",
      ],
    },
    {
      company: "小米 · 大数据 / 用户画像 / MiPush",
      title: "高级软件工程师",
      period: "2019.04 - 2022.03",
      location: "北京 / 南京",
      bullets: [
        "在 MiPush 和用户画像方向负责 PB 级数据处理、实时/离线统计、Android 竞品分析、DMP 标签和换机口径；作为 6 人数据小组技术 Owner，承担任务拆解、排期、代码 review、招聘面试、新人培养和跨团队沟通。",
        "2021.04 - 2022.03 · 小米换机数据：主导集团级换机口径定义、数据建模、代码实现和质量验证，解决多卡、多手、多设备流转下的序列识别问题。",
        "产出准确率 90%+、月活覆盖 80% 的换机标签，被多个手机业务部门复用，用于品牌忠诚度、拉新画像和手机业务战略分析。",
        "2019.04 - 2021.04 · MiPush Android 竞品数据：接手二十多个计算任务、数万行代码的竞品统计系统，基于 PB 级 MiPush 数据构建厂商新增与活跃指标。",
        "通过清洗、映射和 OAID 兼容，将与 BCI 的统计误差从 50%+ 拉回到 10%，并补齐 Kylin / Redash 可视化链路。",
        "2019.04 - 2021.04 · MiPush 推送统计平台：主导重构面向集团业务方和外部开发者的推送统计平台，提供全选人数、推送量、接收量、点击量、CTR、分时报表等核心报表。",
        "改造旧系统脉冲式写 HBase 和不合理数据结构，提升稳定性并减少存储空间，每年节省近百万元人民币；同时开发购机意向、意向品牌等 DMP 标签支撑精准投放。",
      ],
    },
    {
      company: "美图 · 风控与反作弊",
      title: "大数据开发工程师",
      period: "2018.04 - 2019.03",
      location: "深圳",
      bullets: [
        "负责社区风控与指标监控方向的实时流处理、规则引擎、异常检测和告警平台工程化，把风控 PM / 运营规则、算法模型和生产告警串成可运营系统。",
        "建设 Spark Streaming + Kafka + QLExpress 实时风控规则引擎，覆盖私信、关注、内容发布、文本创作等场景，将实时日志抽象成可查询内存表，支持风控 PM 自助配置规则。",
        "作为主要开发者参与公司级指标监控平台，接入数亿级指标并调用时间序列异常检测模型，异常命中准确率 98%+；负责 Spark 数据接入 / 重跑 / 查询、Redis 信号管理、Livy 服务化和邮件告警。",
      ],
    },
    {
      company: "创维酷开 · 数据平台",
      title: "大数据开发工程师",
      period: "2016.07 - 2018.03",
      location: "深圳",
      bullets: [
        "作为早期数据工程成员参与数据部从 0 到 1 建设，是 DMP、BI ETL、实时流处理、标签体系和数据挖掘等多个模块的核心开发者 / Owner。",
        "建设面向运营和营销团队的用户标签、人群圈选和画像分析能力；平台覆盖约 2000 万用户、近百个标签，使用 HyperLogLog 快速估算人群规模，结合 Spark UDF / UDAF 计算画像指标。",
        "开发并维护播放行为表和多张 ETL 表，支撑 BI 报表、运营分析和管理层看板；使用 Redis sorted set + Spark Streaming 计算智能电视端实时行为，并参与 K-means 用户聚类、协同过滤推荐等任务。",
      ],
    },
  ],
  skillGroups: [
    {
      name: "数据工程与分析",
      items:
        "Spark / Flink / Kafka / Hive / HBase / Kusto / Cosmos / Titan；PB 级处理、数仓建模、实时计算、用户画像、漏斗分析、AB 实验、LTV / ROI、质量监控。",
    },
    {
      name: "智能体与工具工程",
      items: "OpenAI Agent SDK / MCP-style tools / KG-RAG / Neo4j；Kusto query agent、OCV / AB readout、single-user telemetry investigation。",
    },
    {
      name: "全栈与云",
      items: "Python / TypeScript / Node.js / Shell / Azure / Docker；CLI、Dashboard、Web 工具、Mac telemetry 与轻量产品工程。",
    },
  ],
  projects: [
    "GitHub 原创公开仓库 1.6K+ 星标；公开项目覆盖源码研究、AI Agent 工具、数据可视化、CLI、小型 Web 应用和游戏实验。",
    "Claude-Code-Source-Study：1.5K+ stars / 530+ forks，中文社区较有影响力的 Claude Code 内核研究参考。",
    "Hermes Agent：15+ 次 main commit，覆盖 ACP、agent runtime、config、tools、Discord / Telegram / Desktop / Gateway。",
    "OpenClaw：8+ 个 merged PR，覆盖 messaging adapter、agent dispatch、OpenRouter transport 和 embedded session takeover。",
    "AI-Native Productivity Tools：voice-buddy、dashboard-gen-skill、skila、watch-claw、golden-flower 等工具实验。",
  ],
  awards: [
    "Microsoft FY25 AI School China 一等奖：AI Agents 赛道独立提交 Copilot Mac Data Agent (KG-RAG) 并胜出。",
    "Microsoft FY25 Transformational Impact 最高等级绩效：核心贡献覆盖 Copilot Mac telemetry、dashboard、scorecard 与质量 review 机制。",
    "小米破格晋升 16 级：因小米换机数据和 Android 竞品数据体系建设连续获得 A 级绩效。",
  ],
  languages: ["中文：母语", "英文：工作流利（日常技术读写）"],
};

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const compactDateText = (value) => String(value).replace(/\b20(\d{2})\.(\d{2})\b/g, "$1/$2");

function list(items, className = "") {
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderContact(contact) {
  const value = contact.href ? `<a href="${escapeHtml(contact.href)}">${escapeHtml(contact.value)}</a>` : `<span>${escapeHtml(contact.value)}</span>`;
  return `<li><span class="contact-label">${escapeHtml(contact.label)}</span>${value}</li>`;
}

function renderExperiencePoint(point, index) {
  const project = point.match(/^(\d{4}\.\d{2}\s-\s(?:\d{4}\.\d{2}|至今)) · ([^：]+)：(.+)$/);
  if (project) {
    return `
      <li class="role-project">
        <span class="project-period">${escapeHtml(compactDateText(project[1]))}</span>
        <div class="project-copy">
          <p class="project-summary"><strong class="project-name">${escapeHtml(project[2])}：</strong>${escapeHtml(project[3])}</p>
        </div>
      </li>
    `;
  }

  const className = index === 0 ? "role-overview" : "role-detail";
  return `<li class="${className}"><p>${escapeHtml(point)}</p></li>`;
}

function renderExperience(role) {
  return `
    <section class="role">
      <div class="role-head">
        <div>
          <h3>${escapeHtml(role.company)}</h3>
          <p>${escapeHtml(role.title)}</p>
        </div>
        <div class="role-meta">
          <span>${escapeHtml(compactDateText(role.period))}</span>
          <span>${escapeHtml(role.location)}</span>
        </div>
      </div>
      <ol class="role-points">
        ${role.bullets.map(renderExperiencePoint).join("")}
      </ol>
    </section>
  `;
}

function renderSkillGroup(group) {
  return `
    <p><strong>${escapeHtml(group.name)}：</strong>${escapeHtml(group.items)}</p>
  `;
}

function createHtml() {
  return `<!doctype html>
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8">
        <style>
          @page {
            size: A4;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            background: #f2f4f3;
            color: #17201e;
            font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Helvetica Neue", Arial, sans-serif;
            font-kerning: normal;
            letter-spacing: 0;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .page {
            position: relative;
            width: 210mm;
            height: 297mm;
            overflow: hidden;
            padding: 8.4mm 8.8mm 7.8mm;
            background: #ffffff;
          }

          .top {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 29mm;
            gap: 4.8mm;
            align-items: start;
            padding-bottom: 3.7mm;
            border-bottom: 1.2px solid #cbd3ce;
          }

          .profile-card {
            justify-self: end;
            padding: 1.35mm;
            border: 1px solid #cbd5d0;
            border-radius: 4px;
            background: #f6f8f7;
          }

          .photo-frame {
            width: 25mm;
            height: 30mm;
            margin: 0;
            overflow: hidden;
            border: 0;
            border-radius: 3px;
            background: #ffffff;
          }

          .photo-frame img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 18%;
          }

          .name-row {
            display: flex;
            align-items: baseline;
            gap: 2.8mm;
            margin-bottom: 1.2mm;
          }

          h1 {
            margin: 0;
            color: #10211f;
            font-size: 22.8pt;
            line-height: 1;
            font-weight: 760;
          }

          .english-name {
            color: #51605c;
            font-size: 9.5pt;
            font-weight: 700;
          }

          .headline {
            margin: 0 0 2mm;
            color: #1f5d58;
            font-size: 8.9pt;
            line-height: 1.25;
            font-weight: 760;
          }

          .summary {
            margin: 0;
            color: #263431;
            font-size: 7.95pt;
            line-height: 1.56;
          }

          .contacts {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.86mm;
            margin: 0;
            padding: 0;
            list-style: none;
            color: #293734;
            font-size: 7pt;
            line-height: 1.24;
          }

          .contacts li {
            display: grid;
            grid-template-columns: 10.8mm minmax(0, 1fr);
            gap: 1.15mm;
            align-items: baseline;
            min-width: 0;
          }

          .contact-label {
            color: #68746f;
            font-weight: 700;
          }

          .contacts a {
            color: #17201e;
            text-decoration: none;
            overflow-wrap: anywhere;
          }

          .contacts span:not(.contact-label) {
            min-width: 0;
            overflow-wrap: anywhere;
          }

          .content {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 61mm;
            gap: 4.8mm;
            padding-top: 4.4mm;
          }

          .main {
            min-width: 0;
          }

          .side {
            min-width: 0;
            padding-left: 3.9mm;
            border-left: 1px solid #d9dfdb;
          }

          h2 {
            margin: 0 0 1.9mm;
            color: #1f5d58;
            font-size: 8.65pt;
            line-height: 1.15;
            font-weight: 780;
            text-transform: uppercase;
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 2mm;
            margin-bottom: 2.1mm;
          }

          .section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #d7ded9;
          }

          .role {
            position: relative;
            margin-bottom: 2mm;
            padding-top: 1.35mm;
            border-top: 1px solid #e1e8e4;
          }

          .role:last-child {
            margin-bottom: 0;
          }

          .role:first-of-type {
            padding-top: 0;
            border-top: 0;
          }

          .role-head {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 2mm;
            align-items: start;
            margin-bottom: 0.85mm;
          }

          h3 {
            margin: 0;
            color: #162421;
            font-size: 8.75pt;
            line-height: 1.18;
            font-weight: 760;
          }

          .role-head p {
            margin: 0.55mm 0 0;
            color: #53625e;
            font-size: 7.25pt;
            line-height: 1.2;
            font-weight: 620;
          }

          .role-meta {
            display: grid;
            justify-items: end;
            gap: 0.4mm;
            color: #5e6d69;
            font-size: 7.1pt;
            line-height: 1.15;
            white-space: nowrap;
          }

          ul,
          ol {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .side-list li {
            position: relative;
            padding-left: 3mm;
          }

          .side-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 3pt;
            width: 1.15mm;
            height: 1.15mm;
            border-radius: 50%;
            background: #1f5d58;
            opacity: 0.78;
          }

          .role-points {
            display: grid;
            gap: 0.52mm;
          }

          .role-overview {
            margin-bottom: 0.1mm;
            padding: 0;
          }

          .role-overview p,
          .role-detail p,
          .project-summary {
            margin: 0;
            color: #263431;
            font-size: 7.12pt;
            line-height: 1.33;
          }

          .role-project {
            display: grid;
            grid-template-columns: 17mm minmax(0, 1fr);
            gap: 1.5mm;
            align-items: start;
            padding: 0.04mm 0 0.08mm;
          }

          .project-period {
            display: block;
            color: #1f5d58;
            font-size: 6.52pt;
            font-weight: 760;
            line-height: 1.3;
            white-space: nowrap;
          }

          .project-copy {
            position: relative;
            min-width: 0;
          }

          .project-name {
            color: #162421;
            font-size: 7.14pt;
            font-weight: 760;
          }

          .role-detail {
            position: relative;
            margin-left: 18.5mm;
            padding-left: 0;
          }

          .side-block {
            margin-bottom: 3mm;
          }

          .contact-block {
            margin-bottom: 3.1mm;
          }

          .side-block.compact {
            margin-bottom: 2.35mm;
          }

          .side-block p,
          .edu p {
            margin: 0;
            color: #263431;
            font-size: 7.1pt;
            line-height: 1.36;
          }

          .skill-lines {
            display: grid;
            gap: 1mm;
          }

          .skill-lines p {
            margin: 0;
            color: #263431;
            font-size: 7.05pt;
            line-height: 1.35;
          }

          .skill-lines strong {
            color: #162421;
            font-weight: 760;
          }

          .edu strong {
            display: block;
            margin-bottom: 0.6mm;
            color: #162421;
            font-size: 8.1pt;
            line-height: 1.2;
          }

          .edu span {
            display: block;
            color: #5d6a66;
          }

          .side-list {
            display: grid;
            gap: 0.78mm;
          }

          .side-list li {
            color: #263431;
            font-size: 7.02pt;
            line-height: 1.34;
          }

          .divider {
            height: 1px;
            margin: 2.35mm 0;
            background: #d7ded9;
          }
        </style>
      </head>
      <body>
        <article class="page">
          <header class="top">
            <div>
              <div class="name-row">
                <h1>${escapeHtml(resume.name)}</h1>
                <span class="english-name">${escapeHtml(resume.englishName)}</span>
              </div>
              <p class="headline">${escapeHtml(resume.headline)}</p>
              <p class="summary">${escapeHtml(resume.summary)}</p>
            </div>
            <aside class="profile-card" aria-label="Profile and contact">
              <figure class="photo-frame" aria-label="Profile photo">
                <img src="${profilePhotoUrl}" alt="${escapeHtml(resume.name)} profile photo">
              </figure>
            </aside>
          </header>

          <div class="content">
            <main class="main">
              <div class="section-title"><h2>工作经历</h2></div>
              ${resume.experience.map(renderExperience).join("")}
            </main>

            <aside class="side">
              <section class="side-block contact-block">
                <h2>联系方式</h2>
                <ul class="contacts">
                  ${resume.contacts.map(renderContact).join("")}
                </ul>
              </section>

              <div class="divider"></div>
              <section class="side-block edu">
                <h2>教育背景</h2>
                <p>
                  <strong>${escapeHtml(resume.education.school)}</strong>
                  ${escapeHtml(resume.education.detail)}
                  <span>${escapeHtml(compactDateText(resume.education.period))} · ${escapeHtml(resume.education.location)}</span>
                </p>
              </section>

              <div class="divider"></div>
              <section class="side-block compact">
                <h2>技能与工具</h2>
                <div class="skill-lines">
                  ${resume.skillGroups.map(renderSkillGroup).join("")}
                </div>
              </section>

              <div class="divider"></div>
              <section class="side-block">
                <h2>开源贡献</h2>
                ${list(resume.projects, "side-list")}
              </section>

              <section class="side-block">
                <h2>奖项认可</h2>
                ${list(resume.awards, "side-list")}
              </section>

              <section class="side-block">
                <h2>语言</h2>
                ${list(resume.languages, "side-list")}
              </section>
            </aside>
          </div>
        </article>
      </body>
    </html>`;
}

async function generatePdf() {
  mkdirSync(resolve(repoRoot, "assets/pdf"), { recursive: true });

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
    await page.setContent(createHtml(), { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    const overflow = await page.evaluate(() => {
      const pageElement = document.querySelector(".page");
      if (!pageElement) return null;
      return {
        scrollHeight: pageElement.scrollHeight,
        clientHeight: pageElement.clientHeight,
        scrollWidth: pageElement.scrollWidth,
        clientWidth: pageElement.clientWidth,
      };
    });

    if (!overflow) {
      throw new Error("Resume page element was not rendered.");
    }

    if (overflow.scrollHeight > overflow.clientHeight + 2 || overflow.scrollWidth > overflow.clientWidth + 2) {
      throw new Error(`Resume layout overflows one A4 page: ${JSON.stringify(overflow)}`);
    }

    await page.pdf({
      path: outputPath,
      width: "210mm",
      height: "297mm",
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }

  console.log(`Generated ${outputPath}`);
}

generatePdf().catch((error) => {
  console.error(error);
  process.exit(1);
});

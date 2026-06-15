---
layout: default
permalink: /cv/
title: cv
nav: true
nav_order: 4
description: Yao Lu (鹿尧) — Senior Software Engineer · AI-Native Data & Product Systems · Agent Engineering. Microsoft Copilot Mac · ex-Xiaomi · Hunan University.
description_zh: 鹿尧的简历（中英双语） — 高级软件工程师、AI-Native 数据与产品系统、Agent 工程；Microsoft Copilot Mac，前小米，湖南大学。
---

{% assign cv = site.data.cv.cv %}
{% assign cv_zh = site.data.cv_zh.cv %}
{% assign about = site.data.about %}
{% assign sections = site.data.cv.cv.sections %}

{% comment %}
Bilingual CV page. Mirrors the about-page i18n mechanism:
zh/en versions are wrapped in data-lang spans, toggled by the same
resume-language-toggle button rendered in the navbar (see header.liquid).
Chinese strings live in cv_zh.yml so RenderCV's strict schema for cv.yml
is not affected; the canonical English source still drives the PDF render.
Section titles (the keys of cv.sections) intentionally stay in English
per project decision; only body content is bilingual.

The capability-highlight sections are unrolled (rather than driven by a Liquid
loop over a string-split array) because Jekyll's strict-Liquid setting
resolved the dynamic key lookup `cv_zh[zh_key]` to nil under some
conditions, silently triggering the `| default: entry.bullet` fallback
on every bullet — which is what caused the all-English regression on
PR #7.
{% endcomment %}

<main class="cv-resume" aria-label="CV of Yao Lu">
  <section class="cv-hero">
    <div class="cv-hero-copy">
      <p class="cv-kicker">Big Data Engineer · Full-Stack Builder · AI Agent Developer</p>
      <h1 class="cv-title">
        <span data-lang="zh">{{ cv_zh.name | default: cv.name }}</span>
        <span data-lang="en">{{ cv.name }}</span>
      </h1>
      <p class="cv-subtitle">
        <span class="cv-subtitle-line" data-lang="zh">
          {% assign zh_label_parts = cv_zh.label | split: ' · ' %}
          {% for label_part in zh_label_parts %}
            <span class="cv-subtitle-segment">{{ label_part }}</span>
          {% endfor %}
        </span>
        <span class="cv-subtitle-line" data-lang="en">
          {% assign en_label_parts = cv.label | split: ' · ' %}
          {% for label_part in en_label_parts %}
            <span class="cv-subtitle-segment">{{ label_part }}</span>
          {% endfor %}
        </span>
      </p>
      <div class="cv-summary" data-lang="zh">
        <p>{{ cv_zh.summary | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' }}</p>
      </div>
      <div class="cv-summary" data-lang="en">
        <p>{{ cv.summary }}</p>
      </div>

      <ul class="cv-contact-list" aria-label="Contact">
        <li>
          <i class="fa-solid fa-envelope" aria-hidden="true"></i>
          <a href="mailto:{{ cv.email }}">{{ cv.email }}</a>
        </li>
        <li>
          <i class="fa-solid fa-phone" aria-hidden="true"></i>
          <span>{{ cv.phone }}</span>
        </li>
        <li>
          <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
          <span data-lang="zh">{{ cv_zh.location }}</span>
          <span data-lang="en">{{ cv.location }}</span>
        </li>
      </ul>

      <div class="cv-actions" aria-label="CV actions">
        <a class="cv-download-button" href="{{ about.profile.resume | relative_url }}" download>
          <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
          <span data-lang="zh">下载PDF简历(一页)</span>
          <span data-lang="en">Download One-Page PDF Resume</span>
        </a>
      </div>
    </div>

  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Experience</h2>
    <ol class="cv-timeline">
      {% for role in sections.Experience %}
        {% assign zh_role = cv_zh.experience[forloop.index0] %}
        <li class="cv-timeline-item">
          <header class="cv-role-head">
            <h3 class="cv-role-title">
              <span data-lang="zh">{{ zh_role.position | default: role.position }}</span>
              <span data-lang="en">{{ role.position }}</span>
            </h3>
            <p class="cv-role-meta">
              <span class="cv-role-company">
                <span data-lang="zh">{{ zh_role.company | default: role.company }}</span>
                <span data-lang="en">{{ role.company }}</span>
              </span>
              <span class="cv-role-when">
                {{ role.start_date }}{% if role.end_date != "" %} → {{ role.end_date }}{% else %}<span data-lang="zh"> → 至今</span><span data-lang="en"> → Present</span>{% endif %}
              </span>
              <span class="cv-role-where">
                <span data-lang="zh">{{ zh_role.location | default: role.location }}</span>
                <span data-lang="en">{{ role.location }}</span>
              </span>
            </p>
          </header>
          {% assign zh_role_summary = zh_role.summary | default: role.summary %}
          <p class="cv-role-summary" data-lang="zh">{{ zh_role_summary | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' }}</p>
          <p class="cv-role-summary" data-lang="en">{{ role.summary }}</p>
          {% if zh_role.projects %}
            <ul class="cv-role-projects" data-lang="zh">
              {% for project in zh_role.projects %}
                <li>
                  <p class="cv-role-project-head">
                    <span class="cv-role-project-period">{{ project.period }}</span>
                    <span class="cv-role-project-name">{{ project.name }}</span>
                  </p>
                  <p class="cv-role-project-summary">{{ project.summary | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' }}</p>
                </li>
              {% endfor %}
            </ul>
          {% endif %}
          {% if role.highlights %}
            <ul class="cv-role-projects" data-lang="en">
              {% for highlight in role.highlights %}
                <li>
                  <div class="cv-role-project-summary">{{ highlight | markdownify }}</div>
                </li>
              {% endfor %}
            </ul>
          {% endif %}
        </li>
      {% endfor %}
    </ol>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Capability Highlights</h2>
    <ol class="cv-timeline cv-capability-timeline">
      <li class="cv-timeline-item cv-capability-item">
        <header class="cv-role-head">
          <h3 class="cv-role-title">
            <span data-lang="zh">大数据</span>
            <span data-lang="en">Big Data</span>
          </h3>
          <p class="cv-role-meta">
            <span class="cv-role-company" data-lang="zh">数仓 / 实时计算 / 数据分析 / 指标体系</span>
            <span class="cv-role-company" data-lang="en">Data Warehouse / Real-Time Computing / Analytics / Metrics</span>
          </p>
        </header>
        <ul class="cv-role-projects cv-capability-points">
          {% for entry in sections["Capability Highlights · Data Engineering & Analytics"] %}
            {% assign zh_entry = cv_zh.capability_data[forloop.index0] %}
            <li>
              <div class="cv-role-project-summary" data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' | markdownify }}</div>
              <div class="cv-role-project-summary" data-lang="en">{{ entry.bullet | markdownify }}</div>
            </li>
          {% endfor %}
        </ul>
      </li>

      <li class="cv-timeline-item cv-capability-item">
        <header class="cv-role-head">
          <h3 class="cv-role-title">
            <span data-lang="zh">全栈开发</span>
            <span data-lang="en">Full-Stack Development</span>
          </h3>
          <p class="cv-role-meta">
            <span class="cv-role-company" data-lang="zh">云服务 / 客户端 / 内部工具 / 开源贡献</span>
            <span class="cv-role-company" data-lang="en">Cloud Services / Client / Internal Tools / Open Source</span>
          </p>
        </header>
        <ul class="cv-role-projects cv-capability-points">
          {% for entry in sections["Capability Highlights · Full-Stack Product Engineering"] %}
            {% assign zh_entry = cv_zh.capability_full_stack[forloop.index0] %}
            <li>
              <div class="cv-role-project-summary" data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' | markdownify }}</div>
              <div class="cv-role-project-summary" data-lang="en">{{ entry.bullet | markdownify }}</div>
            </li>
          {% endfor %}
        </ul>
      </li>

      <li class="cv-timeline-item cv-capability-item">
        <header class="cv-role-head">
          <h3 class="cv-role-title">
            <span data-lang="zh">AI Agent</span>
            <span data-lang="en">AI Agent Engineering</span>
          </h3>
          <p class="cv-role-meta">
            <span class="cv-role-company" data-lang="zh">RAG / MCP / AI Native Workflow</span>
            <span class="cv-role-company" data-lang="en">RAG / MCP / AI-Native Workflow</span>
          </p>
        </header>
        <ul class="cv-role-projects cv-capability-points">
          {% for entry in sections["Capability Highlights · AI Agent Engineering"] %}
            {% assign zh_entry = cv_zh.capability_ai_agent[forloop.index0] %}
            <li>
              <div class="cv-role-project-summary" data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' | markdownify }}</div>
              <div class="cv-role-project-summary" data-lang="en">{{ entry.bullet | markdownify }}</div>
            </li>
          {% endfor %}
        </ul>
      </li>
    </ol>

  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Open Source Projects</h2>
    <div class="cv-oss-overview">
      <a class="cv-oss-profile" href="https://github.com/luyao618">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
        <span>github.com/luyao618</span>
      </a>
      <dl class="cv-oss-stats" aria-label="GitHub public metrics">
        <div>
          <dt>27</dt>
          <dd>
            <span data-lang="zh">公开仓库</span>
            <span data-lang="en">public repos</span>
          </dd>
        </div>
        <div>
          <dt>16</dt>
          <dd>
            <span data-lang="zh">原创仓库</span>
            <span data-lang="en">original repos</span>
          </dd>
        </div>
        <div>
          <dt>1,618</dt>
          <dd>
            <span data-lang="zh">原创 stars</span>
            <span data-lang="en">repo stars</span>
          </dd>
        </div>
        <div>
          <dt>556</dt>
          <dd>
            <span data-lang="zh">原创 forks</span>
            <span data-lang="en">repo forks</span>
          </dd>
        </div>
      </dl>
    </div>
    <ul class="cv-projects cv-oss-projects">
      {% for project in sections["Open Source Projects"] %}
        {% assign zh_proj = cv_zh.open_source_projects[forloop.index0] %}
        <li>
          <h3 class="cv-project-name">
            <a href="{{ project.url }}">
              <span data-lang="zh">{{ zh_proj.name | default: project.name }}</span>
              <span data-lang="en">{{ project.name }}</span>
            </a>
          </h3>
          {% if zh_proj.meta or project.meta %}
            <p class="cv-project-meta">
              <span data-lang="zh">{{ zh_proj.meta | default: project.meta }}</span>
              <span data-lang="en">{{ project.meta }}</span>
            </p>
          {% endif %}
          <div class="cv-project-summary" data-lang="zh">{{ zh_proj.summary | default: project.summary | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' | markdownify }}</div>
          <div class="cv-project-summary" data-lang="en">{{ project.summary | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Skills</h2>
    <div class="cv-skills">
      {% for skill in sections.Skills %}
        <div class="cv-skill-group">
          <h3 class="cv-skill-name">
            {% if skill.icon %}<i class="{{ skill.icon }}" aria-hidden="true"></i>{% endif %}
            <span>{{ skill.name }}</span>
          </h3>
          <ul class="cv-skill-keywords">
            {% for kw in skill.keywords %}
              <li>{{ kw }}</li>
            {% endfor %}
          </ul>
        </div>
      {% endfor %}
    </div>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Awards</h2>
    <ul class="cv-awards">
      {% for award in sections.Awards %}
        {% assign zh_award = cv_zh.awards[forloop.index0] %}
        <li>
          <h3 class="cv-award-title">
            <span data-lang="zh">{{ zh_award.title | default: award.title }}</span>
            <span data-lang="en">{{ award.title }}</span>
          </h3>
          <p class="cv-award-meta">
            <span data-lang="zh">{{ zh_award.awarder | default: award.awarder }}</span>
            <span data-lang="en">{{ award.awarder }}</span>
            <span class="cv-award-date">· {{ award.date }}</span>
          </p>
          <div class="cv-award-summary" data-lang="zh">{{ zh_award.summary | default: award.summary | replace: '。 ', '。' | replace: '， ', '，' | replace: '、 ', '、' | replace: '； ', '；' | replace: '被 ', '被' | markdownify }}</div>
          <div class="cv-award-summary" data-lang="en">{{ award.summary | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Education</h2>
    <ul class="cv-education">
      {% for edu in sections.Education %}
        {% assign zh_edu = cv_zh.education[forloop.index0] %}
        <li>
          <h3 class="cv-edu-school">
            <span data-lang="zh">{{ zh_edu.institution | default: edu.institution }}</span>
            <span data-lang="en">{{ edu.institution }}</span>
          </h3>
          <p class="cv-edu-meta">
            <span data-lang="zh">{{ zh_edu.study_type | default: edu.studyType }} · {{ zh_edu.area | default: edu.area }}</span>
            <span data-lang="en">{{ edu.studyType }} · {{ edu.area }}</span>
            <span class="cv-edu-when">· {{ edu.start_date }} → {{ edu.end_date }}</span>
            <span class="cv-edu-where">
              · <span data-lang="zh">{{ zh_edu.location | default: edu.location }}</span>
              <span data-lang="en">{{ edu.location }}</span>
            </span>
          </p>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Languages</h2>
    <ul class="cv-languages">
      {% for lang in sections.Languages %}
        {% assign zh_lang = cv_zh.languages[forloop.index0] %}
        <li>
          {% if lang.icon %}<i class="{{ lang.icon }}" aria-hidden="true"></i>{% endif %}
          <span class="cv-lang-name">
            <span data-lang="zh">{{ zh_lang.name | default: lang.name }}</span>
            <span data-lang="en">{{ lang.name }}</span>
          </span>
          <span class="cv-lang-summary">
            — <span data-lang="zh">{{ zh_lang.summary | default: lang.summary }}</span>
            <span data-lang="en">{{ lang.summary }}</span>
          </span>
        </li>
      {% endfor %}
    </ul>
  </section>
</main>

<script>
  (function () {
    const cvRoot = document.querySelector(".cv-resume");
    if (!cvRoot) return;

    const languageToggle = document.querySelector(".resume-language-toggle");
    const label = languageToggle?.querySelector("[data-language-label]");

    const readStoredLanguage = () => {
      try {
        return window.localStorage.getItem("resume-language");
      } catch (_error) {
        return null;
      }
    };

    const storeLanguage = (language) => {
      try {
        window.localStorage.setItem("resume-language", language);
      } catch (_error) {
        // best-effort persistence
      }
    };

    const setLanguage = (language) => {
      const isEnglish = language === "en";
      cvRoot.classList.toggle("is-english", isEnglish);
      cvRoot.setAttribute("data-language", language);
      document.documentElement.lang = isEnglish ? "en" : "zh-CN";

      if (languageToggle && label) {
        languageToggle.setAttribute("aria-pressed", String(isEnglish));
        languageToggle.setAttribute("title", isEnglish ? "切换到中文" : "Switch to English");
        languageToggle.setAttribute("aria-label", isEnglish ? "切换到中文" : "Switch CV language");
        label.textContent = isEnglish ? "中" : "EN";
      }

      storeLanguage(language);
    };

    const initialLanguage = readStoredLanguage() === "en" ? "en" : "zh";
    setLanguage(initialLanguage);
    languageToggle?.addEventListener("click", () => {
      setLanguage(cvRoot.classList.contains("is-english") ? "zh" : "en");
    });
  })();
</script>

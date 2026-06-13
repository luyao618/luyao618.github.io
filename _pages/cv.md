---
layout: default
permalink: /cv/
title: cv
nav: true
nav_order: 4
description: Yao Lu (鹿尧) — Senior Software Engineer · AI-Native Data & Product Systems · Agent Engineering. Microsoft Copilot Mac · ex-Xiaomi · Hunan University.
description_zh: 鹿尧的简历（中英双语） — 资深软件工程师、AI-Native 数据与产品系统、Agent 工程；Microsoft Copilot Mac，前小米，湖南大学。
toc:
  sidebar: left
---

{% assign cv = site.data.cv.cv %}
{% assign cv_zh = site.data.cv_zh.cv %}
{% assign sections = site.data.cv.cv.sections %}

{% comment %}
Bilingual CV page. Mirrors the about-page i18n mechanism:
zh/en versions are wrapped in data-lang spans, toggled by the same
resume-language-toggle button rendered in the navbar (see header.liquid).
Chinese strings live in cv_zh.yml so RenderCV's strict schema for cv.yml
is not affected; the canonical English source still drives the PDF render.
Section titles (the keys of cv.sections) intentionally stay in English
per project decision; only body content is bilingual.
{% endcomment %}

<main class="cv-resume" aria-label="CV of Yao Lu">
  <section class="cv-hero">
    <div class="cv-hero-copy">
      <p class="cv-kicker">CV · Yao Lu (鹿尧)</p>
      <h1 class="cv-title">
        <span data-lang="zh">{{ cv.name }}</span>
        <span data-lang="en">{{ cv.name }}</span>
      </h1>
      <p class="cv-subtitle">
        <span data-lang="zh">{{ cv_zh.label }}</span>
        <span data-lang="en">{{ cv.label }}</span>
      </p>
      <div class="cv-summary" data-lang="zh">
        <p>{{ cv_zh.summary }}</p>
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
        <li>
          <i class="fa-solid fa-globe" aria-hidden="true"></i>
          <a href="{{ cv.website }}">{{ cv.website | replace: 'https://', '' }}</a>
        </li>
        {% for s in cv.social_networks %}
          <li>
            {% if s.network == 'GitHub' %}
              <i class="fa-brands fa-github" aria-hidden="true"></i>
              <a href="https://github.com/{{ s.username }}">github.com/{{ s.username }}</a>
            {% elsif s.network == 'Zhihu' %}
              <span class="cv-zhihu-mark" aria-hidden="true">知</span>
              <a href="https://www.zhihu.com/people/{{ s.username }}">zhihu.com/people/{{ s.username }}</a>
            {% else %}
              <i class="fa-solid fa-link" aria-hidden="true"></i>
              <span>{{ s.network }} · {{ s.username }}</span>
            {% endif %}
          </li>
        {% endfor %}
      </ul>
    </div>

  </section>

  <section class="cv-section" id="experience">
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
          <p class="cv-role-summary" data-lang="zh">{{ zh_role.summary | default: role.summary }}</p>
          <p class="cv-role-summary" data-lang="en">{{ role.summary }}</p>
        </li>
      {% endfor %}
    </ol>
  </section>

{% assign impact_keys = "Selected Impact · Copilot Mac & Connectivity Quality|selected_impact_copilot_mac|Selected Impact · Growth Analytics & Paid Ads|selected_impact_growth|Selected Impact · Data Platform / Warehouse / Observability|selected_impact_data_platform|Selected Impact · User Profile & Recommendation / Data Science|selected_impact_user_profile" | split: "|" %}
{% for i in (0..3) %}
{% assign si_pos = i | times: 2 %}
{% assign en_key = impact_keys[si_pos] %}
{% assign zh_key = impact_keys[si_pos | plus: 1] %}
{% assign en_bullets = sections[en_key] %}
{% assign zh_bullets = cv_zh[zh_key] %}

<section class="cv-section">
<h2 class="cv-section-title">{{ en_key }}</h2>
<ul class="cv-bullets">
{% for entry in en_bullets %}
{% assign zh_entry = zh_bullets[forloop.index0] %}
<li>
<div data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | markdownify }}</div>
<div data-lang="en">{{ entry.bullet | markdownify }}</div>
</li>
{% endfor %}
</ul>
</section>
{% endfor %}

  <section class="cv-section">
    <h2 class="cv-section-title">AI Agent &amp; AI-Native Engineering</h2>
    <ul class="cv-bullets">
      {% for entry in sections["AI Agent & AI-Native Engineering"] %}
        {% assign zh_entry = cv_zh.ai_agent_engineering[forloop.index0] %}
        <li>
          <div data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | markdownify }}</div>
          <div data-lang="en">{{ entry.bullet | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Open Source Projects</h2>
    <ul class="cv-projects">
      {% for project in sections["Open Source Projects"] %}
        {% assign zh_proj = cv_zh.open_source_projects[forloop.index0] %}
        <li>
          <h3 class="cv-project-name">
            <a href="{{ project.url }}">
              <span data-lang="zh">{{ zh_proj.name | default: project.name }}</span>
              <span data-lang="en">{{ project.name }}</span>
            </a>
          </h3>
          <div class="cv-project-summary" data-lang="zh">{{ zh_proj.summary | default: project.summary | markdownify }}</div>
          <div class="cv-project-summary" data-lang="en">{{ project.summary | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Skills</h2>
    <div class="cv-skills">
      {% for skill in sections.Skills %}
        {% assign zh_skill = cv_zh.skills[forloop.index0] %}
        <div class="cv-skill-group">
          <h3 class="cv-skill-name">
            {% if skill.icon %}<i class="{{ skill.icon }}" aria-hidden="true"></i>{% endif %}
            <span data-lang="zh">{{ zh_skill.name | default: skill.name }}</span>
            <span data-lang="en">{{ skill.name }}</span>
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
    <h2 class="cv-section-title">Writing / Talks / Knowledge Sharing</h2>
    <ul class="cv-bullets">
      {% for entry in sections["Writing / Talks / Knowledge Sharing"] %}
        {% assign zh_entry = cv_zh.writing_talks[forloop.index0] %}
        <li>
          <div data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | markdownify }}</div>
          <div data-lang="en">{{ entry.bullet | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
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
          <p class="cv-award-summary" data-lang="zh">{{ zh_award.summary | default: award.summary }}</p>
          <p class="cv-award-summary" data-lang="en">{{ award.summary }}</p>
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

    setLanguage(readStoredLanguage() === "en" ? "en" : "zh");
    languageToggle?.addEventListener("click", () => {
      setLanguage(cvRoot.classList.contains("is-english") ? "zh" : "en");
    });
  })();
</script>

---
layout: default
title: about
permalink: /
description: 鹿尧的个人简介、联系方式、工作经历和简历下载。
---

<link rel="stylesheet" href="{{ '/assets/css/about-resume.css' | relative_url | bust_file_cache }}">

{% assign about = site.data.about %}

<main class="resume-home" aria-label="About Yao Lu">
  <section class="resume-hero">
    <div class="resume-hero-copy">
      <p class="resume-kicker">{{ about.profile.tagline }}</p>
      <h1 class="resume-title">{{ about.profile.name }} / {{ about.profile.english_name }}</h1>
      <p class="resume-subtitle">
        {{ about.profile.title }}，长期深耕大数据工程，近年持续推进全栈开发与 AI Agent 工程实践。
      </p>

      <div class="resume-summary">
        {% for paragraph in about.profile.summary %}
          <p>{{ paragraph }}</p>
        {% endfor %}
      </div>

      <div class="resume-actions" aria-label="Resume actions">
        <a class="resume-button" href="{{ about.profile.resume | relative_url }}" download>下载 PDF 简历</a>
        <a class="resume-button secondary" href="mailto:364939526@qq.com">联系我</a>
      </div>
    </div>

    <aside class="resume-side" aria-label="Profile and contact">
      <div class="resume-photo-frame">
        <img src="{{ about.profile.photo | relative_url }}" alt="{{ about.profile.name }} profile photo" loading="eager">
      </div>

      <section class="resume-contact-card" aria-labelledby="contact-title">
        <h2 class="resume-card-title" id="contact-title">Contact</h2>
        <ul class="resume-contact-list">
          {% for contact in about.contacts %}
            <li>
              <span class="resume-contact-label">{{ contact.label }}</span>
              <span class="resume-contact-value">
                {% if contact.href %}
                  <a href="{{ contact.href }}">{{ contact.value }}</a>
                {% else %}
                  {{ contact.value }}
                {% endif %}
              </span>
            </li>
          {% endfor %}
        </ul>
      </section>

      <section class="resume-highlight-card" aria-labelledby="highlight-title">
        <h2 class="resume-card-title" id="highlight-title">Positioning</h2>
        <ul class="resume-highlight-list">
          {% for item in about.highlights %}
            <li>{{ item }}</li>
          {% endfor %}
        </ul>
      </section>
    </aside>
  </section>

  <section class="resume-section" aria-labelledby="experience-title">
    <div class="resume-section-heading">
      <h2 id="experience-title">Work Experience</h2>
      <span>compact overview</span>
    </div>

    <div class="resume-timeline">
      {% for role in about.experience %}
        <article class="resume-role">
          <span class="resume-logo" aria-hidden="true">{{ role.logo }}</span>
          <div class="resume-role-main">
            <h3 class="resume-company">{{ role.company }}</h3>
            <p class="resume-role-title">{{ role.title }}</p>
          </div>
          <time class="resume-period">{{ role.period }}</time>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="resume-section" aria-labelledby="education-title">
    <div class="resume-section-heading">
      <h2 id="education-title">Education</h2>
      <span>brief background</span>
    </div>

    <article class="resume-role resume-education">
      <span class="resume-logo" aria-hidden="true">{{ about.education.logo }}</span>
      <div class="resume-role-main">
        <h3 class="resume-company">{{ about.education.school }}</h3>
        <p class="resume-role-title">{{ about.education.major }}</p>
      </div>
      <time class="resume-period">{{ about.education.period }}</time>
    </article>
  </section>
</main>

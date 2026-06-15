---
layout: default
title: about
permalink: /
description: 鹿尧的个人简介、联系方式、工作经历和简历下载。
---

{% assign about = site.data.about %}

<main class="resume-home" aria-label="About Yao Lu">
  <section class="resume-hero">
    <div class="resume-hero-copy">
      <p class="resume-kicker">{{ about.profile.tagline }}</p>
      <h1 class="resume-title">
        <span data-lang="zh">{{ about.profile.name }} / {{ about.profile.english_name }}</span>
        <span data-lang="en">{{ about.profile.english_name }}</span>
      </h1>
      <p class="resume-subtitle">
        <span data-lang="zh">深耕大数据多年，持续推进全栈开发与 AI Agent 工程实践。</span>
        <span data-lang="en">{{ about.profile.subtitle_en }}</span>
      </p>

      <div class="resume-summary" data-lang="zh">
        {% for paragraph in about.profile.summary %}
          <p>{{ paragraph }}</p>
        {% endfor %}
      </div>
      <div class="resume-summary" data-lang="en">
        {% for paragraph in about.profile.summary_en %}
          <p>{{ paragraph }}</p>
        {% endfor %}
      </div>

      <div class="resume-actions" aria-label="Resume actions">
        <a class="resume-button" href="{{ about.profile.resume | relative_url }}" download>
          <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
          <span data-lang="zh">下载PDF简历(一页)</span>
          <span data-lang="en">Download One-Page PDF Resume</span>
        </a>
        <a class="resume-button" href="{{ about.profile.resume_detailed | relative_url }}" download>
          <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
          <span data-lang="zh">下载PDF简历(详细)</span>
          <span data-lang="en">Download Detailed PDF Resume</span>
        </a>
      </div>

      <section class="resume-mini-career" aria-labelledby="mini-career-title">
        <div class="resume-mini-group">
          <h2 id="mini-career-title">Experience</h2>
          <div class="resume-mini-list">
            {% for role in about.experience %}
              <p class="resume-mini-row">
                <time>
                  <span data-lang="zh">{{ role.period }}</span>
                  <span data-lang="en">{{ role.period_en }}</span>
                </time>
                <span>
                  <span data-lang="zh">{{ role.short_company | default: role.company }}</span>
                  <span data-lang="en">{{ role.short_company_en }}</span>
                </span>
                <span>
                  <span data-lang="zh">{{ role.title }}</span>
                  <span data-lang="en">{{ role.title_en }}</span>
                </span>
              </p>
            {% endfor %}
          </div>
        </div>

        <div class="resume-mini-group resume-mini-education">
          <h2>Education</h2>
          <p class="resume-mini-row">
            <time>
              <span data-lang="zh">{{ about.education.period }}</span>
              <span data-lang="en">{{ about.education.period_en }}</span>
            </time>
            <span>
              <span data-lang="zh">{{ about.education.school }}</span>
              <span data-lang="en">{{ about.education.school_en }}</span>
            </span>
            <span>
              <span data-lang="zh">{{ about.education.major }}</span>
              <span data-lang="en">{{ about.education.major_en }}</span>
            </span>
          </p>
        </div>
      </section>
    </div>

    <aside class="resume-side" aria-label="Profile and contact">
      <div class="resume-photo-frame">
        <img src="{{ about.profile.photo | relative_url }}" alt="{{ about.profile.name }} profile photo" loading="eager">
      </div>

      <section class="resume-contact-card" aria-labelledby="contact-title">
        <h2 class="resume-visually-hidden" id="contact-title">Contact</h2>
        <div class="resume-contact-icons">
          {% for contact in about.contacts %}
            {% if contact.href %}
              <a
                class="resume-contact-icon"
                href="{{ contact.href }}"
                aria-label="{{ contact.label }}: {{ contact.value }}"
                title="{{ contact.label }}: {{ contact.value }}"
              >
                {% if contact.icon == 'zhihu-mark' %}
                  <span class="resume-contact-zhihu-mark" aria-hidden="true">知</span>
                {% else %}
                  <i class="{{ contact.icon }}" aria-hidden="true"></i>
                {% endif %}
              </a>
            {% else %}
              <button
                class="resume-contact-icon"
                type="button"
                data-copy="{{ contact.value }}"
                aria-label="Copy {{ contact.label }}: {{ contact.value }}"
                title="{{ contact.label }}: {{ contact.value }}"
              >
                <i class="{{ contact.icon }}" aria-hidden="true"></i>
              </button>
            {% endif %}
          {% endfor %}
        </div>
      </section>

      <section class="resume-highlight-card" aria-label="Professional positioning">
        <ul class="resume-highlight-list" data-lang="zh">
          {% for item in about.highlights %}
            <li>{{ item }}</li>
          {% endfor %}
        </ul>
        <ul class="resume-highlight-list" data-lang="en">
          {% for item in about.highlights_en %}
            <li>{{ item }}</li>
          {% endfor %}
        </ul>
      </section>
    </aside>

  </section>
</main>

<script>
  const resumeHome = document.querySelector(".resume-home");

  if (resumeHome) {
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
        // Language switching still works for the current page when storage is unavailable.
      }
    };

    const setLanguage = (language) => {
      const isEnglish = language === "en";
      resumeHome.classList.toggle("is-english", isEnglish);
      resumeHome.setAttribute("data-language", language);
      document.documentElement.lang = isEnglish ? "en" : "zh-CN";

      if (languageToggle && label) {
        languageToggle.setAttribute("aria-pressed", String(isEnglish));
        languageToggle.setAttribute("title", isEnglish ? "切换到中文" : "Switch to English");
        languageToggle.setAttribute("aria-label", isEnglish ? "切换到中文" : "Switch about page language");
        label.textContent = isEnglish ? "中" : "EN";
      }

      storeLanguage(language);
    };

    setLanguage(readStoredLanguage() === "en" ? "en" : "zh");
    languageToggle?.addEventListener("click", () => {
      setLanguage(resumeHome.classList.contains("is-english") ? "zh" : "en");
    });
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy");

      if (!value || !navigator.clipboard) {
        return;
      }

      try {
        await navigator.clipboard.writeText(value);
        button.classList.add("is-copied");
        window.setTimeout(() => button.classList.remove("is-copied"), 1200);
      } catch (_error) {
        button.setAttribute("aria-label", value);
      }
    });
  });
</script>

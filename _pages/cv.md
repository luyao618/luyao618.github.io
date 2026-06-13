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

The Selected Impact sections are unrolled (rather than driven by a Liquid
loop over a string-split array) because Jekyll's strict-Liquid setting
resolved the dynamic key lookup `cv_zh[zh_key]` to nil under some
conditions, silently triggering the `| default: entry.bullet` fallback
on every bullet — which is what caused the all-English regression on
PR #7.
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
          <p class="cv-role-summary" data-lang="zh">{{ zh_role.summary | default: role.summary }}</p>
          <p class="cv-role-summary" data-lang="en">{{ role.summary }}</p>
        </li>
      {% endfor %}
    </ol>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Selected Impact · Copilot Mac &amp; Connectivity Quality</h2>
    <ul class="cv-bullets">
      {% for entry in sections["Selected Impact · Copilot Mac & Connectivity Quality"] %}
        {% assign zh_entry = cv_zh.selected_impact_copilot_mac[forloop.index0] %}
        <li>
          <div data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | markdownify }}</div>
          <div data-lang="en">{{ entry.bullet | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Selected Impact · Growth Analytics &amp; Paid Ads</h2>
    <ul class="cv-bullets">
      {% for entry in sections["Selected Impact · Growth Analytics & Paid Ads"] %}
        {% assign zh_entry = cv_zh.selected_impact_growth[forloop.index0] %}
        <li>
          <div data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | markdownify }}</div>
          <div data-lang="en">{{ entry.bullet | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Selected Impact · Data Platform / Warehouse / Observability</h2>
    <ul class="cv-bullets">
      {% for entry in sections["Selected Impact · Data Platform / Warehouse / Observability"] %}
        {% assign zh_entry = cv_zh.selected_impact_data_platform[forloop.index0] %}
        <li>
          <div data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | markdownify }}</div>
          <div data-lang="en">{{ entry.bullet | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="cv-section">
    <h2 class="cv-section-title">Selected Impact · User Profile &amp; Recommendation / Data Science</h2>
    <ul class="cv-bullets">
      {% for entry in sections["Selected Impact · User Profile & Recommendation / Data Science"] %}
        {% assign zh_entry = cv_zh.selected_impact_user_profile[forloop.index0] %}
        <li>
          <div data-lang="zh">{{ zh_entry.bullet | default: entry.bullet | markdownify }}</div>
          <div data-lang="en">{{ entry.bullet | markdownify }}</div>
        </li>
      {% endfor %}
    </ul>
  </section>

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
          <div class="cv-award-summary" data-lang="zh">{{ zh_award.summary | default: award.summary | markdownify }}</div>
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

    // The sidebar TOC is generated by tocbot from the page's h2 + h3
    // headings. Each translatable heading wraps its text in a zh and an
    // en data-lang span, so tocbot pulls the concatenated textContent and
    // TOC entries do not follow the language toggle. Sync them manually.
    //
    // Pairing: links are matched to headings by **document-order index**,
    // NOT by id lookup. The previous getElementById(href.slice(1)) approach
    // collided when a containing element shared an id with the heading
    // tocbot generated, so querySelector picked the section's first
    // descendant span (an h3 zh span) instead of the h2's own zh span —
    // which produced the EN-side TOC nesting regression where the first
    // top-level "Experience" entry rendered as "Senior Software Engineer".
    // Document-order pairing has no such failure mode: tocbot enumerates
    // headings in document order, so does our walk.
    //
    // A heading without any data-lang span (e.g. h2 section titles like
    // "Experience" / "Skills" / "Awards" — English-by-design per project
    // policy) is recorded with both zh and en equal to whatever tocbot
    // already wrote. That keeps the entry static across toggles.
    //
    // Span lookup uses a plain descendant selector (NOT `:scope >`).
    // OSP h3.cv-project-name wraps its zh/en spans inside an <a> for the
    // GitHub link, so a child-only `:scope > [data-lang="..."]` would
    // miss them and fall back to the static tocbot snapshot — the
    // round-4 OSP "Core Contributor / Contributor" regression. A
    // descendant query handles <a>, future <strong>/<em>, etc. without
    // enumerating wrapper tags. Safe because each heading contains at
    // most one paired zh+en data-lang pair and no nested headings.
    let tocCache = null;
    const collectHeadings = () =>
      Array.from(cvRoot.querySelectorAll("h2.cv-section-title, h3.cv-role-title, h3.cv-project-name, h3.cv-skill-name, h3.cv-award-title, h3.cv-edu-school"));

    const buildTocCache = () => {
      const links = document.querySelectorAll("#toc-sidebar a[href^='#']");
      const headings = collectHeadings();
      tocCache = Array.from(links).map((link, idx) => {
        const heading = headings[idx];
        const zhSpan = heading?.querySelector('[data-lang="zh"]');
        const enSpan = heading?.querySelector('[data-lang="en"]');
        const tocText = link.textContent.trim();
        return {
          link,
          zh: zhSpan ? zhSpan.textContent.trim() : tocText,
          en: enSpan ? enSpan.textContent.trim() : tocText,
        };
      });
      return tocCache;
    };

    const applyLanguageToToc = (language) => {
      // tocbot may run after our first setLanguage call; rebuild lazily.
      const cache = tocCache && tocCache.length > 0 ? tocCache : buildTocCache();
      const key = language === "en" ? "en" : "zh";
      cache.forEach(({ link, zh, en }) => {
        link.textContent = key === "en" ? en : zh;
      });
    };

    // Regression guard for the EN-state TOC nesting bug (round 3 review).
    // Logs a clear console error if the first top-level TOC entry ever
    // becomes anything other than the Experience heading — tocbot's
    // enumeration of h2.cv-section-title headings starts there, so a
    // different first entry means an h3 has been promoted.
    //
    // Comparison is case-insensitive on purpose. The source markdown
    // header is "Experience" (mixed case), but `text-transform:
    // uppercase` upcases what users see, and tocbot's choice of
    // innerText vs. textContent for label capture is not portable
    // across browsers (Chrome's innerText reflects CSS case, others'
    // textContent does not). A case-sensitive literal would either
    // false-positive on Chrome (round-5 smoke caught this) or break
    // again the day someone removes the CSS upcase. We compare the
    // case-folded source-level word.
    const verifyTocFirstEntry = () => {
      const firstTopLevel = document.querySelector(
        "#toc-sidebar > nav > ul > li:first-child > a, #toc-sidebar > ul > li:first-child > a, .toc-list > li:first-child > a",
      );
      if (!firstTopLevel) return;
      const text = firstTopLevel.textContent.trim();
      const expected = "Experience";
      if (text.toUpperCase() !== expected.toUpperCase()) {
        // eslint-disable-next-line no-console
        console.error(
          `[cv-toc] regression: first TOC entry expected "${expected}" (case-insensitive), got "${text}". ` +
            "h3 likely promoted to top level — see _pages/cv.md TOC sync logic.",
        );
      }

      // Round-5 regression guard for OSP h3 spans wrapped in <a> (round-4
      // selector fix). In EN state OSP child #2 must contain "Core
      // Contributor"; in ZH state it must contain "核心贡献者". Missing
      // structure (top-level OSP item, OSP children list, child #2) is
      // a hard failure — the guard's job is to catch silent breakage,
      // and a `:scope >` re-tightening / OSP h3 restructure / OSP order
      // shuffle would otherwise let the assertion no-op silently.
      const topItems = document.querySelectorAll(
        "#toc-sidebar > nav > ul > li, #toc-sidebar > ul > li, .toc-list > li",
      );
      const ospItem = Array.from(topItems).find((li) =>
        /open source projects/i.test(li.querySelector(":scope > a")?.textContent || ""),
      );
      if (!ospItem) {
        // eslint-disable-next-line no-console
        console.error(
          "[cv-toc] regression: OSP top-level TOC item not found. " +
            "Likely the section was renamed, removed, or moved out of the top-level set.",
        );
        return;
      }
      const ospHermesLink = ospItem.querySelectorAll(":scope > ul > li > a")[1];
      if (!ospHermesLink) {
        // eslint-disable-next-line no-console
        console.error(
          "[cv-toc] regression: OSP child #2 (hermes-agent) not found. " +
            "Likely the OSP h3 structure changed, the project order was shuffled, or tocbot stopped capturing OSP children.",
        );
        return;
      }
      const ospText = ospHermesLink.textContent.trim();
      const isEnglish = cvRoot.classList.contains("is-english");
      const expectedOsp = isEnglish ? "Core Contributor" : "核心贡献者";
      if (!ospText.includes(expectedOsp)) {
        // eslint-disable-next-line no-console
        console.error(
          `[cv-toc] regression: OSP hermes-agent entry (${isEnglish ? "EN" : "ZH"} state) expected to include "${expectedOsp}", got "${ospText}". ` +
            "Likely the data-lang span selector was re-tightened to :scope > and is missing <a>-wrapped spans.",
        );
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

      applyLanguageToToc(language);
      verifyTocFirstEntry();
      storeLanguage(language);
    };

    const initialLanguage = readStoredLanguage() === "en" ? "en" : "zh";
    setLanguage(initialLanguage);
    languageToggle?.addEventListener("click", () => {
      setLanguage(cvRoot.classList.contains("is-english") ? "zh" : "en");
    });

    // tocbot binds on DOMContentLoaded and writes link text after we
    // first set the language, so re-apply once it's done. Use a short
    // window of polls to find the populated TOC, then re-sync.
    const tocReadyDeadline = Date.now() + 4000;
    const tocReadyPoll = setInterval(() => {
      const links = document.querySelectorAll("#toc-sidebar a[href^='#']");
      if (links.length > 0) {
        clearInterval(tocReadyPoll);
        tocCache = null; // force rebuild against the populated TOC
        applyLanguageToToc(cvRoot.classList.contains("is-english") ? "en" : "zh");
        verifyTocFirstEntry();
      } else if (Date.now() > tocReadyDeadline) {
        clearInterval(tocReadyPoll);
      }
    }, 120);
  })();
</script>

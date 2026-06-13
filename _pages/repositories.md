---
layout: page
permalink: /repositories/
title: repositories
description: GitHub profile and selected repositories.
nav: true
nav_order: 3
---

{% if site.data.repositories.github_users %}

## GitHub users

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

---

{% if site.repo_trophies.enabled %}
{% for user in site.data.repositories.github_users %}
{% if site.data.repositories.github_users.size > 1 %}

  <h4>{{ user }}</h4>
  {% endif %}
  <div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% include repository/repo_trophies.liquid username=user %}
  </div>

---

{% endfor %}
{% endif %}
{% endif %}

{% assign repo_categories = site.data.repositories.github_repo_categories %}

{% if repo_categories %}

{% for category in repo_categories %}

## {{ category.title }}

<ul class="list-unstyled">
  {% for repo in category.repositories %}
    <li class="mb-2">
      {% if repo.show_card == false %}
        <strong>{{ repo.icon }} {{ repo.name }}</strong>
      {% else %}
        <a href="https://github.com/{{ repo.repository }}"><strong>{{ repo.icon }} {{ repo.name }}</strong></a>
      {% endif %}
      {% if repo.description %}
        <span class="text-muted">&mdash; {{ repo.description }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in category.repositories %}
    {% unless repo.show_card == false %}
      {% include repository/repo.liquid repository=repo.repository %}
    {% endunless %}
  {% endfor %}
</div>

{% endfor %}

{% elsif site.data.repositories.github_repos %}

## GitHub Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}

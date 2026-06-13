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

{% endif %}

{% assign repo_categories = site.data.repositories.github_repo_categories %}

{% if repo_categories %}

{% for category in repo_categories %}

## {{ category.title }}

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in category.repositories %}
    {% include repository/repo.liquid repository=repo %}
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

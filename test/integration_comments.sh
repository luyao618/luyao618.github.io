#!/usr/bin/env bash
set -euo pipefail

tmp_dir="$(mktemp -d)"
tmp_override="${tmp_dir}/comments-test-override.yml"
tmp_source="${tmp_dir}/source"
tmp_site="${tmp_dir}/site"

cleanup() {
  rm -rf "${tmp_dir}"
}
trap cleanup EXIT

rsync -a \
  --exclude .git \
  --exclude .jekyll-cache \
  --exclude .sass-cache \
  --exclude _site \
  --exclude node_modules \
  ./ "${tmp_source}/"

mkdir -p "${tmp_source}/_posts"
cat >"${tmp_source}/_posts/2022-01-01-giscus-comments.md" <<'MARKDOWN'
---
layout: post
title: Giscus comments
giscus_comments: true
---

Giscus integration fixture.
MARKDOWN

cat >"${tmp_source}/_posts/2015-01-01-disqus-comments.md" <<'MARKDOWN'
---
layout: post
title: Disqus comments
disqus_comments: true
---

Disqus integration fixture.
MARKDOWN

cat >"${tmp_override}" <<'YAML'
giscus:
  repo: alshedivat/al-folio
  repo_id: R_kgDOExample
  category: Comments
  category_id: DIC_kwDOExample
YAML

(cd "${tmp_source}" && bundle exec jekyll build --config "_config.yml,${tmp_override}" -d "${tmp_site}" >/dev/null)

giscus_page="${tmp_site}/blog/2022/giscus-comments/index.html"
disqus_page="${tmp_site}/blog/2015/disqus-comments/index.html"

if [[ ! -f "${giscus_page}" ]]; then
  echo "giscus fixture page was not generated at ${giscus_page}" >&2
  exit 1
fi

grep -q 'https://giscus.app/client.js' "${giscus_page}"
if grep -q 'giscus comments misconfigured' "${giscus_page}"; then
  echo "unexpected giscus misconfiguration warning in ${giscus_page}" >&2
  exit 1
fi

if [[ ! -f "${disqus_page}" ]]; then
  echo "disqus fixture page was not generated at ${disqus_page}" >&2
  exit 1
fi

grep -q 'id="disqus_thread"' "${disqus_page}"
grep -q '.disqus.com/embed.js' "${disqus_page}"

echo "comments integration checks passed"

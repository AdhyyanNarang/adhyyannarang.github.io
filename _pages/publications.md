---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

Hey, the publications are working.

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}

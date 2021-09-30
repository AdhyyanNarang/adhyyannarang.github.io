---
layout: archive
title: 
permalink: /publications/
author_profile: true
---

{% include base_path %}

(\*) Equal contribution


{% for post in site.preprints reversed %}

{% if post.urltext %}
{% if post.venue %}
**{{ post.title }}**   
{{post.authors}}. *{{post.venue}} {{post.year}}* [({{post.urltext}})]({{post.arxivurl}})
{% else %}
**{{ post.title }}**   
{{post.authors}}. *{{post.year}}* [({{post.urltext}})]({{post.arxivurl}})
{% endif %}

{% else %}
{% if post.venue %}
**{{ post.title }}**   
{{post.authors}}. *{{post.venue}} {{post.year}}* 
{% else %}
**{{ post.title }}**   
{{post.authors}}. *{{post.year}}*
{% endif %}
{% endif %}

{% endfor %}


{% for post in site.publications reversed %}
{% if post.urltext %}
{% if post.venue %}
**{{ post.title }}**   
{{post.authors}}. *{{post.venue}} {{post.year}}* [({{post.urltext}})]({{post.arxivurl}})
{% else %}
**{{ post.title }}**   
{{post.authors}}. *{{post.year}}* [({{post.urltext}})]({{post.arxivurl}})
{% endif %}

{% else %}
{% if post.venue %}
**{{ post.title }}**   
{{post.authors}}. *{{post.venue}} {{post.year}}* 
{% else %}
**{{ post.title }}**   
{{post.authors}}. *{{post.year}}*
{% endif %}
{% endif %}

{% endfor %}

---
title:
permalink: /publications/
author_profile: true
---

{% include base_path %}

(\*) Equal contribution

## AI Safety & LLM Alignment

I study how harmful or hidden behaviors can emerge from realistic LLM training pipelines and how to mitigate them. This includes targeted manipulation induced by optimization for user feedback, as well as inference-time consensus methods that suppress behaviors introduced by poisoned or otherwise problematic fine-tuning data without requiring labels for safe source models.

{% for post in site.publications reversed %}
{% if post.category contains 'safety' %}
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
{% endif %}

{% endfor %}

## Feedback Loops & Multi-Agent Learning

When ML models are deployed in the real world, they shape the data they are trained on and the behavior of other agents. A recommender system influences what users consume; a pricing algorithm changes competitor behavior; a language model shapes the distribution of text it will later be fine-tuned on. I develop game-theoretic and optimization frameworks for understanding and controlling these feedback dynamics, building on tools from performative prediction, statistical learning and dynamical systems.

{% for post in site.publications reversed %}
{% if post.category contains 'strategic' %}
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
{% endif %}

{% endfor %}

## Sample-Efficient Learning

How can agents learn to make good decisions with as few samples as possible? We study this question in two settings: reinforcement learning, where we show how to exploit structural similarities between policies to dramatically reduce sample complexity; and black-box optimization of submodular + supermodular objectives under bandit feedback, with applications to active learning, summarization, and content recommendation.

{% for post in site.publications reversed %}
{% if post.category contains 'online' %}
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
{% endif %}

{% endfor %}

## Foundations of Overparameterized Learning

Modern neural networks have far more parameters than training points, yet generalize well in practice — defying classical statistical theory. We study this phenomenon in linear models, showing that classification is fundamentally easier than regression in overparameterized settings, and that overparameterization can make models brittle to adversarial perturbations even when standard performance is good. We also study meta-learning under overparameterization, giving insight into where useful inductive biases come from.

{% for post in site.publications reversed %}
{% if post.category contains 'overparam' %}
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
{% endif %}

{% endfor %}

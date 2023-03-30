---
title:
permalink: /publications/
author_profile: true
---

{% include base_path %}

(\*) Equal contribution

## Sequential Learning

Recommender systems are known to overfit to users' *revealed preferences*, which are different than their true preferences; this often leads to the systems showing users addictive or harmful content. This failure can be understood as the system's inability to correctly balance depth and breadth of chosen content for each user. These competing objectives can be well-modeled as the sum of a submodular and supermodular function. These functions also are useful to model active learning, summarization amongst other applications of ``item selection" in ML. We study the black-box optimization of these functions in a low-information setting, where decisions are made sequentially.

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



## Strategic Learning

Traditional ML usually considers the learner to be an independent agent in an isolated world; and chooses training objectives and algorithms accordingly. However, in practice most models are deployed in complex ecosystems with many other models, each of whom influence each others data. How should we perform learning in these settings?

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





## Overparameterized Learning

In machine learning, the loss on training data is often used as a proxy for the loss on an unseen test point. Traditional statistical theory justifies this approach for underparameterized settings: when the number of training points greatly exceeds the number of parameters of the model. However, modern neural networks are almost always *overparameterized*. Is the above proxy still a reasonable choice?

We explore this question for classification problems. We show that classification is 'easier' than regression, and that overparameterization could make models brittle even when regular performance is good. Additionally, we study meta-learning in overparameterization; this also gives an insight into where the prior for single-agent overparameterized regression comes from.

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




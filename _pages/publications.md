---
title:
permalink: /publications/
author_profile: true
---

{% include base_path %}

(\*) Equal contribution

## AI Safety

Most modern LLMs are trained to maximize human feedback. However, training to maximize human feedback creates a perverse incentive structure for the AI to resort to manipulative or deceptive tactics to obtain positive feedback from users who are vulnerable to such strategies.

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


## Sequential and Strategic Learning

Traditional ML usually considers the learner to be an independent agent in an isolated world; and chooses training objectives and algorithms accordingly. However, in practice data is generated by humans, and models are deployed in complex ecosystems with many other models. The decisions of any one learner has an impact on other learners and users. How can we ensure that these systems exhibit long-run behavior that is socially desirable?

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




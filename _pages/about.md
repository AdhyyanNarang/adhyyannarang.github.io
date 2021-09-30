---
permalink: /
title: "Adhyyan Narang"
excerpt: "About me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

## Bio

I am  a PhD Student in the [ECE Department](https://www.ece.uw.edu/) of University of Washington, advised by [Prof. Maryam Fazel](https://faculty.washington.edu/mfazel/) and [Prof. Lillian Ratliff](http://faculty.washington.edu/ratliffl/about/).

I recently completed my Masters in the [BLISS Lab](http://bliss.eecs.berkeley.edu/) in the [EECS](https://eecs.berkeley.edu/) department at [UC Berkeley](https://www.berkeley.edu/), where I was advised by Prof. Anant Sahai. My master's thesis explored the role of margins for overparameterized classification problems and can be found [here](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2020/EECS-2020-116.pdf). 

I completed my undergraduate studies at UC Berkeley with a major in EECS and minor in Theater and Performance Studies.

## Research Interests

My research interests lie within optimization, game theory, and statistical learning theory; I often use tools from signal processing and dynamical systems. Broadly, I am interested in developing theory to inspire the development of principled and robust ML systems. Topics that I am especially interested in are introduced below, and my work can be found in the publications tab.

**Overparameterized machine learning:** The success of neural networks with many more parameters than available data points cannot be explained by traditional learning theory, which emphasizes the importance of the bias variance tradeoff. Hence a gap has emerged in the theory over the past few years, and the double-descent explanation for generalization has started to gain prominence for regression problems. However, there are various open questions of interest, and my work has focussed on answering the following.
1. Does double-descent apply to classification problems as well, and are these easier or harder than regression problems in overparameterized setups?
2. How do lifted models differ from linear models for overparameterized classification, and can adversarial examples be understood as a consequence of overparameterization?
3. The double-descent explanation emphasizes the importance of having the right prior, something that is central to all Bayesian reasoning. But where does the prior come from? We propose meta-learning as an answer.

**Convergence of gradient-algorithms in Game Theory:** An increasing number of challenges in adversarial machine learning can be best understood as game-theoretic problems. However, practitioners either ignore these game-effects or address them in ad-hoc ways. I am working to develop theory to identify when these adopted approaches can be shown to possess desirable convergence properties and to propose alternatives with guarantees when they do not.

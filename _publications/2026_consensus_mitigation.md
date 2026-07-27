---
title: 'Inference-Time Consensus for Mitigating Hidden Behaviors from LLM Fine-Tuning'
authors: 'Adhyyan Narang\*, Artin Tajdini\*, Claire Zhang, Jamie Morgenstern'
urltext: 'paper'
arxivurl: '/files/inference_time_consensus_2026.pdf'
collection: publications
category: 'safety'
permalink: /publications/inference-time-consensus/
year: 2026
venue: 'Accepted to the AdvML-Frontiers × CoTMA Workshop at COLM'
date: 2026-07-25
---

Fine-tuning can introduce hidden behaviors through explicit poisoning, subliminal signals, or broader emergent misalignment. We develop token-wise consensus decoders that aggregate separately fine-tuned models without requiring labels for safe sources, poisoned examples, or intervention costs. Across several failure modes, the methods suppress harmful behavior while preserving much of the benefit of fine-tuning.

The paper introduces token-wise minimum and base-relative consensus and compares them with union training, LoRA merging, and whole-output consensus. It also studies partial benefit support and surface-form disagreement through semantic smoothing. I co-developed the core idea with Artin Tajdini, designed the decoders, ran the explicit-prefix and robustness experiments, and led the writing and project coordination. [Workshop](https://advml-frontier.github.io/) · [Code](https://github.com/AdhyyanNarang/consensus-aggregation)

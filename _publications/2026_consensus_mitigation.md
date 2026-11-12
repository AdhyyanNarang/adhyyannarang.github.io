---
title: 'Defense via Consensus: Mitigating Subliminal Learning through Multi-Teacher Distillation'
authors: 'Adhyyan Narang\*, Artin Tajdini\*, Claire Zhang\*, Jamie Morgenstern'
urltext: 'arXiv'
arxivurl: 'https://arxiv.org/abs/2607.23394'
collection: publications
category: 'safety'
permalink: /publications/inference-time-consensus/
year: 2026
venue: 'Preprint. Adv-ML Frontiers Workshop COLM 2026; AI4Good Workshop NeurIPS'
date: 2026-07-25
modified: 2026-10-17
---

Fine-tuning can introduce harmful behaviors through poisoned data or unintended generalization from seemingly benign examples. Multi-Source Consensus Distillation (MSCD) learns capabilities shared across datasets while suppressing source-specific harmful behaviors, without knowing which sources are compromised.

We fine-tune a teacher on each dataset, use agreement among teachers to generate replacement training responses, and train a fresh student on those responses. Evaluations cover controlled poisoning, subliminal learning, and emergent misalignment. On Qwen2.5-7B with three of four training sources compromised, MSCD retained 87% intent-classification accuracy while reducing unsafe medical responses from 42.5% with pooled-data training to 2.5%. Distillation preserves the benefits of consensus while requiring only one model at inference time.

Adhyyan Narang\*, Artin Tajdini\*, Claire Zhang\*, Jamie Morgenstern. *\* Equal contribution.*

*Preprint, 2026. Adv-ML Frontiers Workshop COLM 2026; AI4Good Workshop NeurIPS 2026.*

[Paper on arXiv](https://arxiv.org/abs/2607.23394) · [Code](https://github.com/AdhyyanNarang/consensus-aggregation)

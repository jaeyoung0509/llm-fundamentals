# Learning Guide

## Core Strategy

This curriculum tries to hold three things at the same time:

- math is explained in direct connection to models,
- PyTorch implementation is introduced early,
- durable engineering patterns come before trend-chasing.

## Recommended Sequence

<MermaidDiagram>
flowchart LR
  A["Math intuition"] --> B["Tensors and PyTorch"]
  B --> C["Deep learning basics"]
  C --> D["Attention and Transformers"]
  D --> E["GPT-1 to GPT-3"]
  E --> F["RL and RLHF"]
  F --> G["Evaluation, RAG, deployment"]
  G --> H["Projects and portfolio"]
</MermaidDiagram>

## 12-Week Sprint

| Period | Focus | Output |
| --- | --- | --- |
| Weeks 1-2 | Math foundations | Notes on vectors, derivatives, probability |
| Weeks 3-4 | Python and PyTorch | A hand-built training loop |
| Week 5 | Deep learning basics | MLP experiment report |
| Weeks 6-7 | Transformers | A self-attention implementation |
| Week 8 | GPT-3 understanding | A short GPT family summary |
| Week 9 | LLM practical basics | Prompting and eval checklist |
| Week 10 | RL and RLHF | PPO and RLHF concept map |
| Weeks 11-12 | AI engineering project | Mini RAG or document QA demo |

## Starting Points by Reader Type

### If math feels weak

- Start with [Math Foundations](/en/math/).
- Focus on the meaning of gradients and loss before formalism.
- Move forward once vectors, derivatives, and expectation feel intuitive.

### If you can code but your theory is weak

- Skim [Transformers](/en/transformers/) and [LLMs and GPT-3](/en/llms/) first.
- Return to [Math Foundations](/en/math/) and [Deep Learning Basics](/en/deep-learning/) to patch the gaps.

### If you want practical engineering context fast

- Follow [Python and PyTorch](/en/python-pytorch/) -> [Transformers](/en/transformers/) -> [AI Engineering](/en/ai-engineering/).
- Build something early, then deepen math and RLHF later.


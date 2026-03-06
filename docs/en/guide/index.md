# Learning Guide

## Core Strategy

This curriculum tries to hold three things at the same time:

- math is explained in direct connection to models,
- PyTorch implementation is introduced early,
- durable engineering patterns come before trend-chasing.

## Default Mindset

This book is best read with one concrete persona in mind: a middle-school student who is already good at Python and is entering high school with the goal of mastering LLMs.

- Python syntax and basic programming are already comfortable.
- Linear algebra, calculus, and probability have not yet been tied to models.
- The first objective is not perfection. It is to complete one full pass across the map.

## One Sentence to Keep

It is faster to complete one full pass across the field first, then return for depth, than to demand perfect understanding from page one.

## First-Pass Strategy

1. build math intuition fast,
2. hand-write a PyTorch training loop,
3. reach Transformers and GPT-3,
4. get one pass over RLHF and AI engineering,
5. return for depth where needed.

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

## First-Pass Exit Criteria

- explain why each math block matters for models,
- write a training loop in PyTorch,
- explain the core structure of Transformers and GPT-3,
- describe where RLHF, RAG, evaluation, and deployment fit,
- hold the whole map in your head even before deep specialization.

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

## Checklist

- can you describe the full learning order,
- can you explain why a first pass matters,
- can you choose your own starting point.

## How This Connects Forward

Once the learning strategy is clear, the next step is to enter the most important foundation track: math.

Next: [Math Foundations](/en/math/)

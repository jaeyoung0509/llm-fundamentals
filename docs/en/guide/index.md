# Learning Guide

## Core Strategy

This curriculum tries to hold three things at the same time:

- math is explained in direct connection to models,
- PyTorch implementation is introduced early,
- durable engineering patterns come before trend-chasing.

## One Sentence to Keep

It is faster to complete one full pass across the field first, then return for depth, than to demand perfect understanding from page one.

## First-Pass Strategy

1. build math intuition fast,
2. hand-write a PyTorch training loop,
3. reach Transformers and GPT-3,
4. get one pass over RLHF and AI engineering,
5. return for depth where needed.

## Recommended Sequence

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;Math intuition&quot;] --> B[&quot;Tensors and PyTorch&quot;]
  B --> C[&quot;Deep learning basics&quot;]
  C --> D[&quot;Attention and Transformers&quot;]
  D --> E[&quot;GPT-1 to GPT-3&quot;]
  E --> F[&quot;RL and RLHF&quot;]
  F --> G[&quot;Evaluation, RAG, deployment&quot;]
  G --> H[&quot;Projects and portfolio&quot;]`"
/>

## Core Path vs Math Deep-Dive Path

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;Math foundations&quot;] --> B[&quot;Math final checkpoint&quot;]
  B --> C[&quot;Core path: PyTorch&quot;]
  B --> D[&quot;Optional deep dive: advanced math&quot;]
  D --> E[&quot;paper-reading depth&quot;]
  C --> F[&quot;Transformers / GPT-3&quot;]
  E --> F`"
/>

- the core path is the fastest route to implementation and model structure,
- the advanced math path is an optional branch for paper-heavy depth,
- if serious Transformer or RLHF papers still feel mathematically dense, branch into [Advanced Math Overview](/en/math-advanced/).

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

## Optional Math-Deepening Branch

This branch is not a prerequisite wall. It is a reinforcement track to slot in after the basic math foundation is stable.

| Timing | Deep-dive topic | Why it helps |
| --- | --- | --- |
| After week 2 | [Trigonometry and Periodicity](/en/math-advanced/trigonometry-periodicity) | positional encoding, RoPE, periodic signal intuition |
| Weeks 4-5 | [Advanced Linear Algebra](/en/math-advanced/advanced-linear-algebra), [Eigendecomposition and SVD](/en/math-advanced/eigendecomposition-svd) | embedding geometry, low-rank structure, compression |
| Weeks 6-8 | [Multivariable Calculus](/en/math-advanced/multivariable-calculus), [Optimization and Numerical Stability](/en/math-advanced/optimization-numerical-stability) | curvature, training stability, conditioning |
| After week 8 | [Statistics and Estimation](/en/math-advanced/statistics-estimation), [Information Theory](/en/math-advanced/information-theory), [Fourier and Positional Signals](/en/math-advanced/fourier-positional-signals) | evaluation, distribution shift, positional/spectral views |

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
- After the base track, use [Advanced Math Overview](/en/math-advanced/) as a selective reinforcement branch.

### If you can code but your theory is weak

- Start with [Math Foundations](/en/math/) -> [Python and PyTorch](/en/python-pytorch/) -> [Transformers](/en/transformers/).
- Return to [LLMs and GPT-3](/en/llms/) after the core ladder feels stable.
- Before dense paper reading, slot in the advanced math chapters that match the formulas you keep seeing.

### If you want practical engineering context fast

- Follow [Python and PyTorch](/en/python-pytorch/) -> [Transformers](/en/transformers/) -> [AI Engineering](/en/ai-engineering/).
- Build something early, then deepen math and RLHF later.

## Writing Principles

- do not stop at definitions; connect intuition, formula, diagram, and code,
- treat math as model language, not as isolated school content,
- use Mermaid whenever sequence, transformation, or system flow becomes hard to hold in plain text,
- end each chapter with practice and a bridge to the next chapter.

## Checklist

- can you describe the full learning order,
- can you explain why a first pass matters,
- can you choose your own starting point.

## How This Connects Forward

Once the learning strategy is clear, the next step is to enter the most important foundation track: math.

Next: [Math Foundations](/en/math/)

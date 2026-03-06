# Roadmap

## End Goal

The mid-point goal of this book is clear understanding up to GPT-3. The final goal is to become an AI engineer who can reason about evaluation, deployment, and operations.

## Current State

The repository has already moved beyond the first pass. The core math track rewrite is now in place, including the [Math Final Checkpoint](/en/math/final-checkpoint), and the [Advanced Math Overview](/en/math-advanced/) branch is now available for deeper paper-reading fluency.

## Current Learning Ladder

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;Math foundations&quot;] --> B[&quot;Math final checkpoint&quot;]
  B --> C[&quot;Core path: Python and PyTorch&quot;]
  B --> D[&quot;Optional deep dive: advanced math&quot;]
  C --> E[&quot;Deep learning basics&quot;]
  D --> F[&quot;paper-reading depth&quot;]
  E --> G[&quot;Transformers&quot;]
  F --> G
  G --> H[&quot;LLMs and GPT-3&quot;]
  H --> I[&quot;RLHF&quot;]
  I --> J[&quot;AI Engineering&quot;]
  J --> K[&quot;Projects&quot;]`"
/>

## Milestones

| Stage | Question | Exit criteria |
| --- | --- | --- |
| 1 | What math do we actually need | Explain vectors, derivatives, and probability in model and paper terms |
| 2 | Can we build the training loop ourselves | Explain tensors, autograd, dataloaders, optimizers, and debugging |
| 3 | Why did Transformers appear | Explain attention, masking, positional encoding, and decoder-only structure |
| 4 | What changed with GPT-3 | Explain scale, next-token prediction, in-context learning, and limitations |
| 5 | How do RLHF and modern practice connect | Explain reward models, PPO, evaluation, RAG, deployment, and risk |

## Two Math Paths

| Path | Purpose | When to use it |
| --- | --- | --- |
| Core math path | rebuild the minimum math needed for implementation and model reading | at the start of the book |
| Advanced math path | deepen trig, linear algebra, optimization, information theory, and spectral intuition for papers | when Transformer, RLHF, or research-heavy formulas start to feel dense |

## Remaining Priorities

1. Bring the rest of the core chapters up to the same paper-reading and code-mapping standard as the math track.
2. Keep Korean and English aligned in the same content wave.
3. Upgrade the project chapter into portfolio-grade specifications.
4. Keep TODO and roadmap synced with the real documentation state.

## Completion Criteria

- every core Korean chapter feels beyond outline level,
- English mirrors preserve the same learning ladder,
- core chapters include diagrams, paper-reading cues, exercises, and chapter bridges,
- the math track ends with a capstone checkpoint that reconnects the whole section,
- the advanced math branch works as a real optional path for research-paper fluency,
- `npm test` passes.

## Recommended Starting Points

- [Math Foundations](/en/math/) if math feels weak,
- [Math Final Checkpoint](/en/math/final-checkpoint) for a full-section review,
- [Advanced Math Overview](/en/math-advanced/) for paper-heavy depth,
- [Python and PyTorch](/en/python-pytorch/) if implementation fluency is the main goal,
- [Transformers](/en/transformers/) if model structure is the immediate interest,
- [AI Engineering](/en/ai-engineering/) if systems and operations are the priority.

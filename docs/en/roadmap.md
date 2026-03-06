# Roadmap

## End Goal

The mid-point goal of this book is clear understanding up to GPT-3. The final goal is to become an AI engineer who can reason about evaluation, deployment, and operations.

## Current State

The repository has already moved beyond the first pass. The math track rewrite is now in place, including the [Math Final Checkpoint](/en/math/final-checkpoint). The current phase is to spread that same density and paper-to-code rigor across the rest of the book.

## Current Learning Ladder

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;Math foundations&quot;] --> B[&quot;Python and PyTorch&quot;]
  B --> C[&quot;Deep learning basics&quot;]
  C --> D[&quot;NLP before Transformers&quot;]
  D --> E[&quot;Transformers&quot;]
  E --> F[&quot;LLMs and GPT-3&quot;]
  F --> G[&quot;Practical LLM basics&quot;]
  G --> H[&quot;RLHF&quot;]
  H --> I[&quot;AI Engineering&quot;]
  I --> J[&quot;Projects&quot;]`"
/>

## Milestones

| Stage | Question | Exit criteria |
| --- | --- | --- |
| 1 | What math do we actually need | Explain vectors, derivatives, and probability in model and paper terms |
| 2 | Can we build the training loop ourselves | Explain tensors, autograd, dataloaders, optimizers, and debugging |
| 3 | Why did Transformers appear | Explain attention, masking, positional encoding, and decoder-only structure |
| 4 | What changed with GPT-3 | Explain scale, next-token prediction, in-context learning, and limitations |
| 5 | How do RLHF and modern practice connect | Explain reward models, PPO, evaluation, RAG, deployment, and risk |

## Remaining Priorities

1. Bring the rest of the core chapters up to the same paper-reading and code-mapping standard as the math track.
2. Keep Korean and English aligned in the same content wave.
3. Keep TODO and roadmap synced with the real documentation state.
4. Upgrade the project chapter into portfolio-grade specifications.

## Completion Criteria

- every core Korean chapter feels beyond outline level,
- English mirrors preserve the same learning ladder,
- core chapters include diagrams, paper-reading cues, exercises, and chapter bridges,
- the math track ends with a capstone checkpoint that reconnects the whole section,
- `npm test` passes.

## Recommended Starting Points

- [Math Foundations](/en/math/) if math feels weak,
- [Math Final Checkpoint](/en/math/final-checkpoint) for a full-section review,
- [Python and PyTorch](/en/python-pytorch/) if implementation fluency is the main goal,
- [Transformers](/en/transformers/) if model structure is the immediate interest,
- [AI Engineering](/en/ai-engineering/) if systems and operations are the priority.

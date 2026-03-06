# Projects

## Why This Module Matters

Strong projects are not just runnable code. They also make design choices, evaluation logic, failure cases, and operational risk visible.

## One Sentence to Keep

Projects are where math, models, evaluation, and operations get tied together into real engineering work.

## Project Tracks At A Glance

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;tiny LM&quot;] --> D[&quot;modeling track&quot;]
  B[&quot;mini RAG&quot;] --> E[&quot;system track&quot;]
  C[&quot;bandit / preference experiment&quot;] --> F[&quot;alignment track&quot;]`"
/>

## Track 1. Tiny Character Or Token LM

### Goal

Train a small language model directly so tokenization, embeddings, loss, and generation become concrete.

### Prerequisites

- math foundations,
- Python and PyTorch,
- deep learning basics,
- basic model intuition.

### Data / Input

- small text corpus,
- character-level data or tiny-tokenizer text.

### Implementation Scope

- tokenizer or character vocabulary,
- dataset and dataloader,
- tiny language model training,
- generation loop,
- loss tracking.

### Evaluation

- train and validation loss,
- sample generations,
- overfitting signals.

### Failure Cases

- weak vocabulary design,
- sequence length too short,
- unstable loss despite plausible samples.

### Deliverables

- learning curves,
- sample outputs,
- model explanation,
- retrospective.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;text corpus&quot;] --> B[&quot;tokenizer&quot;]
  B --> C[&quot;dataset / dataloader&quot;]
  C --> D[&quot;tiny language model&quot;]
  D --> E[&quot;loss + generation eval&quot;]`"
/>

## Track 2. Mini RAG Or Document QA

### Goal

Build a retrieval-plus-generation system and learn retrieval quality, prompt construction, and answer evaluation.

### Prerequisites

- Python or LLM API experience,
- practical LLM basics,
- AI engineering basics.

### Data / Input

- document collection,
- question set.

### Implementation Scope

- chunking,
- embedding and indexing,
- retrieval,
- prompt construction,
- answer generation,
- small evaluation set.

### Evaluation

- retrieval hit quality,
- grounded answer quality,
- latency and cost.

### Failure Cases

- poor chunking,
- weak retrieval,
- hallucinated answers without grounding.

### Deliverables

- architecture diagram,
- retrieval/eval table,
- failure-case analysis.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;documents&quot;] --> B[&quot;chunking&quot;]
  B --> C[&quot;embedding / index&quot;]
  D[&quot;user query&quot;] --> E[&quot;retrieval&quot;]
  C --> E
  E --> F[&quot;prompt with context&quot;]
  F --> G[&quot;LLM answer&quot;]
  G --> H[&quot;eval&quot;]`"
/>

## Track 3. Bandit Or Preference Experiment

### Goal

Learn reward and alignment intuition through a compact experiment, even without implementing full RLHF.

### Prerequisites

- probability and expectation,
- RL/RLHF basics,
- Python implementation comfort.

### Data / Input

- response candidates,
- synthetic reward or simple preference data.

### Implementation Scope

- bandit loop or pairwise preference setup,
- reward computation,
- policy or action selection comparison,
- result visualization.

### Evaluation

- cumulative reward,
- regret or preference accuracy,
- policy trend over time.

### Failure Cases

- too little exploration,
- bad reward definition,
- mismatch between synthetic reward and actual preference.

### Deliverables

- reward plots,
- strategy comparison,
- experiment retrospective.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;candidates&quot;] --> B[&quot;reward / preference signal&quot;]
  B --> C[&quot;selection policy&quot;]
  C --> D[&quot;observed outcome&quot;]
  D --> E[&quot;policy update&quot;]`"
/>

## Common Project Template

- problem statement,
- data and constraints,
- model or system design,
- implementation scope,
- evaluation criteria,
- failure cases,
- retrospective.

## Portfolio Lens

Interviewers usually look for:

1. why this problem was chosen,
2. how success was measured,
3. what failed and what was learned,
4. whether operational risk was considered.

## Checklist

- is the problem clearly framed,
- is there a clear evaluation criterion,
- can failure cases be explained,
- does the retrospective identify concrete improvements.

## How This Connects Forward

Projects do not end the journey. They send the learner back into math, Transformers, and AI engineering with clearer weaknesses and sharper questions.

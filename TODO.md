# LLM Fundamentals Ebook TODO

## Project Goals

- Design a learning path from math foundations to AI engineering.
- Connect mathematical understanding, PyTorch implementation, model intuition, and practical deployment patterns.
- Build a bilingual ebook experience with English and Korean support.
- Cover the path through GPT-3, then extend into RLHF and modern AI engineering practice.

## Working Strategy: Finish One Full First Pass

- [x] 모든 핵심 장에 최소한의 1차 본문을 먼저 채운다.
- [x] 수학 섹션은 가장 중요한 기반 축으로 유지하되, 다른 장도 비워두지 않는다.
- [x] 각 장마다 "이 장에서 꼭 가져갈 한 문장"을 넣는다.
- [x] 각 장마다 "다음 장으로 어떻게 연결되는가"를 넣는다.
- [ ] 1차 패스 완료 후, 수학/Transformer/AI Engineering 순으로 2차 심화를 진행한다.

## First-Pass Completion Tracker

### A. Shared Criteria

- [x] Every core chapter has a Korean draft.
- [x] Every core chapter has an English counterpart.
- [x] Every core chapter includes a one-sentence takeaway.
- [x] Every core chapter includes a bridge to the next chapter.
- [x] Every core chapter includes at least one checklist, question set, or exercise.

### B. Chapter Completion

- [x] Prologue and learning guide
- [x] Math foundations
- [x] Python and PyTorch
- [x] Deep learning basics
- [x] NLP before Transformers
- [x] Transformer fundamentals
- [x] GPT-1 to GPT-3
- [x] Practical LLM basics
- [x] Reinforcement learning and RLHF
- [x] AI engineering
- [x] Project-based learning

### C. Exit Conditions

- [x] Site build passes.
- [x] GitHub Pages deployment passes.
- [x] Roadmap and TODO reflect the current state.
- [x] Notify the user when the first pass is complete.

## Primary Audience

- learners starting AI seriously for the first time
- developers who can code but need to rebuild their math intuition
- future AI engineers who want evaluation, deployment, and operations context

## Midpoint Audit: Current Weak Spots

- [ ] Deepen the math section so it teaches paper-reading skills, not just chapter summaries.
- [ ] Add notation guidance: what `x`, `W`, `X`, `QK^T`, `p(y|x)`, `L(theta)` mean in practice.
- [ ] Add bridges from math pages to PyTorch tensor code and later Transformer equations.
- [ ] Expand `Python and PyTorch` with autograd, datasets, dataloaders, and debugging habits.
- [ ] Expand `Deep Learning Basics` with activation, loss, optimization, and regularization.
- [ ] Expand `Transformer` with multi-head attention, scaling, masking, and decoder-only reading.
- [ ] Expand `Projects` from rough prompts into scoped project specs with evaluation criteria.
- [ ] Sync the deeper Korean math content into English after the Korean source stabilizes.

## MVP Definition

The MVP should satisfy the following:

- the same curriculum is available in English and Korean
- roughly 10 core sections cover math, deep learning, Transformers, GPT-3, and PyTorch practice
- each chapter includes explanation, diagrams, formulas, example code, and practice
- at least 3 project tracks are included
- the documentation site builds locally with VitePress

## Proposed Information Structure

```text
docs/
  .vitepress/
    config.ts
    theme/
  ko/
    index.md
    math/
    python-pytorch/
    deep-learning/
    transformers/
    llms/
    rl/
    ai-engineering/
    projects/
  en/
    index.md
    math/
    python-pytorch/
    deep-learning/
    transformers/
    llms/
    rl/
    ai-engineering/
    projects/
```

## Content Roadmap

### 0. Prologue and Learning Guide

- [ ] Define the book goals, audience, prerequisites, and study order.
- [ ] Create a roadmap diagram that explains why the sequence is structured this way.
- [ ] Write the development environment guide: Python, uv or pip, PyTorch, Jupyter, VS Code.

### 1. Math Foundations

- [ ] Explain the intuition of functions, graphs, logarithms, and exponentials.
- [ ] Explain core vector and matrix operations visually.
- [ ] Explain derivatives and gradients through the lens of loss reduction.
- [ ] Explain probability, conditional probability, expectation, and variance in modeling terms.
- [ ] Connect linear algebra and calculus to how neural networks actually work.

#### Math Priority TODO

- [ ] Connect the functions/logs/exponentials page directly to `softmax`, `cross-entropy`, and scale.
- [ ] Connect the vectors/matrices page to embeddings, linear layers, and attention scores.
- [ ] Add chain rule and backpropagation diagrams to the gradients page.
- [ ] Add clear links between distributions, expectation, variance, softmax, and sampling to the probability page.
- [ ] Add a notation survival guide for reading math in ML papers.
- [ ] Add “how to read this in a paper” sections to each math page.
- [ ] Add exercises and a next-step bridge to each math subpage.
- [ ] Synchronize English translations after the Korean math source stabilizes.

### 2. Python and PyTorch

- [ ] Focus on a tensor-first mindset instead of beginner Python syntax.
- [ ] Explain the difference between NumPy arrays and PyTorch tensors.
- [ ] Implement autograd, dataset, dataloader, and the training loop directly.
- [ ] Complete the training loop through a small regression or classification example.

### 3. Deep Learning Basics

- [ ] Explain perceptrons, MLPs, activation functions, and loss functions.
- [ ] Explain backpropagation with a computation-graph view.
- [ ] Summarize the role of regularization, normalization, and optimization.
- [ ] Briefly place CNNs and RNNs in historical context and explain their limits.

### 4. NLP Before Transformers

- [ ] Explain the progression from tokenization and one-hot encoding to embeddings.
- [ ] Introduce why n-grams, word2vec, seq2seq, and attention mattered.
- [ ] Connect the bottlenecks of earlier NLP methods to the need for Transformers.

### 5. Transformer Fundamentals

- [ ] Explain self-attention, multi-head attention, and positional encoding.
- [ ] Explain encoder/decoder structure and autoregressive generation.
- [ ] Visualize attention flow with Mermaid.
- [ ] Implement a small Transformer block in PyTorch.

### 6. Understanding GPT-1 -> GPT-3

- [ ] Explain the common structure and training objective of the GPT family.
- [ ] Summarize how scale, data, and compute affected capability.
- [ ] Explain few-shot, zero-shot, and in-context learning.
- [ ] Summarize the meaning and limitations of GPT-3 from a current perspective.

### 7. Practical LLM Basics

- [x] Explain token length, context windows, and sampling parameters.
- [x] Summarize basic prompt design patterns.
- [x] Compare core evaluation units such as accuracy, BLEU/ROUGE-style metrics, human eval, and task eval.
- [x] Cover hallucination, bias, safety, and cost.

### 8. Reinforcement Learning and RLHF

- [ ] Explain bandits, MDPs, values, and policies intuitively.
- [ ] Compare Q-learning and policy gradients.
- [ ] Explain PPO at a high level and connect it to RLHF.
- [ ] Summarize where reinforcement learning is used in the LLM era through examples.

### 9. Modern AI Engineering Patterns

- [ ] Summarize the basics of data pipelines, experiment tracking, and model versioning.
- [ ] Explain eval-driven development.
- [ ] Distinguish RAG, tool calling, and agent workflows in practical terms.
- [ ] Cover deployment, monitoring, observability, and cost optimization.
- [ ] Cover operational risks such as security, privacy, and prompt injection.

### 10. Project-Based Learning

- [ ] Implement a small language model or character-level model in PyTorch.
- [ ] Build a document QA or mini RAG project.
- [ ] Build a simple RL or bandit experiment project.
- [ ] Provide a template for goal, data, implementation, experiments, and retrospective in each project.

## Platform and Documentation TODO

- [x] Initialize VitePress.
- [x] Design bilingual routing structure for English and Korean.
- [x] Define Mermaid, formula, and code-highlighting policies.
- [x] Define shared frontmatter and document templates.
- [ ] Define chapter TOC automation rules.
- [x] Design search, navigation, and sidebar structure.
- [x] Decide where example code lives: `examples/` or `notebooks/`.
- [ ] Define image and diagram asset rules.
- [x] Add CI validation for documentation builds.
- [ ] Decide the deployment target: GitHub Pages or Vercel.

## Writing Principles

- [ ] Explain formulas in the order: definition -> intuition -> example -> code connection.
- [ ] Explain every major concept with at least one figure or Mermaid diagram.
- [ ] Include PyTorch examples in every implementation-oriented chapter.
- [ ] Keep math explanations as small as possible while still connecting them to models and code.
- [ ] Decide whether Korean is written first and English follows, or whether both are written chapter by chapter.
- [ ] End each chapter with a checklist, exercises, and a next-step bridge.

## Operational Backlog

- [x] Define issue templates: chapter, exercise, translation, diagram, project.
- [x] Define the PR template: purpose, changes, screenshots, validation.
- [x] Write the contribution guide.
- [ ] Write a glossary.
- [ ] Write a “recommended learning order” page.
- [ ] Define the policy for external references and primary papers.

## Initial Execution Sequence

1. [x] Initialize the VitePress project.
2. [x] Create the Korean and English document skeleton.
3. [x] Finalize the book table of contents and learning goals.
4. [x] Draft chapter 1: math foundations.
5. [x] Draft chapter 2: Python and PyTorch.
6. [x] Draft chapter 5: Transformer fundamentals.
7. [x] Finalize the example code layout.
8. [x] Define GitHub issue templates and label strategy.

## GitHub Epic Completion Criteria

- [x] The repository has starting documentation.
- [x] The initial 8 tasks are broken down into backlog items.
- [x] Follow the `feature/<issue>-<slug>` branch rule for implementation.
- [x] Use `develop` as the default PR target branch.

## Notes

- Keep GPT-3 as a clear mid-point goal, but treat the final destination as AI-engineering thinking.
- Prefer durable practice axes such as evaluation, deployment, observability, and risk over trend lists.
- The VitePress base site, bilingual structure, Mermaid support, examples, CI, and templates were added on March 6, 2026.
- Use the first-pass tracker to decide when to announce milestone completion.

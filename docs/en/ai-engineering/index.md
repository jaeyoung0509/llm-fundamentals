# AI Engineering

## Why It Matters

Understanding models is not the same thing as operating products. This module focuses on the second problem.

## One Sentence to Keep

AI engineering means managing evaluation, deployment, observability, cost, and security together, not just model quality.

## Practical Axes

- data pipelines and experiment tracking,
- eval-driven development,
- the difference between RAG, tool calling, and agent workflows,
- deployment and monitoring,
- cost and latency,
- security and privacy risk.

## System View

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;data and documents&quot;] --> B[&quot;model/prompt experiments&quot;]
  B --> C[&quot;evaluation&quot;]
  C --> D[&quot;deployment&quot;]
  D --> E[&quot;monitoring&quot;]
  E --> F[&quot;improvement loop&quot;]
  F --> B`"
/>

## Pattern Table

| Pattern | Main purpose |
| --- | --- |
| RAG | improve answers with retrieved external knowledge |
| tool calling | perform actions such as search, calculation, or API usage |
| agent workflow | chain planning and execution over multiple steps |

## Exercises

1. Explain RAG vs tool calling.
2. Explain why eval-driven development matters before deployment.
3. Name three metrics that belong on an operations dashboard.

## Checklist

- can you explain why eval-driven development matters,
- can you distinguish RAG, tool calling, and agent workflows,
- can you name at least three operational risks.

## How This Connects Forward

Once the operating model is clear, the next step is to express it through portfolio-grade projects.

Next: [Projects](/en/projects/)

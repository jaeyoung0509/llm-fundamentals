# AI Engineering

## Why It Matters

Understanding models is not the same thing as operating products. A strong AI system is not only accurate. It is evaluable, deployable, observable, safe, and economically workable.

## One Sentence to Keep

AI engineering means managing evaluation, deployment, observability, cost, security, and rollback strategy together.

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

## Eval-Driven Development Loop

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;task definition&quot;] --> B[&quot;eval set&quot;]
  B --> C[&quot;prompt or model change&quot;]
  C --> D[&quot;score results&quot;]
  D --> E{&quot;better?&quot;}
  E -->|&quot;yes&quot;| F[&quot;deploy candidate&quot;]
  E -->|&quot;no&quot;| C`"
/>

## How To Design Eval Data

- include not only normal cases but ambiguous, long, and failure-prone cases,
- define output format, grounding expectations, and safety rules in advance,
- separate offline benchmark sets from production feedback streams.

## Offline Eval vs Online Eval

| Type | What it measures | Why it matters |
| --- | --- | --- |
| offline eval | fixed-set comparison | stable regression checks |
| online eval | production behavior | real quality, latency, cost, failure rate |

## Operational Difference: RAG, Tool Calling, Agent Workflow

| Pattern | Main purpose | Common failure mode |
| --- | --- | --- |
| RAG | improve answers with retrieved knowledge | poor retrieval, chunking, citation quality |
| tool calling | perform actions or external API use | schema mismatch, permission errors, call failures |
| agent workflow | coordinate multi-step planning and execution | loops, state bugs, runaway cost |

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;user request&quot;] --> B{&quot;what is missing?&quot;}
  B -->|&quot;knowledge&quot;| C[&quot;RAG&quot;]
  B -->|&quot;action&quot;| D[&quot;tool calling&quot;]
  B -->|&quot;multi-step coordination&quot;| E[&quot;agent workflow&quot;]`"
/>

## Prompt And Version Tracking

You usually need to track more than the model version:

- model/version,
- system prompt,
- tool schema,
- retrieval settings,
- eval dataset version,
- latency/cost/failure logs.

## Monitoring Loop

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;production traffic&quot;] --> B[&quot;latency / cost / quality&quot;]
  B --> C[&quot;alerts&quot;]
  C --> D[&quot;rollback or fix&quot;]
  D --> E[&quot;new evaluation&quot;]
  E --> F[&quot;redeploy&quot;]`"
/>

## Why Rollback Strategy Matters

AI systems often degrade quietly. Teams need:

- quick reversion to prior model/prompt/retrieval settings,
- saved failure cases,
- re-evaluation before redeploying fixes.

## Safety And Security Review

- prompt injection,
- unauthorized data access,
- privacy leakage,
- harmful hallucinated actions,
- excessive latency or cost.

## Observability Checklist

- latency per request,
- cost per request,
- retrieval quality,
- tool-call failure rate,
- user satisfaction signals,
- safety-event rate.

## Read Research With An Operations Lens

When a paper claims better performance, ask:

1. better on which evaluation,
2. does it survive real traffic,
3. what does it cost in latency and compute,
4. what happens to safety risk.

## Exercises

1. Explain why eval-driven development beats intuition-only iteration.
2. Explain RAG vs tool calling through failure modes.
3. Name at least three dashboard metrics that must exist in production.

## Outputs From This Module

- evaluation checklist,
- architecture diagram,
- minimum dashboard requirements,
- rollback strategy outline.

## Checklist

- can you explain offline vs online evaluation,
- can you distinguish RAG, tool calling, and agent workflows operationally,
- can you explain why prompt/version tracking matters,
- can you explain risk and rollback strategy.

## How This Connects Forward

Once the operating model is clear, the next step is to express it through portfolio-grade projects.

Next: [Projects](/en/projects/)

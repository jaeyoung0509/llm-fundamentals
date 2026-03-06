# Practical LLM Basics

## Why This Module Matters

Understanding architecture is not the same thing as using LLMs well in practice. Real outcomes depend on token length, context windows, sampling settings, prompt structure, and evaluation habits.

## One Sentence to Keep

Practical LLM fluency comes from controlling the flow from prompt to logits to sampling to evaluation.

## Practical Control Panel

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prompt&quot;] --> B[&quot;tokenization&quot;]
  B --> C[&quot;context window&quot;]
  C --> D[&quot;model logits&quot;]
  D --> E[&quot;temperature / top-k / top-p&quot;]
  E --> F[&quot;final generation&quot;]
  F --> G[&quot;evaluation&quot;]`"
/>

## Token Length And Cost

LLMs operate on tokens, not raw characters. Token length affects:

- input cost,
- output cost,
- latency,
- context usage.

Longer context is not automatically better. Irrelevant context can dilute signal and make prompts or retrieval less effective.

## How To Read The Context Window

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;system prompt&quot;] --> D[&quot;context window&quot;]
  B[&quot;user input&quot;] --> D
  C[&quot;retrieved context / examples&quot;] --> D
  D --> E[&quot;model generation&quot;]`"
/>

Practical questions:

- how much space the system prompt consumes,
- how many examples fit,
- how much retrieval output consumes,
- whether longer context actually improves results.

## How To Read Sampling Parameters

| Parameter | Typical effect |
| --- | --- |
| temperature | higher values usually increase diversity |
| top-k | sample only from the top `k` candidates |
| top-p | sample from the smallest candidate set whose cumulative probability reaches `p` |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;temperature adjust&quot;]
  B --> C[&quot;softmax distribution&quot;]
  C --> D[&quot;top-k / top-p filter&quot;]
  D --> E[&quot;sample next token&quot;]`"
/>

## Argmax vs Sampling

- argmax: pick the highest-probability token,
- sampling: draw from the distribution.

Argmax is stable but often repetitive. Sampling is more diverse but can become noisy.

## Why Prompt Structure Matters

Good prompting is less about verbosity and more about separating role, input, constraints, and output format.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;role / task&quot;] --> D[&quot;structured prompt&quot;]
  B[&quot;input data&quot;] --> D
  C[&quot;constraints / output format&quot;] --> D
  D --> E[&quot;model output&quot;]`"
/>

## How To Think About Hallucination

Hallucination is best read as a failure mode where the model produces high-probability but weakly grounded output.

Questions to ask:

- does this task require grounding,
- should retrieval or tools be attached,
- is there any verification step after generation.

## Why Evaluation Must Be Separate

A few nice-looking samples do not tell you enough. Separate at least:

- task metrics,
- human-perceived quality,
- system metrics like cost and latency.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;prompt / model change&quot;] --> B[&quot;sample outputs&quot;]
  B --> C[&quot;task metrics&quot;]
  B --> D[&quot;human review&quot;]
  B --> E[&quot;cost / latency checks&quot;]
  C --> F[&quot;go / no-go decision&quot;]
  D --> F
  E --> F`"
/>

## Paper-Reading Cues

| Expression | How to read it |
| --- | --- |
| `context window` | total usable context length |
| `temperature` | coefficient that sharpens or flattens the distribution |
| `top-k`, `top-p` | candidate filtering rules for sampling |
| `hallucination` | fluent but weakly grounded generation failure |
| `eval set` | fixed dataset for quality comparison |

## What To Inspect In A Paper First

1. which metrics define quality,
2. whether sampling is fixed or tuned,
3. how context length affects results,
4. how hallucination or factuality is measured.

## Code Connection

In implementation, inspect:

- actual token counts,
- how much retrieved context is inserted,
- where sampling settings are changed,
- whether evaluation results are logged.

## Example Links

- [linear_regression.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/torch-basics/linear_regression.py): review loss and update flow
- [self_attention.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/transformers/self_attention.py): review logits and attention flow

## Exercises

1. Explain temperature vs top-p.
2. Explain why longer context is not always better.
3. Explain what must be added to turn “good prompt” into an evaluation process.

## Checklist

- can you explain how token length affects cost and quality,
- can you explain how context windows affect quality and cost,
- can you explain temperature, top-k, and top-p,
- can you explain what to inspect to reduce hallucination.

## How This Connects Forward

Once practical usage is clearer, the next step is RLHF and reinforcement learning as the alignment layer on top.

Next: [Reinforcement Learning](/en/rl/)

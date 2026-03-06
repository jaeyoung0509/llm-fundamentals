# LLMs and GPT-3

## Why This Module Matters

GPT-3 is not just a famous model name. It is the point where decoder-only Transformers must be read through the lens of scale. The goal here is to understand which structure and training objective produce which behavior.

## One Sentence to Keep

The key lesson of GPT-3 is what happens when the same decoder-only recipe is pushed with much more parameter scale, data, and compute.

## From GPT-1 to GPT-3

| Model | Key point |
| --- | --- |
| GPT-1 | showed the decoder-only Transformer direction |
| GPT-2 | made large-scale generation much more visible |
| GPT-3 | made scale and in-context learning impossible to ignore |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;GPT-1&quot;] --> B[&quot;GPT-2&quot;]
  B --> C[&quot;GPT-3&quot;]
  A --> D[&quot;decoder-only recipe&quot;]
  B --> E[&quot;larger scale&quot;]
  C --> F[&quot;in-context learning signal&quot;]`"
/>

## Core Structure

- decoder-only autoregressive Transformer,
- next-token prediction objective,
- context-conditioned token distributions,
- stronger few-shot and zero-shot behavior as scale grows.

## Autoregressive Generation

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;context tokens&quot;] --> B[&quot;decoder-only Transformer&quot;]
  B --> C[&quot;next-token distribution&quot;]
  C --> D[&quot;pick one token&quot;]
  D --> E[&quot;append to context&quot;]
  E --> B`"
/>

## What The Training Objective Means

```text
L = -sum_t log p_theta(y_t | y_<t, x)
```

- `theta`: model parameters
- `y_<t`: prior context
- `y_t`: correct token at step `t`
- `p_theta(...)`: model probability for that token
- `-log`: makes low correct-token probability expensive

So GPT-style models are trained by repeatedly increasing the probability of the correct next token.

## Read The Paper Formula

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;context y_<t and x&quot;] --> B[&quot;model predicts p_theta(y_t | context)&quot;]
  B --> C[&quot;compare with correct token y_t&quot;]
  C --> D[&quot;take negative log&quot;]
  D --> E[&quot;sum over positions&quot;]
  E --> F[&quot;training loss&quot;]`"
/>

## Context Window And In-Context Learning

GPT-3 matters not only because it is large, but because it showed stronger behavior from examples placed directly in context.

- zero-shot: instruction only
- one-shot: one example in context
- few-shot: a few examples in context

The model is not updating parameters during prompting. It is using the current context as a pattern for next-token prediction.

## What Scale Changes

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;same core architecture&quot;] --> B[&quot;more parameters&quot;]
  A --> C[&quot;more data&quot;]
  A --> D[&quot;more compute&quot;]
  B --> E[&quot;stronger few-shot behavior&quot;]
  C --> E
  D --> E`"
/>

## Limits You Must Keep In View

- high cost,
- hallucination risk,
- difficult control and alignment,
- larger models do not automatically mean better products.

## Paper-Reading Cues

| Expression | How to read it |
| --- | --- |
| `p_theta(y_t | y_<t)` | next-token probability conditioned on prior tokens |
| `context window` | how much prior context the model can use |
| `few-shot prompting` | place examples in context rather than changing parameters |
| `scale` | the joint growth of parameters, data, and compute |

## What To Inspect In A Paper First

1. whether the model is decoder-only,
2. whether the objective is next-token prediction,
3. how large the context window is,
4. how few-shot behavior is measured,
5. which limitations the authors emphasize.

## Exercises

1. Explain `p_theta(y_t | y_<t, x)` in plain language.
2. Explain few-shot prompting vs fine-tuning.
3. Explain why scale mattered for GPT-3.

## Checklist

- can you explain decoder-only structure,
- can you explain next-token prediction,
- can you explain context windows and in-context learning,
- can you explain both the importance and limits of GPT-3.

## How This Connects Forward

Once GPT-3 is clearer, the next step is practical LLM control: tokens, context, sampling, and evaluation.

Next: [Practical LLM Basics](/en/llm-basics/)

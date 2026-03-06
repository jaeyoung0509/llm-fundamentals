# LLMs and GPT-3

## Questions for This Module

- what did GPT inherit from Transformers,
- why was GPT-3 a major milestone,
- why is GPT-3 still worth studying today.

## One Sentence to Keep

The deepest lesson of GPT-3 is not a brand-new architecture, but what happens when a familiar architecture is pushed to enormous scale.

## From GPT-1 to GPT-3

| Model | Key point |
| --- | --- |
| GPT-1 | proved the decoder-only Transformer direction |
| GPT-2 | made large-scale language generation visible to many practitioners |
| GPT-3 | highlighted scale and in-context learning much more clearly |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;GPT-1&quot;] --> B[&quot;GPT-2&quot;]
  B --> C[&quot;GPT-3&quot;]
  A --> D[&quot;decoder-only recipe&quot;]
  B --> E[&quot;larger scale&quot;]
  C --> F[&quot;in-context learning signal&quot;]`"
/>

## Must-Know Ideas

- decoder-only autoregressive structure,
- next-token prediction,
- scale intuition,
- few-shot vs zero-shot,
- limitations in cost, hallucination, and control.

## Autoregressive Generation

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;context tokens&quot;] --> B[&quot;decoder-only Transformer&quot;]
  B --> C[&quot;next-token distribution&quot;]
  C --> D[&quot;pick one token&quot;]
  D --> E[&quot;append to context&quot;]
  E --> B`"
/>

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

## Checklist

- can you explain decoder-only autoregressive structure,
- can you explain few-shot vs zero-shot,
- can you explain why GPT-3 was a milestone.

## How This Connects Forward

Once model capability is clear, the next step is to understand context windows, sampling, prompting, and evaluation in practical LLM use.

Next: [Practical LLM Basics](/en/llm-basics/)

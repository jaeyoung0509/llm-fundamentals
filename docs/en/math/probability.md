# Probability and Softmax

## Goals

- read model output as a distribution,
- understand expectation and variance at a practical level,
- connect softmax and sampling to probability.

## Core Intuition

A model is not a machine that always emits one certain answer. It produces a distribution over plausible answers.

## Output as a Distribution

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;softmax&quot;]
  B --> C[&quot;probability distribution&quot;]
  C --> D[&quot;argmax choice&quot;]
  C --> E[&quot;sampling choice&quot;]`"
/>

## Model Connections

| Math idea | Model example |
| --- | --- |
| probability distribution | next-token prediction |
| expectation | average loss, average reward |
| variance | uncertainty and training stability |
| softmax | turning logits into a readable distribution |

## Exercises

1. Explain the difference between argmax and sampling.
2. Explain why higher temperature can produce more diverse output.
3. Explain expectation and variance in training-stability terms.

Next: [Python and PyTorch](/en/python-pytorch/)

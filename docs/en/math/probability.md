# Probability and Softmax

## Goals

- read model output as a distribution,
- understand expectation and variance at a practical level,
- connect softmax and sampling to probability.

## Core Intuition

A model is not a machine that always emits one certain answer. It produces a distribution over plausible answers.

## Output as a Distribution

<MermaidDiagram>
flowchart LR
  A["logits"] --> B["softmax"]
  B --> C["probability distribution"]
  C --> D["argmax choice"]
  C --> E["sampling choice"]
</MermaidDiagram>

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

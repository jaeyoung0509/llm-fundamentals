# Probability and Softmax

## Goals

- read model output as a distribution,
- understand expectation and variance at a practical level,
- connect softmax and sampling to probability.

## Core Intuition

A model is not a machine that always emits one certain answer. It produces a distribution over plausible answers.

## Model Connections

| Math idea | Model example |
| --- | --- |
| probability distribution | next-token prediction |
| expectation | average loss, average reward |
| variance | uncertainty and training stability |
| softmax | turning logits into a readable distribution |

Next: [Python and PyTorch](/en/python-pytorch/)


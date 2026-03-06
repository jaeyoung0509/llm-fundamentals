# Probability and Softmax

## Goals

- read model output as a distribution,
- understand expectation and variance at a practical level,
- connect softmax and sampling to probability.

## Core Intuition

A model produces a distribution over plausible answers.

## Output as a Distribution

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;softmax&quot;]
  B --> C[&quot;probability distribution&quot;]
  C --> D[&quot;argmax choice&quot;]
  C --> E[&quot;sampling choice&quot;]`"
/>

## Conditional Probability View

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;context x&quot;] --> B[&quot;model&quot;]
  B --> C[&quot;p(y|x)&quot;]
  C --> D[&quot;distribution over candidates&quot;]`"
/>

## Calibration Intuition

High probability does not automatically mean trustworthy probability. Calibration asks whether predicted confidence matches actual correctness.

## Sampling Flow

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;temperature adjust&quot;]
  B --> C[&quot;softmax&quot;]
  C --> D[&quot;sharp or flat distribution&quot;]
  D --> E[&quot;argmax / sampling&quot;]`"
/>

## Temperature As A Distribution Graph

<MermaidDiagram
  :code="`xychart
    title &quot;Softmax Distribution by Temperature&quot;
    x-axis &quot;token&quot; [A, B, C]
    y-axis &quot;probability&quot; 0 --> 1
    bar [0.80, 0.15, 0.05]
    bar [0.55, 0.27, 0.18]`"
/>

## Likelihood And Cross-Entropy

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;maximize likelihood&quot;] --> D[&quot;raise probability on correct data&quot;]
  B[&quot;minimize NLL&quot;] --> D
  C[&quot;minimize cross-entropy&quot;] --> D`"
/>

## Entropy Intuition

- sharp distributions have lower entropy,
- flatter distributions have higher entropy.

## Confidence vs Actual Correctness

<MermaidDiagram
  :code="`xychart
    title &quot;Confidence vs Actual Correctness&quot;
    x-axis &quot;prediction bucket&quot; [&quot;0.2&quot;, &quot;0.4&quot;, &quot;0.6&quot;, &quot;0.8&quot;]
    y-axis &quot;rate&quot; 0 --> 1
    bar [0.20, 0.40, 0.60, 0.80]
    line [0.18, 0.33, 0.52, 0.65]`"
/>

## Next-Token Reading

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;past tokens&quot;] --> B[&quot;model state&quot;]
  B --> C[&quot;next-token probabilities&quot;]
  C --> D[&quot;choose next token&quot;]`"
/>

## Model Connections

| Math idea | Model example |
| --- | --- |
| probability distribution | next-token prediction |
| expectation | average loss, average reward |
| variance | uncertainty and training stability |
| softmax | turning logits into a readable distribution |

## Code Connection

- `torch.softmax(logits, dim=-1)` builds a distribution,
- `torch.multinomial(probs, num_samples=1)` is a simple sampling example,
- temperature changes the shape of that distribution.

## Exercises

1. Explain the difference between argmax and sampling.
2. Explain why higher temperature can produce more diverse output.
3. Explain expectation and variance in training-stability terms.

Next: [Python and PyTorch](/en/python-pytorch/)

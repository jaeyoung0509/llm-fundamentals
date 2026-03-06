# Functions, Logs, and Growth

## Goals

- understand functions as input-output rules in model terms,
- see why logs and exponentials keep appearing in loss, probability, and scale,
- build intuition for non-linearity.

## Why It Matters

Neural networks do not behave like one straight line. Values get amplified, normalized, and compressed across different scales.

## Flow at a Glance

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input x&quot;] --> B[&quot;linear transform&quot;]
  B --> C[&quot;non-linear function&quot;]
  C --> D[&quot;logits&quot;]
  D --> E[&quot;exponentials&quot;]
  E --> F[&quot;softmax probabilities&quot;]
  F --> G[&quot;log loss&quot;]`"
/>

## Core Ideas

### Function

A function maps input to output. A model is a stack of such mappings.

### Exponential

Exponentials magnify score differences quickly.

### Logarithm

Logarithms compress multiplicative structure and help interpret loss.

## Function Composition

```text
x -> linear -> activation -> logits -> softmax -> loss
```

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input x&quot;] --> B[&quot;f1: linear&quot;]
  B --> C[&quot;f2: non-linearity&quot;]
  C --> D[&quot;f3: logits&quot;]
  D --> E[&quot;f4: probability / loss&quot;]`"
/>

## Why Non-Linearity Matters

Stacking only linear layers stays close to one large linear transform. Deep models become meaningfully expressive once non-linearities such as ReLU or GELU are inserted.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;linear&quot;] --> B[&quot;linear&quot;]
  B --> C[&quot;still mostly linear&quot;]
  D[&quot;linear&quot;] --> E[&quot;non-linearity&quot;]
  E --> F[&quot;richer decision boundary&quot;]`"
/>

## Linear vs Exponential As A Graph

<MermaidDiagram
  :code="`xychart
    title &quot;Linear vs Exponential Growth&quot;
    x-axis &quot;x&quot; [-2, -1, 0, 1, 2]
    y-axis &quot;value&quot; -2 --> 8
    line [-2, -1, 0, 1, 2]
    line [0.14, 0.37, 1.0, 2.72, 7.39]`"
/>

## Softmax Flow

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;logits&quot;] --> B[&quot;exp on each score&quot;]
  B --> C[&quot;positive values&quot;]
  C --> D[&quot;divide by total sum&quot;]
  D --> E[&quot;probability distribution&quot;]`"
/>

## Reading Loss

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;model outputs p(correct)&quot;] --> B{&quot;is p high?&quot;}
  B -->|&quot;yes&quot;| C[&quot;small loss&quot;]
  B -->|&quot;no&quot;| D[&quot;large loss&quot;]`"
/>

## Negative Log Loss Curve

<MermaidDiagram
  :code="`xychart
    title &quot;Negative Log Loss Curve&quot;
    x-axis &quot;p(correct)&quot; [0.1, 0.3, 0.5, 0.7, 0.9]
    y-axis &quot;-log(p)&quot; 0 --> 2.5
    line [2.30, 1.20, 0.69, 0.36, 0.10]`"
/>

## Reading The Paper Formula

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;find p_theta(y_t | context)&quot;] --> B[&quot;take log&quot;]
  B --> C[&quot;negate it&quot;]
  C --> D[&quot;sum over tokens&quot;]
  D --> E[&quot;training loss&quot;]`"
/>

## Perplexity Connection

- when cross-entropy goes down, perplexity also goes down,
- perplexity can be read as how confused the model still is about the next token.

## Code Connection

- `torch.softmax(logits, dim=-1)` makes logits readable as a distribution,
- `torch.log(prob)` moves probabilities into log space,
- `CrossEntropyLoss` compares logits and targets directly.

## Model Connections

| Math idea | Model example |
| --- | --- |
| function | linear layer, activation, loss |
| exponential | numerator of softmax |
| logarithm | negative log-likelihood, cross-entropy |

## Exercises

1. Explain why softmax would lose contrast without exponentials.
2. Explain why `-log(p_correct)` punishes low correct-token probability strongly.
3. Explain why deep networks need non-linearity.

## Questions

1. What would break if softmax had no exponentials
2. Why does log loss shrink as the correct probability moves toward 1
3. Why do stacked layers matter less without non-linearity

Next: [Vectors and Matrices](/en/math/vectors-matrices)

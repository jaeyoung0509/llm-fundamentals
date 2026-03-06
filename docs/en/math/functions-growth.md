# Functions, Logs, and Growth

## Goals

- understand functions as input-output rules in model terms,
- see why logs and exponentials keep appearing in loss, probability, and scale,
- build intuition for non-linearity.

## Why It Matters

Neural networks are not just one straight line. Values get normalized, amplified, compressed, and compared at different scales, which is why functions, logs, and exponentials show up repeatedly.

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

A function is a rule that maps input to output. A model is ultimately a stack of many such rules.

### Exponential

Exponentials magnify score differences quickly. That is why softmax can turn modest logit gaps into clearer probability gaps.

### Logarithm

Logarithms compress multiplicative structure and make very large or very small values easier to work with. That is why they appear in cross-entropy and negative log-likelihood.

## Why Non-Linearity Matters

Stacking only linear layers stays close to one large linear transform. Deep models become meaningfully expressive once non-linearities such as ReLU or GELU are inserted.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;linear&quot;] --> B[&quot;linear&quot;]
  B --> C[&quot;still mostly linear&quot;]
  D[&quot;linear&quot;] --> E[&quot;non-linearity&quot;]
  E --> F[&quot;richer decision boundary&quot;]`"
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

## Reading The Paper Formula

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;find p_theta(y_t | context)&quot;] --> B[&quot;take log&quot;]
  B --> C[&quot;negate it&quot;]
  C --> D[&quot;sum over tokens&quot;]
  D --> E[&quot;training loss&quot;]`"
/>

## Model Connections

| Math idea | Model example |
| --- | --- |
| function | linear layer, activation, loss |
| exponential | numerator of softmax |
| logarithm | negative log-likelihood, cross-entropy |

## Exercises

1. Explain why softmax would lose expressive contrast without exponentials.
2. Explain why `-log(p_correct)` penalizes low correct-token probability so strongly.
3. Explain why deep networks need non-linearity.

## Questions

1. What would break if softmax had no exponentials
2. Why does log loss get smaller when the correct probability gets closer to 1
3. Why does stacking layers matter less without non-linearity

Next: [Vectors and Matrices](/en/math/vectors-matrices)

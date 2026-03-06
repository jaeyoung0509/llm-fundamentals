# Derivatives and Gradients

## Goals

- interpret derivatives as signals for reducing loss,
- understand gradient descent at a sentence level,
- connect the chain rule to backpropagation.

## Core Sentence

The gradient tells us how much the loss changes when a parameter moves a little.

```text
parameter = parameter - learning_rate * gradient
```

## Learning Loop

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input x&quot;] --> B[&quot;prediction y_hat&quot;]
  B --> C[&quot;loss&quot;]
  C --> D[&quot;gradient&quot;]
  D --> E[&quot;parameter update&quot;]
  E --> B`"
/>

## Why the Chain Rule Matters

Neural networks are compositions of functions. Backpropagation works because the chain rule propagates the effect of the final loss back through earlier layers.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;forward&quot;] --> B[&quot;representation&quot;]
  B --> C[&quot;logits&quot;]
  C --> D[&quot;loss&quot;]
  D --> E[&quot;backward&quot;]
  E --> F[&quot;gradients on parameters&quot;]`"
/>

## Tiny Chain Rule Example

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;w changes&quot;] --> B[&quot;z changes&quot;]
  B --> C[&quot;L changes&quot;]
  C --> D[&quot;combine local effects&quot;]`"
/>

## Gradient To Update

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;loss L&quot;] --> B[&quot;partial L / partial w&quot;]
  B --> C[&quot;direction signal&quot;]
  C --> D[&quot;optimizer update&quot;]`"
/>

## Optimization Loop

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;current parameters&quot;] --> B[&quot;compute loss&quot;]
  B --> C[&quot;compute gradients&quot;]
  C --> D[&quot;optimizer rule&quot;]
  D --> E[&quot;new parameters&quot;]`"
/>

## Model Connections

| Math idea | Model role |
| --- | --- |
| derivative | local sensitivity of loss |
| gradient | update direction |
| chain rule | backpropagation |

## Exercises

1. Explain what a positive gradient implies for the update direction.
2. Explain what happens when the learning rate is too large.
3. Explain why backpropagation depends on the chain rule.

Next: [Probability and Softmax](/en/math/probability)

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

<MermaidDiagram>
flowchart LR
  A["input x"] --> B["prediction y_hat"]
  B --> C["loss"]
  C --> D["gradient"]
  D --> E["parameter update"]
  E --> B
</MermaidDiagram>

## Why the Chain Rule Matters

Neural networks are compositions of functions. Backpropagation works because the chain rule propagates the effect of the final loss back through earlier layers.

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

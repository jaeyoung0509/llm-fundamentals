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

## Model Connections

| Math idea | Model role |
| --- | --- |
| derivative | local sensitivity of loss |
| gradient | update direction |
| chain rule | backpropagation |

Next: [Probability and Softmax](/en/math/probability)


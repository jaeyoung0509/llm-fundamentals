# Functions, Logs, and Growth

## Goals

- understand functions as input-output rules in model terms,
- see why logs and exponentials keep appearing in loss, probability, and scale,
- build intuition for non-linearity.

## Why It Matters

Neural networks are not just one straight line. Values get normalized, amplified, compressed, and compared at different scales, which is why functions, logs, and exponentials show up repeatedly.

## Model Connections

| Math idea | Model example |
| --- | --- |
| function | linear layer, activation, loss |
| exponential | numerator of softmax |
| logarithm | negative log-likelihood, cross-entropy |

## Questions

1. What would break if softmax had no exponentials
2. Why does log loss get smaller when the correct probability gets closer to 1
3. Why does stacking layers matter less without non-linearity

Next: [Vectors and Matrices](/en/math/vectors-matrices)


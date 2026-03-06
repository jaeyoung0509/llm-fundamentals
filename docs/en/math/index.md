# Math Foundations

## Goals

- read functions, logs, and exponentials through model behavior,
- understand vectors and matrices as containers for data and parameters,
- interpret derivatives as signals for reducing loss,
- treat probability as the language of uncertainty and prediction.

## Minimal Syllabus

### 1. Functions, Logs, and Exponentials

Neural networks constantly rely on non-linear behavior. Softmax, cross-entropy, and decay schedules all bring logs and exponentials into practice.

### 2. Vectors and Matrices

- vector: one bundle of features,
- matrix: many bundles of data or weights,
- matrix multiplication: a way to remix features into new representations.

### 3. Derivatives and Gradients

A derivative measures how much the loss changes when you nudge something slightly. Gradient descent uses that signal to move parameters in the opposite direction.

```text
new_weight = old_weight - learning_rate * gradient
```

### 4. Probability and Expectation

Models do not output certainty. They estimate distributions over possible answers. Expectation captures average outcome, while variance captures spread.

Next: [Python and PyTorch](/en/python-pytorch/)


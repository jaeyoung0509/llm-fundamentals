# Python and PyTorch

## Goals

- build a tensor-first mindset,
- understand why autograd matters,
- write a training loop by hand.

## One Sentence to Keep

PyTorch training is the discipline of reading and controlling tensor flow, loss computation, and gradient updates.

## Core Pattern

```python
for inputs, targets in dataloader:
    optimizer.zero_grad()
    predictions = model(inputs)
    loss = loss_fn(predictions, targets)
    loss.backward()
    optimizer.step()
```

Most practical model training is a variation of this loop.

## Recommended Exercise

- `examples/torch-basics/linear_regression.py`
- write a custom `Dataset`,
- run the same code on CPU and GPU.

## Checklist

- can you read tensor shapes,
- can you explain `requires_grad`,
- can you distinguish `loss.backward()` from `optimizer.step()`.

## How This Connects Forward

Once the loop is clear, the next step is understanding what kinds of models and losses live inside that loop.

Next: [Deep Learning Basics](/en/deep-learning/)

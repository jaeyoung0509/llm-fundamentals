# Python and PyTorch

## Goals

- build a tensor-first mindset,
- understand why autograd matters,
- write a training loop by hand.

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

Next: [Deep Learning Basics](/en/deep-learning/)

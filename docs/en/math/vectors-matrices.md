# Vectors and Matrices

## Why This Matters

Vectors and matrices are the storage format and movement rule of deep learning. Inputs, token embeddings, batches, weights, and attention scores all live in this language.

If this chapter is weak, shape errors keep appearing in code and paper notation like `XW`, `QK^T`, and `R^(n x d)` feels abstract. If it is strong, formulas start reading like maps of representation flow.

## One Sentence Takeaway

Matrix multiplication is not just arithmetic. It projects representations into new spaces and builds relation tables.

## Notation Reboot

| Symbol | Fast reading | Common location |
| --- | --- | --- |
| `x in R^d` | one vector of length `d` | one sample, one token representation |
| `X in R^(n x d)` | `n` stacked vectors | sequence representation |
| `W in R^(d x h)` | projection from `d -> h` | linear layer |
| `E in R^(V x d)` | embedding table | token lookup |
| `A in R^(n x n)` | relation table across tokens | attention scores, masks |

Paper notation often omits the batch dimension. Implementation almost never does.

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;token ids&quot;] --> B[&quot;embedding table E&quot;]
  B --> C[&quot;X: (seq, dim)&quot;]
  C --> D[&quot;projection XW&quot;]
  D --> E[&quot;new representation&quot;]`"
/>

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;Q: (seq, head_dim)&quot;] --> C[&quot;QK^T&quot;]
  B[&quot;K^T: (head_dim, seq)&quot;] --> C
  C --> D[&quot;scores: (seq, seq)&quot;]
  D --> E[&quot;who attends to whom&quot;]`"
/>

## Intuition With One Concrete Example

Start with the simplest linear projection:

```text
x: (d,)
W: (d, h)
xW: (h,)
```

This means “take a length-`d` input representation and project it into a length-`h` representation.”

With batches:

```text
X: (batch, d)
W: (d, h)
XW: (batch, h)
```

The same projection rule is applied to many samples at once.

### How To Read Rows, Columns, and Transpose

- a row is often one sample or one token representation,
- a column is often one feature channel across many items,
- a transpose changes which axes are aligned for multiplication.

`QK^T` matters not only because the shape changes to `(seq, seq)`, but because the meaning changes from token representations to token-to-token relation scores.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;X: token representations&quot;] --> B[&quot;W_Q, W_K, W_V&quot;]
  B --> C[&quot;Q, K, V&quot;]
  C --> D[&quot;QK^T = relation scores&quot;]
  D --> E[&quot;softmax over scores&quot;]
  E --> F[&quot;weighted sum of V&quot;]`"
/>

## How This Shows Up In Papers

The core formula here is:

```text
Q = XW_Q, K = XW_K, V = XW_V
AttentionScores = QK^T
```

Read it line by line:

| Line | Reading |
| --- | --- |
| `XW_Q` | project inputs into query space |
| `XW_K` | project inputs into key space |
| `XW_V` | project inputs into value space |
| `QK^T` | build a token-to-token score table |

Two common mistakes:

- reading `QK^T` as value transformation instead of score construction,
- forgetting that the result is still a score table, not yet the final contextual representation.

## How This Maps To PyTorch/Code

- `nn.Embedding(V, d)` stores an embedding table of shape `(V, d)`
- `nn.Linear(d, h)` performs the `d -> h` projection
- `query @ key.transpose(-2, -1)` builds the attention score table
- real implementations usually work with `(batch, seq, dim)` or `(batch, heads, seq, head_dim)`

Direct example:

- [self_attention.py](https://github.com/jaeyoung0509/llm-fundamentals/blob/develop/examples/transformers/self_attention.py)

## Common Failure Modes Or Misconceptions

- Confusing `(n, d)` with `(d, n)`
- Ignoring the batch dimension that papers often omit
- Treating matrix multiplication as number crunching instead of representation movement
- Thinking `QK^T` already gives the final attention output
- Treating transpose like a mechanical flip instead of an axis-meaning change

## Exercises

### Basic Check

1. If `X: (32, 128)` and `W: (128, 256)`, what is the shape of `XW` and what does it mean?
2. Why is an embedding table shaped like `(vocab, dim)`?
3. Why does `QK^T` become `(seq, seq)`?

### Paper-Reading Drill

1. In `Q = XW_Q, K = XW_K, V = XW_V`, explain the role of `X`, `W_Q`, and `Q`.
2. If a paper writes `X in R^(n x d)`, what dimension is likely omitted in real code?
3. When you see `A in R^(n x n)`, why should you think “relation table” first?

### Code Drill

1. Predict `weights.shape` and `output.shape` before running `self_attention.py`.
2. Explain why `nn.Linear(d, h)` and `x @ W` belong to the same projection language.
3. Explain why changing only the last dimension is convenient in `(batch, seq, dim)` tensors.

## Bridge To Next Chapter

Now the containers and projections are clear. The next step is to understand how the model knows which direction to move those parameters when the prediction is wrong.

Next: [Derivatives and Gradients](/en/math/gradients)

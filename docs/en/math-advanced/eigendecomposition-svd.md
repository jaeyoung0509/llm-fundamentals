# Eigendecomposition and SVD

## Why This Matters

Eigenvalues and SVD answer a powerful question: which directions in a matrix matter most, and how strongly? That matters for PCA, compression, representation analysis, and low-rank adaptation.

If this chapter is weak, `U Sigma V^T` stays mechanical. If it is strong, large matrices start to look like “a few important directions plus scale.”

## One Sentence Takeaway

SVD and eigendecomposition turn a matrix into principal directions and their strength.

### 30-Second Intuition

The easiest summary is: SVD tells you which directions matter most and how much they matter. Large matrices often behave like “a few important directions plus a lot of weak leftovers.”

### Developer Lens

Low-rank adapters and compression become easier once you read them as “do not adjust everything; adjust the most useful directions.”

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `Av = lambda v` | direction `v` is preserved, only scaled | eigenvector, eigenvalue |
| `X = U Sigma V^T` | decompose into directions and scales | SVD |
| `Sigma_k` | keep only top `k` singular values | low-rank approximation |
| PCA | keep directions with large variance | representation analysis |
| rank-`k` | keep `k` main directions | compression, adapters |

The simplest useful distinction: eigendecomposition is narrower, SVD is the broad tool you can apply almost everywhere.

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;matrix X&quot;] --> B[&quot;V^T: align input directions&quot;]
  B --> C[&quot;Sigma: scale by importance&quot;]
  C --> D[&quot;U: align output directions&quot;]
  D --> E[&quot;read dominant structure&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Singular Value Decay&quot;
    x-axis &quot;component index&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;singular value&quot; 0 --> 10
    line [9.4, 6.8, 4.2, 2.3, 1.1, 0.4]`"
/>

## Intuition With One Concrete Example

If singular values fall quickly, only a few directions carry most of the structure. That means the matrix can be approximated well with fewer components.

### Formula Autopsy: Low-Rank Approximation

```text
X ≈ U_k Sigma_k V_k^T
```

- `U_k`: top output directions
- `Sigma_k`: their strength
- `V_k^T`: top input directions
- smaller `k`: stronger compression, more information loss risk

That is the core low-rank tradeoff.

## How This Shows Up In Papers

| Paper expression | Reading | Context |
| --- | --- | --- |
| low-rank update | adjust only a few directions | LoRA |
| principal components | top variance directions | representation analysis |
| spectral decay | information concentrated in few axes | compression |
| eigen spectrum | importance of directions | geometry, stability |

LoRA is a particularly good ML example: instead of relearning a huge weight matrix directly, it adds a low-rank update.

## How This Maps To PyTorch/Code

- `torch.linalg.svd(X)` returns `U`, `S`, and `Vh`
- `torch.pca_lowrank(X)` helps inspect principal components
- low-rank approximation maps directly onto compression and adapter language
- singular-value decay plots can reveal how compressible a learned matrix is

## Common Failure Modes Or Misconceptions

- treating eigenvalues and singular values as interchangeable
- memorizing SVD without the “main directions” intuition
- assuming low-rank structure is always good without thinking about loss of information
- focusing on compression ratio without reading the spectral decay

## Exercises

### Basic Check

1. What does fast singular-value decay mean?
2. What is the difference between eigendecomposition and SVD?
3. Why does low-rank approximation connect to compression?

### Paper-Reading Drill

1. Explain each term in `X ≈ U_k Sigma_k V_k^T`.
2. Why is LoRA naturally described as low-rank adaptation?
3. If a paper uses PCA on representations, what is it trying to inspect?

### Engineer / Code Drill

1. What outputs do you get from `torch.linalg.svd`?
2. What insight might come from plotting the singular values of a weight matrix?
3. Where would a low-rank adapter enter a model implementation?

## Bridge To Next Chapter

Once matrix structure can be decomposed into dominant directions, the next step is to read how functions change when many variables move at once.

Next: [Multivariable Calculus](/en/math-advanced/multivariable-calculus)

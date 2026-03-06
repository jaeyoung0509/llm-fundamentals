# Vectors and Matrices

## Goals

- treat vectors and matrices as the default shapes of data and parameters,
- build a habit of reading tensor shapes,
- understand matrix multiplication as representation transformation.

## Core Intuition

- vector: one bundle of features,
- matrix: many bundles of data or many parameters,
- matrix multiplication: a way to move inputs into a new representation space.

## Shape Intuition

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input x: (d,)&quot;] --> B[&quot;weight W: (d, h)&quot;]
  B --> C[&quot;output h: (h,)&quot;]
  D[&quot;token matrix X: (n, d)&quot;] --> E[&quot;Q, K, V projections&quot;]
  E --> F[&quot;Q, K, V: (n, h)&quot;]`"
/>

## Why Shapes Matter

Many implementation mistakes are shape mistakes. Reading a model means reading both values and dimensions.

## Model Connections

| Operation | Model role |
| --- | --- |
| vector | token embeddings, feature representations |
| matrix | weights, batches |
| matrix multiplication | linear layers and attention score computation |

## Exercises

1. If input is `(32, 128)` and weight is `(128, 256)`, what is the output shape.
2. Explain why an embedding table is naturally “vocabulary size x embedding dimension”.
3. Explain why `QK^T` becomes an `(n, n)` relation table.

Next: [Derivatives and Gradients](/en/math/gradients)

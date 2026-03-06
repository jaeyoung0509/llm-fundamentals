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

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;x in R^d&quot;] --> B[&quot;one vector&quot;]
  C[&quot;X in R^(n x d)&quot;] --> D[&quot;n vectors stacked&quot;]
  E[&quot;W in R^(d x h)&quot;] --> F[&quot;projection matrix&quot;]
  D --> G[&quot;XW in R^(n x h)&quot;]
  F --> G`"
/>

## Attention Score View

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;Q: (n, h)&quot;] --> C[&quot;QK^T&quot;]
  B[&quot;K^T: (h, n)&quot;] --> C
  C --> D[&quot;scores: (n, n)&quot;]
  D --> E[&quot;token relation table&quot;]`"
/>

## Projection View

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;X&quot;] --> B[&quot;W_Q&quot;]
  A --> C[&quot;W_K&quot;]
  A --> D[&quot;W_V&quot;]
  B --> E[&quot;Q&quot;]
  C --> F[&quot;K&quot;]
  D --> G[&quot;V&quot;]`"
/>

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

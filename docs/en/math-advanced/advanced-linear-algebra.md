# Advanced Linear Algebra

## Why This Matters

The core math track taught vectors and matrices as shapes and projections. Advanced linear algebra adds span, basis, orthogonality, rank, and change of basis so representation spaces become much more readable.

Without this, embedding geometry, feature subspaces, and projection-heavy papers still feel vague. With it, matrix operations start to describe which directions are preserved, emphasized, or discarded.

## One Sentence Takeaway

Advanced linear algebra is the language of directions, independence, projection, and compression inside representation spaces.

### 30-Second Intuition

The easiest summary is: this chapter studies where vectors point and how many truly independent directions matter. Models often operate by pushing information into a few useful directions.

### Developer Lens

A `Linear` layer is easier to read as “send this representation into a new directional space” than as “just multiply numbers.” Q/K/V projections are the same story.

## Notation Reboot

| Symbol | Fast reading | Model context |
| --- | --- | --- |
| `span(v_1, ..., v_k)` | all combinations made from these directions | feature subspace |
| `basis` | minimal independent set of directions | embedding axes |
| `u · v = 0` | orthogonal directions | low-overlap features |
| `rank(X)` | number of active independent directions | compression potential |
| `P_U(x)` | projection onto subspace `U` | denoising, feature selection |

The main upgrade here is to think about spaces and directions, not just matrix size.

## Mermaid Mental Model

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;original representation space&quot;] --> B[&quot;choose basis&quot;]
  B --> C[&quot;project&quot;]
  C --> D[&quot;compressed representation&quot;]
  D --> E[&quot;information the model keeps&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Projection Error vs Subspace Dimension&quot;
    x-axis &quot;subspace dimension&quot; [1, 2, 3, 4, 5]
    y-axis &quot;projection error&quot; 0 --> 1
    line [0.86, 0.58, 0.34, 0.18, 0.09]`"
/>

## Intuition With One Concrete Example

Projecting a vector `v` onto direction `u` keeps only the part of `v` that points along `u`:

```text
proj_u(v) = ((v · u) / ||u||^2) u
```

In ML terms, that is the same kind of intuition behind “extract the component aligned with this learned direction.”

Rank matters for the same reason. A large matrix can still behave like only a few meaningful directions are active. That is what makes low-rank compression possible.

### Tiny Worked Example

Let `u = [1, 0]` and `v = [3, 4]`. Here `u` is just the x-axis direction.

- `v` contains both x and y information
- projecting onto `u` gives `[3, 0]`
- the y-direction value `4` is discarded

That is the simplest useful projection intuition: do not keep everything, keep only the component along the direction you currently care about.

## How This Shows Up In Papers

### Formula Autopsy: Projection And Change Of Basis

```text
h = XW
```

At the advanced level, this is more than projection:

- `X`: inputs expressed in the current basis
- `W`: directions or combinations that define a new basis
- `h`: representation expressed in a new subspace

So `XW` is also a change-of-basis view on representation.

| Paper expression | Reading | Context |
| --- | --- | --- |
| orthogonal projection | keep only one subspace | compression, denoising |
| low-rank structure | only a few directions matter | adapters, compression |
| change of basis | same information, new axes | learned representations |
| orthogonality regularization | reduce overlap across directions | disentanglement, stability |

## How This Maps To PyTorch/Code

- `x @ W` is a projection and a basis change
- `F.normalize(...)` makes direction comparisons easier
- `torch.linalg.matrix_rank` measures active independent directions
- `W_Q`, `W_K`, and `W_V` send the same inputs into different learned subspaces

## Common Failure Modes Or Misconceptions

- treating basis as a naming convention instead of a representation choice
- viewing rank as just a statistic instead of compression structure
- seeing projection as value deletion instead of direction selection
- treating orthogonality as pretty math instead of reduced feature overlap

## Exercises

### Basic Check

1. Explain the difference between basis and span.
2. What does low rank mean in representation terms?
3. Why can projection be described as direction selection?

### Paper-Reading Drill

1. Re-read `h = XW` as a basis-change statement.
2. Why does low-rank adaptation rely on rank intuition?
3. If a paper says features are orthogonal, what does that suggest about overlap?

### Engineer / Code Drill

1. Find two `Linear` layers in your current model and explain them as projections.
2. What tensors would be interesting to inspect with `matrix_rank`?
3. Explain Q/K/V projections as different subspaces over the same input.

## Bridge To Next Chapter

Once space and direction intuition is stable, the next step is to decompose matrices into their strongest directions and scales through eigen ideas and SVD.

Next: [Eigendecomposition and SVD](/en/math-advanced/eigendecomposition-svd)

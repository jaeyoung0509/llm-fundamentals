# Deep Learning Basics

## This Module Covers

- perceptrons and MLPs,
- activations and expressivity,
- loss functions and optimization,
- computation graphs and backpropagation,
- regularization and normalization.

## One Sentence to Keep

Deep learning is the process of building representations, defining loss, and adjusting those representations through gradients.

## First-Pass Focus

- understand why linear and non-linear layers are both needed,
- understand the division of labor between loss functions and optimizers,
- understand gradient flow even before mastering the full derivation.

## From perceptron to MLP

A single perceptron gives you a simple linear decision boundary. Real data rarely behaves that simply, so deep learning stacks linear layers with non-linear activations to build richer representations.

| Structure | What it buys you |
| --- | --- |
| one linear layer | simple boundary |
| linear + activation + linear | more expressive patterns |
| deeper MLP | layered representation learning |

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input&quot;] --> B[&quot;linear&quot;]
  B --> C[&quot;activation&quot;]
  C --> D[&quot;linear&quot;]
  D --> E[&quot;logits&quot;]`"
/>

## Why activations matter

Without activations, many stacked linear layers still collapse into something close to one large linear transform. ReLU and GELU are what turn depth into expressive power.

## Loss vs optimizer

These two are often mentioned together but answer different questions.

| Component | Core question |
| --- | --- |
| loss function | what should the model be penalized for |
| optimizer | how should parameters move to reduce that penalty |

Cross-entropy defines the penalty. Adam or SGD turns that penalty signal into actual parameter updates.

## Computation graph view

```text
input -> linear -> activation -> linear -> logits -> loss
```

Forward pass computes values. Backward pass sends influence from the loss back through the graph. This view makes backpropagation much easier to reason about.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;input&quot;] --> B[&quot;representation&quot;]
  B --> C[&quot;logits&quot;]
  C --> D[&quot;loss&quot;]
  D --> E[&quot;gradient&quot;]
  E --> F[&quot;parameter update&quot;]
  F --> B`"
/>

## Regularization and normalization

- regularization: reduce overfitting
- normalization: stabilize training
- dropout: randomly remove parts of a representation during training
- weight decay: discourage overly large parameters

Model quality depends on the architecture and on how training is stabilized.

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;model improves on train&quot;] --> B{&quot;generalizes?&quot;}
  B -->|&quot;yes&quot;| C[&quot;keep current setup&quot;]
  B -->|&quot;no&quot;| D[&quot;add regularization&quot;]
  D --> E[&quot;dropout / weight decay / normalization&quot;]`"
/>

## Paper-reading cues

| Expression | How to read it |
| --- | --- |
| `MLP(x)` | repeated linear transforms with activations |
| `L_ce` | cross-entropy loss |
| `dropout(p=0.1)` | regularization through random masking |
| `AdamW` | optimizer used for parameter updates |
| `generalization` | performance beyond the training set |

## What to inspect in a paper first

1. what representation the model builds,
2. what loss it minimizes,
3. which optimizer and schedule it uses,
4. which regularization it adds,
5. whether the evaluation metric matches the loss.

## Checklist

- can you explain the difference between a perceptron and an MLP,
- can you explain why activations matter,
- can you explain overfitting vs generalization.

## How This Connects Forward

Once the deep learning core is clear, the next step is to see why older NLP methods hit limits and why attention became necessary.

Next: [NLP Before Transformers](/en/nlp/)

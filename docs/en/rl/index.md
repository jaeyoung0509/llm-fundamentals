# Reinforcement Learning and RLHF

## Purpose

This module is not trying to be a full RL textbook. It focuses on the level of reinforcement learning needed to understand RLHF and modern LLM practice.

## One Sentence to Keep

RLHF adjusts a model toward preferred human responses through rewards and policy updates.

## Covered Ideas

- bandits,
- MDPs,
- values and policies,
- Q-learning and policy gradients,
- PPO and the RLHF connection.

## Big Picture

<MermaidDiagram>
flowchart LR
  A["environment or human feedback"] --> B["reward"]
  B --> C["policy update"]
  C --> D["new response policy"]
  D --> A
</MermaidDiagram>

## Exercises

1. Explain bandits vs MDPs in terms of state.
2. Define value and policy in one sentence each.
3. Explain the role of the reward model in RLHF.

## Checklist

- can you explain bandits vs MDPs,
- can you explain values vs policies,
- can you explain the PPO to RLHF connection at a high level.

## How This Connects Forward

Once alignment is in view, the next step is understanding how to evaluate, deploy, and operate systems in the real world.

Next: [AI Engineering](/en/ai-engineering/)

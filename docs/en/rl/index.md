# Reinforcement Learning and RLHF

## Why This Module Matters

LLM quality is not only about next-token prediction. If you want more helpful, safer, or more preferred responses, you need a reward-and-policy view.

## One Sentence to Keep

RLHF starts from an instruction-following model and then pushes it further with human preference signals, reward modeling, and policy optimization.

## Covered Ideas

- bandits,
- MDPs,
- values and policies,
- Q-learning and policy gradients,
- reward models,
- PPO and RLHF.

## Big Picture

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;environment or human feedback&quot;] --> B[&quot;reward&quot;]
  B --> C[&quot;policy update&quot;]
  C --> D[&quot;new response policy&quot;]
  D --> A`"
/>

## Start With Bandits

A bandit problem gives you an action choice and an immediate reward. It is the simplest way to build the intuition of exploration, exploitation, and reward.

## What MDP Adds

In an MDP, actions affect future states, not just immediate reward.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;state s_t&quot;] --> B[&quot;action a_t&quot;]
  B --> C[&quot;reward r_t&quot;]
  B --> D[&quot;next state s_(t+1)&quot;]`"
/>

## Values And Policies

- value: how good a state or action is on average,
- policy: the rule that decides what action to take.

When papers show `V(s)`, `Q(s, a)`, and `pi(a|s)`, read them as state value, action value, and policy distribution.

## Q-Learning vs Policy Gradient

| Approach | Core question | LLM-oriented reading |
| --- | --- | --- |
| Q-learning | how valuable is this action | value estimation first |
| policy gradient | which way should the response policy move | directly shape the response distribution |

For RLHF, policy-gradient-style thinking is usually the more useful first lens.

## Where RLHF Fits

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;pretraining&quot;] --> B[&quot;SFT&quot;]
  B --> C[&quot;preference data&quot;]
  C --> D[&quot;reward model&quot;]
  D --> E[&quot;PPO / policy optimization&quot;]
  E --> F[&quot;aligned model&quot;]`"
/>

## What The Reward Model Does

Humans cannot provide direct gradients. A reward model learns to score responses from pairwise or ranked human preferences.

## Why PPO Shows Up So Often

PPO is a common way to improve a policy without changing it too aggressively in one step.

- it moves toward higher reward,
- it tries to stay stable,
- it helps avoid wrecking useful base-model behavior too quickly.

## RLHF Does Not Replace Evaluation

A high reward-model score does not automatically mean product quality, factuality, or safety. RLHF still needs downstream evaluation.

## Paper-Reading Cues

| Expression | How to read it |
| --- | --- |
| `pi_theta(a|s)` | policy probability of action `a` in state `s` |
| `r(x, y)` | reward for response `y` on input `x` |
| `V(s)` | state value |
| `Q(s, a)` | action value |
| `PPO` | stable policy update method |

## What To Inspect In A Paper First

1. where reward comes from,
2. whether the paper optimizes policy directly,
3. whether a reward model exists,
4. how SFT and RLHF are separated,
5. what evaluation remains after RLHF.

## Exercises

1. Explain bandits vs MDPs through state transitions.
2. Explain why a reward model is needed.
3. Explain PPO as a way to avoid overly large policy shifts.

## Checklist

- can you explain bandits vs MDPs,
- can you explain values vs policies,
- can you explain what the reward model does,
- can you explain the PPO to RLHF connection.

## How This Connects Forward

Once alignment is clearer, the next step is real-world evaluation, deployment, and operations.

Next: [AI Engineering](/en/ai-engineering/)

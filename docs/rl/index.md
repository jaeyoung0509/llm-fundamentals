# 강화학습과 RLHF

## 왜 이 장이 필요한가

LLM을 더 유용하게 만드는 문제는 단순히 다음 토큰 확률을 높이는 것에서 끝나지 않는다. 사람이 선호하는 응답, 안전한 응답, 더 유용한 응답을 더 자주 만들고 싶다면 보상과 정책 업데이트 관점이 필요하다.

## 이 장에서 꼭 가져갈 한 문장

RLHF는 SFT로 시작한 언어모델을 사람 선호 기반 보상과 정책 최적화로 한 단계 더 조정하는 과정이다.

## 다룰 축

- multi-armed bandit
- MDP
- value와 policy
- Q-learning과 policy gradient
- reward model
- PPO와 RLHF

## 큰 그림

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;environment or human feedback&quot;] --> B[&quot;reward&quot;]
  B --> C[&quot;policy update&quot;]
  C --> D[&quot;new response policy&quot;]
  D --> A`"
/>

## bandit에서 시작하기

bandit은 상태 전이가 거의 없고, 행동 하나를 고르면 즉시 보상이 오는 문제다. RL을 처음 볼 때는 "어떤 팔을 자주 당길 것인가" 정도로 이해하면 충분하다.

## MDP는 무엇이 추가되는가

MDP에서는 지금 행동이 다음 상태를 바꾼다. 그래서 "지금 보상이 큰 선택"과 "나중에 더 큰 보상을 위한 선택"이 충돌할 수 있다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;state s_t&quot;] --> B[&quot;action a_t&quot;]
  B --> C[&quot;reward r_t&quot;]
  B --> D[&quot;next state s_(t+1)&quot;]`"
/>

## value와 policy

- value: 이 상태나 행동이 평균적으로 얼마나 좋은가
- policy: 지금 무엇을 할지 정하는 규칙

논문에서 `V(s)`, `Q(s, a)`, `pi(a|s)`가 보이면 각각 상태 가치, 행동 가치, 정책 분포로 읽으면 된다.

## Q-learning과 policy gradient를 어떻게 구분할까

| 접근 | 핵심 질문 | LLM 맥락에서 읽는 법 |
| --- | --- | --- |
| Q-learning | 이 행동의 가치가 얼마인가 | 행동 가치 추정 중심 |
| policy gradient | 정책을 어느 방향으로 움직일까 | 응답 분포 자체를 조정 |

LLM의 RLHF 입문에서는 보통 policy gradient 계열 관점이 더 중요하다. 이유는 모델이 결국 응답 분포를 내는 정책처럼 읽히기 때문이다.

## RLHF는 어디에 붙는가

RLHF는 보통 아래 순서로 생각하면 된다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;pretraining&quot;] --> B[&quot;SFT&quot;]
  B --> C[&quot;preference data&quot;]
  C --> D[&quot;reward model&quot;]
  D --> E[&quot;PPO / policy optimization&quot;]
  E --> F[&quot;aligned model&quot;]`"
/>

- pretraining: 일반 언어 패턴 학습
- SFT: 지시를 따르는 기본 응답 패턴 학습
- reward model: 어떤 응답이 더 선호되는지 점수화
- policy optimization: 그 보상을 더 자주 받는 방향으로 모델 조정

## reward model은 무엇을 하나

사람이 직접 모든 응답마다 gradient를 줄 수는 없다. 그래서 선호 데이터로 "이 응답이 저 응답보다 낫다"를 학습한 reward model이 중간 평가자로 들어간다.

## PPO를 왜 보는가

PPO는 정책을 너무 급격하게 바꾸지 않으면서 개선하려는 대표적 접근이다. RLHF 입문에서는 수식을 전부 파는 것보다 아래만 잡으면 충분하다.

- 보상이 높아지는 방향으로 정책을 조정한다
- 한 번에 너무 멀리 움직이지 않게 제한한다
- 기존 언어모델 능력을 완전히 망가뜨리지 않으려 한다

## RLHF와 평가의 관계

RLHF는 evaluation을 대체하지 않는다. reward model이 높게 준다고 해서 제품 품질, 사실성, 안전성이 모두 해결되는 것은 아니다. 그래서 RLHF 뒤에도 별도의 eval이 필요하다.

## 논문에서 자주 보이는 표현

| 표현 | 읽는 법 |
| --- | --- |
| `pi_theta(a|s)` | 상태 `s`에서 행동 `a`를 택할 정책 확률 |
| `r(x, y)` | 입력 `x`와 응답 `y`에 대한 보상 |
| `V(s)` | 상태 가치 |
| `Q(s, a)` | 상태-행동 가치 |
| `PPO` | 정책을 안정적으로 업데이트하려는 방법 |

## 논문을 읽을 때 먼저 볼 것

1. 보상이 어디서 오는가
2. policy를 직접 최적화하는가, value를 통해 우회하는가
3. reward model이 있는가
4. SFT와 RLHF가 어떻게 분리되는가
5. 최종 평가는 reward 말고 무엇으로 하는가

## 연습

1. bandit과 MDP의 차이를 "상태 전이" 관점에서 설명해본다.
2. reward model이 왜 필요한지 적어본다.
3. PPO를 "정책을 너무 급격히 바꾸지 않는 장치" 관점에서 설명해본다.

## 체크리스트

- bandit과 MDP의 차이를 말할 수 있는가
- value와 policy의 차이를 설명할 수 있는가
- reward model의 역할을 설명할 수 있는가
- PPO와 RLHF의 연결을 고수준에서 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

정렬과 보상 관점을 봤다면, 이제 실제 제품에서 평가, 배포, 모니터링을 어떻게 하는지 AI Engineering으로 넘어가야 한다.

다음 장: [AI Engineering](/ai-engineering/)

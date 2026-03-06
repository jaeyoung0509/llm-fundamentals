# 푸리에와 위치 신호

## 왜 중요한가

푸리에 감각은 "복잡한 신호도 여러 주파수의 단순한 파동 조합으로 볼 수 있다"는 관점이다. 이 관점은 positional encoding, Fourier feature, spectral bias, 일부 convolution 해석까지 넓게 연결된다.

삼각함수 장이 단일 파동을 이해하는 단계였다면, 이 장은 여러 파동을 조합해 신호를 읽는 단계다.

## 한 문장 핵심

푸리에 관점은 복잡한 입력이나 위치 신호를 여러 주파수 성분의 조합으로 읽게 만드는 시야다.

### 30초 직관

푸리에를 제일 쉽게 말하면 "복잡한 모양도 느린 파동과 빠른 파동 몇 개를 섞어서 설명할 수 있다"는 생각이다. 그래서 위치 신호나 패턴을 다른 시야로 다시 볼 수 있다.

### 개발자 관점에서 다시 읽기

positional encoding을 볼 때 "채널마다 다른 파동을 깔아준다"라고 생각하면 된다. spectral bias도 "모델이 느린 패턴부터 먼저 배우는 경향"으로 읽으면 훨씬 쉽다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `omega_k` | `k`번째 주파수 | spectral components |
| `a_k`, `b_k` | 각 주파수 성분의 크기 | Fourier coefficients |
| `phi_k` | 위상 이동 | shift |
| `FFT` | 주파수 성분으로 변환 | spectral analysis |
| sinusoidal basis | 사인/코사인 기저 | positional signal representation |

여기서 중요한 것은 "신호를 시간축 그대로만 보지 않고 주파수축으로도 본다"는 관점 전환이다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;원래 신호&quot;] --> B[&quot;sin / cos basis&quot;]
  B --> C[&quot;frequency coefficients&quot;]
  C --> D[&quot;재구성 또는 분석&quot;]
  D --> E[&quot;position and spectral intuition&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Low and High Frequency Components&quot;
    x-axis &quot;position&quot; [0, 1, 2, 3, 4, 5, 6]
    y-axis &quot;value&quot; -1 --> 1
    line [0.00, 0.48, 0.84, 1.00, 0.91, 0.60, 0.14]
    line [0.00, 0.91, -0.76, -0.28, 0.99, -0.54, -0.54]`"
/>

## 직관과 한 가지 예시

복잡한 신호도 느리게 변하는 성분과 빠르게 진동하는 성분으로 나눠 볼 수 있다. positional encoding에서 여러 주파수를 함께 쓰는 이유도 같다. 가까운 위치 차이와 먼 위치 차이를 서로 다른 주파수 대역이 같이 표현해 주기 때문이다.

### Formula Autopsy: Fourier Series 직관

```text
x(t) ≈ sum_k a_k cos(omega_k t + phi_k)
```

- `omega_k`: 어떤 속도로 진동하는가
- `a_k`: 그 성분이 얼마나 강한가
- `phi_k`: 어디서 시작하는가
- 여러 `k`를 합치면 복잡한 신호를 근사할 수 있다

이 수식의 핵심은 "복잡한 것을 단순 파동들의 합으로 본다"는 해석이다.

## 논문에서는 이렇게 보인다

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| sinusoidal positional encoding | 여러 주파수 기저로 위치 표현 | Transformer |
| Fourier features | 좌표를 주파수 공간으로 확장 | implicit representations |
| spectral bias | 모델이 저주파 패턴을 더 먼저 학습 | deep learning dynamics |
| frequency response | 어떤 주파수 대역에 민감한가 | signal-style analysis |

RoPE도 결국 회전 기반 위치 부호화라는 점에서 Fourier적 시야와 이어진다. 위치를 정수 인덱스가 아니라 위상 변화로 해석하는 것이다.

## PyTorch와 코드로 연결하기

- `torch.sin`, `torch.cos`는 sinusoidal basis를 만든다.
- `torch.fft.rfft`는 신호를 주파수 성분 관점에서 볼 수 있게 해준다.
- positional encoding 구현은 여러 주파수의 sin/cos 테이블 생성으로 이어진다.
- spectral bias를 실험하려면 저주파/고주파 패턴 데이터를 나눠 학습 곡선을 비교해볼 수 있다.

## 자주 틀리는 지점

- Fourier를 "신호처리 전용"이라고 생각하고 Transformer 위치 신호와 연결하지 못한다.
- 고주파/저주파를 막연한 용어로만 보고 실제 변화 속도 차이를 떠올리지 못한다.
- positional encoding의 여러 채널이 왜 서로 다른 주파수를 가지는지 놓친다.
- FFT를 돌리면 끝이라고 생각하고 원래 신호와 주파수 표현의 관계를 놓친다.

## 연습

### 기초 확인

1. 저주파와 고주파의 차이를 자신의 말로 적어본다.
2. 복잡한 신호를 여러 파동의 합으로 본다는 말이 무엇인지 적어본다.
3. positional encoding에서 여러 주파수가 왜 필요한지 적어본다.

### 논문 읽기 훈련

1. `x(t)` Fourier 식에서 각 항의 역할을 적어본다.
2. spectral bias가 "저주파를 먼저 학습한다"는 말과 어떻게 연결되는지 적어본다.
3. RoPE를 위상 변화 관점으로 다시 설명해본다.

### 엔지니어 / 코드 훈련

1. `torch.fft.rfft`를 쓰면 어떤 종류의 입력에서 재미있는 통찰을 얻을 수 있을지 적어본다.
2. positional encoding 구현에서 여러 주파수 채널이 어떻게 만들어지는지 적어본다.
3. 고주파 패턴을 잘 못 배우는 모델을 보면 어떤 데이터나 학습 세팅을 의심할지 적어본다.

## 다음 장으로 연결

심화 수학의 주요 축을 모두 훑었다면 이제 한 번에 묶어 점검할 차례다. 마지막 장에서는 trig, 선형대수, 미적분, 추정, 정보 이론, 푸리에를 논문 읽기 관점으로 종합한다.

다음 장: [수학 심화 최종 점검](/math-advanced/final-checkpoint)

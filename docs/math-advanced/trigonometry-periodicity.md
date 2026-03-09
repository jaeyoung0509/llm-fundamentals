# 삼각함수와 주기성

## 왜 중요한가

삼각함수는 LLM 수학에서 의외로 자주 다시 등장한다. sinusoidal positional encoding, RoPE, Fourier feature, 주기성 있는 시계열 표현은 모두 각도와 주기 신호를 읽는 감각 위에 서 있다.

학교 수학에서는 삼각함수가 각도 계산처럼 느껴졌을 수 있지만, ML에서는 "주기적으로 반복되는 구조를 수치로 표현하는 도구"로 읽는 편이 훨씬 중요하다.

## 한 문장 핵심

삼각함수는 원의 언어이면서 동시에 반복 신호의 언어이고, 위치 정보와 주파수 구조를 모델 안에 넣는 핵심 도구다.

### 30초 직관

삼각함수를 제일 쉽게 말하면 "반복되는 파동을 숫자로 적는 방법"이다. 그래서 위치가 앞으로 갈수록 값이 반복되는 구조를 만들 수 있고, 모델은 그 반복 패턴으로 순서를 읽게 된다.

### 개발자 관점에서 다시 읽기

코드에서는 결국 `정수 위치 -> sin/cos 테이블 -> 임베딩에 더하거나 회전시키기`다. 즉, 복잡한 수학으로 보기 전에 "위치를 파동 특징으로 바꾼다"는 변환으로 잡으면 된다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `theta` | 각도 | phase, rotation |
| `sin(theta)`, `cos(theta)` | 주기적으로 반복되는 값 | positional encoding |
| `omega` | 주파수 | 얼마나 빨리 진동하는가 |
| `phi` | 위상 | 얼마나 옆으로 밀렸는가 |
| `T` | 주기 | 한 번 반복되는 길이 |

여기서 가장 중요한 전환은 degree보다 radian 감각이다. 논문과 구현에서는 각도를 거의 항상 radian으로 읽는다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;원 위의 각도 theta&quot;] --> B[&quot;sin(theta), cos(theta)&quot;]
  B --> C[&quot;반복 신호&quot;]
  C --> D[&quot;위치 정보 인코딩&quot;]
  D --> E[&quot;positional encoding / RoPE&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Sine and Cosine as Periodic Signals&quot;
    x-axis &quot;angle&quot; [0, 1, 2, 3, 4, 5, 6]
    y-axis &quot;value&quot; -1 --> 1
    line [0.00, 0.84, 0.91, 0.14, -0.76, -0.96, -0.28]
    line [1.00, 0.54, -0.42, -0.99, -0.65, 0.28, 0.96]`"
/>

## 직관과 한 가지 예시

단위원을 한 바퀴 도는 점을 생각해보면 `cos(theta)`는 x좌표, `sin(theta)`는 y좌표가 된다. 각도가 바뀔 때 값이 반복된다는 점이 핵심이다.

이 반복성 덕분에 모델은 "위치 100"과 "위치 101"처럼 순서가 있는 값을 단순한 정수가 아니라, 여러 주파수의 조합으로 읽을 수 있다.

### 아주 작은 숫자 예시

위치를 `0`, `1`, `2`라고 두고 아주 거친 파동 하나만 생각해보자.

- `sin(0) = 0`, `cos(0) = 1`
- `sin(1) ≈ 0.84`, `cos(1) ≈ 0.54`
- `sin(2) ≈ 0.91`, `cos(2) ≈ -0.42`

중요한 점은 값이 무작위로 튀지 않는다는 것이다. 가까운 위치는 비슷한 파동 좌표를 가지므로, 모델은 "순서가 조금 바뀌었다"는 사실을 연속적인 변화로 읽을 수 있다.

### Formula Autopsy: Sinusoidal Positional Encoding

```text
PE(pos, 2i) = sin(pos / 10000^(2i / d_model))
PE(pos, 2i + 1) = cos(pos / 10000^(2i / d_model))
```

- `pos`: 현재 위치
- `2i`, `2i+1`: 짝수/홀수 채널을 나눔
- `10000^(2i / d_model)`: 채널별로 다른 주파수를 만듦
- `sin`, `cos`: 위치를 반복 신호로 바꿔 여러 스케일에서 비교 가능하게 함

이 식을 한 문장으로 줄이면 "위치를 여러 주파수의 파동으로 바꿔 모델이 상대적 거리와 패턴을 읽게 한다"다.

## 논문에서는 이렇게 보인다

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| `sin`, `cos` 위치 함수 | 반복 신호로 위치를 부호화 | Transformer positional encoding |
| rotation matrix | 벡터를 각도만큼 회전 | RoPE |
| phase shift | 같은 파동을 옆으로 민 것 | 상대 위치 해석 |
| Fourier features | 여러 주파수 기저로 확장 | implicit neural representations |

RoPE를 읽을 때도 핵심은 같다. query와 key를 각도에 따라 회전시키면, 내적 안에 상대 위치 정보가 녹아 들어간다. 즉, 삼각함수는 따로 떨어진 부록이 아니라 attention 내부로 들어온다.

## PyTorch와 코드로 연결하기

- `torch.arange(seq_len)`으로 위치 인덱스를 만든다.
- `torch.sin`, `torch.cos`로 주기 신호를 만든다.
- RoPE 구현에서는 짝수/홀수 채널을 쪼개 회전시키는 패턴이 반복된다.
- Fourier feature는 입력 좌표를 여러 주파수로 확장한 뒤 MLP에 넣는 구조로 구현할 수 있다.

핵심은 "정수 위치 -> 실수 파동 특징"으로 바꾸는 단계다.

## 자주 틀리는 지점

- degree와 radian을 같은 감각으로 다룬다.
- `sin`, `cos`를 단순 암기 함수로 보고 주기성이라는 핵심 역할을 놓친다.
- positional encoding을 값 추가 정도로만 보고 주파수 구조를 놓친다.
- RoPE의 회전을 복잡한 트릭으로만 보고 각도와 상대 위치 언어로 읽지 못한다.

## 연습

### 기초 확인

1. 왜 `sin`과 `cos`가 반복 신호라고 말할 수 있는지 적어본다.
2. radian이 degree보다 구현에서 더 자연스러운 이유를 적어본다.
3. positional encoding에서 여러 주파수가 필요한 이유를 설명해본다.

### 논문 읽기 훈련

1. `PE(pos, 2i)` 식에서 각 항의 역할을 한 줄씩 적어본다.
2. RoPE가 "상대 위치 정보"와 연결된다는 말을 각도 회전 관점으로 설명해본다.
3. Fourier feature가 MLP 입력을 어떻게 바꾸는지 적어본다.

### 엔지니어 / 코드 훈련

1. `torch.sin`과 `torch.cos`만으로 위치 인코딩 표를 만든다고 할 때 필요한 입력 텐서를 적어본다.
2. RoPE 구현에서 짝수/홀수 차원을 나누는 이유를 적어본다.
3. 현재 Transformer 코드에서 위치 정보가 어디서 들어가는지 찾아 적어본다.

## 다음 장으로 연결

주기성과 각도 감각이 잡혔다면 이제 표현 공간 자체를 더 깊게 읽을 차례다. 다음 장에서는 basis, span, projection, rank를 통해 임베딩 공간과 attention projection을 더 정교하게 해석한다.

다음 장: [고급 선형대수](/math-advanced/advanced-linear-algebra)

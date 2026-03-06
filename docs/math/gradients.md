# 미분과 gradient

## 이 페이지의 목표

- 미분을 변화율이 아니라 손실 감소 신호로 이해한다.
- gradient descent의 핵심 문장을 이해한다.
- chain rule이 backpropagation과 연결된다는 점을 잡는다.

## 핵심 문장

파라미터를 조금 바꿨을 때 손실이 얼마나 달라지는지 알려주는 값이 gradient다.

```text
parameter = parameter - learning_rate * gradient
```

## 학습이 일어나는 흐름

<MermaidDiagram>
flowchart LR
  A["입력 x"] --> B["모델 예측 y_hat"]
  B --> C["손실 계산"]
  C --> D["gradient 계산"]
  D --> E["파라미터 업데이트"]
  E --> B
</MermaidDiagram>

## 왜 chain rule이 중요한가

신경망은 함수 여러 개가 이어진 구조다. backpropagation은 마지막 손실에서 시작해 앞단 파라미터들까지 영향도를 전파해야 하므로 chain rule이 필요하다.

간단히 말해 "뒤쪽 결과가 바뀌면 앞쪽 변수에 어떤 영향이 돌아오는가"를 단계적으로 계산하는 법이 chain rule이다.

## 손실 함수 관점에서 미분 보기

수학 시간에는 미분을 변화율로 배웠을 수 있다. 딥러닝에서는 더 실용적으로, "이 파라미터를 조금 바꾸면 loss가 좋아지나 나빠지나"를 알려주는 신호로 이해하면 된다.

| gradient 부호 | 의미 |
| --- | --- |
| 양수 | 값을 줄이는 쪽이 loss 감소에 유리 |
| 음수 | 값을 키우는 쪽이 loss 감소에 유리 |
| 0 근처 | 현재 지점에서 변화가 작거나 정체 구간일 수 있음 |

## 모델 연결

| 수학 개념 | 모델 예시 |
| --- | --- |
| 미분 | 손실이 파라미터에 얼마나 민감한가 |
| gradient | 업데이트 방향 신호 |
| chain rule | 역전파 |

## learning rate는 왜 중요한가

- 너무 작으면: 방향은 맞아도 거의 움직이지 않는다
- 너무 크면: 좋은 방향을 알아도 지나쳐서 흔들린다
- 적당하면: 안정적으로 loss를 줄인다

## 자주 생기는 오해

- gradient가 크면 무조건 좋은 것이라고 생각하기
- loss가 줄지 않으면 모델 구조만 탓하기
- backpropagation을 "마법"처럼 여기고 chain rule과 끊어 생각하기

## 연습

1. gradient가 양수라는 말이 파라미터 업데이트에 어떤 의미인지 설명해본다.
2. learning rate가 너무 큰 경우 어떤 학습 곡선이 나올지 상상해본다.
3. chain rule이 왜 깊은 네트워크에서 필수인지 적어본다.

## 생각해볼 질문

1. gradient가 0에 가까우면 학습은 어떻게 될까
2. learning rate가 너무 크면 어떤 일이 생길까
3. backpropagation을 chain rule 없이 설명할 수 있을까

다음: [확률과 softmax](/math/probability)

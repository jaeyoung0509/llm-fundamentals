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

## 왜 chain rule이 중요한가

신경망은 함수 여러 개가 이어진 구조다. backpropagation은 마지막 손실에서 시작해 앞단 파라미터들까지 영향도를 전파해야 하므로 chain rule이 필요하다.

## 모델 연결

| 수학 개념 | 모델 예시 |
| --- | --- |
| 미분 | 손실이 파라미터에 얼마나 민감한가 |
| gradient | 업데이트 방향 신호 |
| chain rule | 역전파 |

## 생각해볼 질문

1. gradient가 0에 가까우면 학습은 어떻게 될까
2. learning rate가 너무 크면 어떤 일이 생길까
3. backpropagation을 chain rule 없이 설명할 수 있을까

다음: [확률과 softmax](/math/probability)


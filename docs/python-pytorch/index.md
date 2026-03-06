# Python과 PyTorch

## 이 장의 목표

- 텐서를 중심으로 사고하는 습관을 만든다.
- autograd가 왜 강력한지 이해한다.
- 직접 training loop를 작성해본다.

## 이 장에서 꼭 가져갈 한 문장

PyTorch 학습은 결국 텐서 흐름, loss 계산, gradient 업데이트를 읽고 제어하는 일이다.

## 핵심 개념

### 텐서 사고 방식

NumPy 배열처럼 보이지만, PyTorch 텐서는 gradient 추적과 GPU 이동, 모델 학습이라는 문맥까지 포함한다.

논문에서 `X`, `W`, `theta`, `grad`로 쓰이는 것들이 실제 코드에서는 거의 전부 텐서다. 그래서 PyTorch를 잘한다는 말은 문법을 많이 안다는 뜻보다, 텐서가 어떤 shape로 흐르고 어떤 텐서에 gradient가 쌓이는지 읽을 수 있다는 뜻에 가깝다.

### 수식과 코드의 번역표

| 수식 | PyTorch에서 보는 것 |
| --- | --- |
| `X` | 입력 텐서 |
| `W`, `b` | `nn.Linear` 안의 파라미터 |
| `f_theta(X)` | `model(X)` |
| `L(y_hat, y)` | `loss_fn(predictions, targets)` |
| `grad_theta L` | `parameter.grad` |
| `theta <- theta - eta g` | `optimizer.step()` |

### 학습 루프의 최소 단위

```python
for inputs, targets in dataloader:
    optimizer.zero_grad()
    predictions = model(inputs)
    loss = loss_fn(predictions, targets)
    loss.backward()
    optimizer.step()
```

이 다섯 줄을 이해하면 이후의 대부분은 이 패턴의 변형이다.

## 텐서 shape를 읽는 습관

딥러닝 코드에서 가장 자주 터지는 버그는 문법보다 shape에서 나온다. 최소한 아래 정도는 즉시 읽을 수 있어야 한다.

| shape | 해석 |
| --- | --- |
| `(batch, dim)` | 배치에 들어 있는 벡터 묶음 |
| `(batch, seq, dim)` | 시퀀스 배치 |
| `(vocab, dim)` | 임베딩 테이블 |
| `(batch, classes)` | 분류 로짓 |

shape는 숫자 묶음이 아니라 "모델이 지금 무엇을 들고 있는가"를 말해주는 설명문이다.

## autograd를 어떻게 이해할까

autograd는 "미분을 자동으로 해준다"에서 끝나지 않는다. 더 정확히는 forward에서 계산 그래프를 만들고, backward에서 그 그래프를 거꾸로 따라가며 gradient를 누적하는 시스템이다.

```python
import torch

x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 3 * x
y.backward()

print(x.grad)  # dy/dx at x = 2
```

여기서 중요한 것은 숫자 결과보다 아래 두 가지다.

- 어떤 텐서가 `requires_grad=True`인지
- `backward()` 이후 gradient가 어디에 저장되는지

## Dataset과 DataLoader의 역할

논문에서는 보통 데이터셋이 한 줄로 지나가지만, 구현에서는 이 부분이 학습 재현성과 속도를 크게 좌우한다.

- `Dataset`: 한 샘플을 어떻게 읽고 반환할지 정의
- `DataLoader`: 샘플을 배치로 묶고 섞고 병렬 로딩

즉, 모델이 좋더라도 입력 파이프라인이 불안정하면 학습 전체가 흔들린다.

## 학습 루프를 문장으로 읽기

아래 루프를 볼 때는 코드가 아니라 절차로 읽는다.

1. 이전 step의 gradient를 지운다.
2. 입력으로 예측을 만든다.
3. 정답과 비교해 loss를 계산한다.
4. loss를 기준으로 gradient를 역전파한다.
5. optimizer가 파라미터를 갱신한다.

이 흐름이 보이면 `train()`, `eval()`, mixed precision, gradient clipping도 모두 확장 규칙으로 읽힌다.

## 논문에서 이렇게 코드로 내려온다

예를 들어 논문에 아래 식이 있으면:

```text
h = Wx + b
```

PyTorch에서는 대체로 아래 둘 중 하나다.

```python
h = x @ W + b
```

```python
layer = torch.nn.Linear(in_features=d, out_features=h)
h = layer(x)
```

즉, 식을 코드로 옮기는 일은 복잡한 마법이 아니라 "같은 연산을 텐서 API로 적는 것"이다.

## 디버깅할 때 먼저 보는 것

- 입력과 출력 shape가 예상과 맞는가
- `loss`가 감소하는가
- `parameter.grad`가 `None`인지 아닌지
- `optimizer.zero_grad()`를 빼먹지 않았는가
- train/eval 모드가 맞는가

## 추천 실습

- `examples/torch-basics/linear_regression.py`
- 직접 `Dataset`을 만들어 미니배치를 구성해보기
- CPU와 GPU에서 같은 코드를 돌려보기
- `nn.Linear` 하나로 시작해서 직접 MLP 두 층으로 확장해보기

## 체크리스트

- 텐서 shape를 읽을 수 있는가
- `requires_grad`의 의미를 설명할 수 있는가
- `loss.backward()`와 `optimizer.step()`의 차이를 말할 수 있는가

## 다음 장으로 어떻게 연결되는가

이 장에서 학습 루프를 잡았다면, 다음은 그 루프 안에서 어떤 모델 구조와 손실 함수가 돌아가는지 이해해야 한다.

다음 장: [딥러닝 기본기](/deep-learning/)

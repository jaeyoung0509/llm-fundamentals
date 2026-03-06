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

## 추천 실습

- `examples/torch-basics/linear_regression.py`
- 직접 `Dataset`을 만들어 미니배치를 구성해보기
- CPU와 GPU에서 같은 코드를 돌려보기

## 체크리스트

- 텐서 shape를 읽을 수 있는가
- `requires_grad`의 의미를 설명할 수 있는가
- `loss.backward()`와 `optimizer.step()`의 차이를 말할 수 있는가

## 다음 장으로 어떻게 연결되는가

이 장에서 학습 루프를 잡았다면, 다음은 그 루프 안에서 어떤 모델 구조와 손실 함수가 돌아가는지 이해해야 한다.

다음 장: [딥러닝 기본기](/deep-learning/)

# 고유값, 고유벡터, SVD

## 왜 중요한가

고유값과 SVD는 "이 행렬이 실제로 어떤 방향을 얼마나 강하게 쓰는가"를 분해해서 보는 도구다. 표현 압축, PCA, 저랭크 근사, LoRA 같은 구조를 읽으려면 여기서의 감각이 매우 중요하다.

이 장이 약하면 `U Sigma V^T`가 기계적으로만 보이고, low-rank adapter나 spectral analysis가 전부 새로운 문법처럼 느껴진다. 반대로 이 장이 잡히면 큰 행렬도 "몇 개의 핵심 방향 + 크기"로 읽을 수 있다.

## 한 문장 핵심

SVD와 고유분해는 복잡한 행렬을 "주요 방향과 그 세기"로 해석하게 만드는 분해 도구다.

## 표기법 리부트

| 표기 | 빠른 해석 | 모델 문맥 |
| --- | --- | --- |
| `Av = lambda v` | 방향 `v`는 유지되고 크기만 바뀜 | eigenvector, eigenvalue |
| `X = U Sigma V^T` | 좌우 방향과 세기로 행렬 분해 | SVD |
| `Sigma_k` | 큰 특이값만 남긴 축소 버전 | low-rank approximation |
| `PCA` | 분산이 큰 방향부터 읽음 | representation analysis |
| rank-`k` | `k`개 방향만 남김 | compression, adapters |

고유분해는 정사각행렬에서, SVD는 거의 모든 행렬에서 더 일반적으로 쓸 수 있다는 구분만 잡아도 충분하다.

## Mermaid로 보는 핵심 구조

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;원래 행렬 X&quot;] --> B[&quot;V^T: 입력 방향 정렬&quot;]
  B --> C[&quot;Sigma: 방향별 크기&quot;]
  C --> D[&quot;U: 출력 방향 정렬&quot;]
  D --> E[&quot;핵심 구조 해석&quot;]`"
/>

<MermaidDiagram
  :code="`xychart
    title &quot;Singular Value Decay&quot;
    x-axis &quot;component index&quot; [1, 2, 3, 4, 5, 6]
    y-axis &quot;singular value&quot; 0 --> 10
    line [9.4, 6.8, 4.2, 2.3, 1.1, 0.4]`"
/>

## 직관과 한 가지 예시

행렬 `X`를 SVD로 분해하면 "입력 방향을 정렬하고, 중요한 방향은 크게 남기고, 덜 중요한 방향은 작게 누르는 구조"로 볼 수 있다.

특이값이 빠르게 줄어든다면 적은 수의 방향만으로도 원래 행렬을 꽤 잘 근사할 수 있다. 이게 저랭크 근사의 핵심 감각이다.

### Formula Autopsy: Low-Rank Approximation

```text
X ≈ U_k Sigma_k V_k^T
```

- `U_k`: 출력 쪽 주요 방향 `k`개
- `Sigma_k`: 그 방향들의 세기
- `V_k^T`: 입력 쪽 주요 방향 `k`개
- `k`를 줄이면 압축이 강해지고, 정보 손실 위험도 커진다

즉, 이 식은 "행렬 전체를 다 들고 있지 말고 핵심 방향 몇 개만 남기자"는 제안이다.

## 논문에서는 이렇게 보인다

| 논문 표현 | 읽는 법 | 연결 문맥 |
| --- | --- | --- |
| low-rank update | 몇 개 방향만 추가 수정 | LoRA |
| principal components | 분산이 큰 대표 방향 | representation analysis |
| spectral decay | 정보가 몇 개 축에 몰림 | compression |
| eigen spectrum | 방향별 중요도 분포 | stability, geometry |

LoRA를 볼 때도 본질은 비슷하다. 거대한 가중치 전체를 다시 학습하기보다 저랭크 행렬 두 개를 붙여 핵심 방향 몇 개만 조정한다는 해석이 가능하다.

## PyTorch와 코드로 연결하기

- `torch.linalg.svd(X)`는 `U`, `S`, `Vh`를 준다.
- `torch.pca_lowrank(X)`는 PCA 감각을 확인하는 데 도움이 된다.
- 저랭크 근사는 큰 가중치를 전부 업데이트하지 않고 작은 보조 행렬을 붙이는 아이디어와 연결된다.
- 특이값 decay를 보면 압축 여지가 있는지 감을 잡을 수 있다.

## 자주 틀리는 지점

- 고유값과 특이값을 완전히 같은 것으로 생각한다.
- SVD를 공식 암기로만 보고 "주요 방향" 직관을 놓친다.
- low-rank가 곧 무조건 좋다고 생각하고 정보 손실 trade-off를 놓친다.
- 스펙트럼 decay를 읽지 않고 단순 압축률만 본다.

## 연습

### 기초 확인

1. 특이값이 빠르게 줄어든다는 말이 무엇을 뜻하는지 적어본다.
2. 고유값/고유벡터와 SVD의 차이를 한 문장으로 정리해본다.
3. 저랭크 근사가 왜 압축과 연결되는지 적어본다.

### 논문 읽기 훈련

1. `X ≈ U_k Sigma_k V_k^T`에서 각 항의 역할을 적어본다.
2. LoRA가 왜 low-rank update라고 불리는지 적어본다.
3. representation analysis 논문에서 PCA가 나오면 무엇을 보려는 것인지 적어본다.

### 엔지니어 / 코드 훈련

1. 임의의 행렬에 `torch.linalg.svd`를 적용하면 어떤 출력이 나오는지 적어본다.
2. 가중치 행렬의 특이값 분포를 그려보면 어떤 통찰을 얻을 수 있을지 적어본다.
3. LoRA 코드에서 실제로 rank가 낮은 보조 행렬이 어디에 들어가는지 찾아 적어본다.

## 다음 장으로 연결

표현 공간의 분해와 압축 감각이 잡혔다면, 이제 변화가 여러 변수에 동시에 퍼질 때를 읽어야 한다. 다음 장에서는 Jacobian, Hessian, Taylor 감각으로 다변수 미적분을 ML 문맥에 붙인다.

다음 장: [다변수 미적분](/math-advanced/multivariable-calculus)

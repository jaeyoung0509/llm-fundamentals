# 프로젝트

## 왜 이 장이 중요한가

좋은 프로젝트는 코드가 돌아가는 것만으로 끝나지 않는다. 문제 정의, 구현 범위, 평가 기준, 실패 사례, 운영 리스크까지 설명할 수 있어야 진짜 포트폴리오가 된다.

## 이 장에서 꼭 가져갈 한 문장

프로젝트는 학습 결과물이 아니라, 수학-모델-평가-운영을 한 번에 연결하는 실전 연습장이다.

## 프로젝트 트랙 한눈에 보기

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;tiny LM&quot;] --> D[&quot;modeling track&quot;]
  B[&quot;mini RAG&quot;] --> E[&quot;system track&quot;]
  C[&quot;bandit / preference experiment&quot;] --> F[&quot;alignment track&quot;]`"
/>

## Track 1. 작은 문자/토큰 언어 모델

### 목표

작은 규모라도 직접 language model을 만들면서 tokenization, embedding, training loop, loss 해석을 몸으로 익힌다.

### 선행 지식

- 수학 기초
- Python과 PyTorch
- 딥러닝 기본기
- Transformer 또는 작은 RNN/MLP 구조 이해

### 데이터 / 입력

- 작은 텍스트 코퍼스
- 문자 단위 또는 아주 작은 tokenizer 기반 텍스트

### 구현 범위

- tokenizer 또는 문자 사전 구성
- dataset / dataloader 작성
- tiny LM 학습
- generation loop 구현
- loss curve 기록

### 평가

- train/validation loss
- 짧은 생성 샘플 품질
- overfitting 여부

### 실패 사례

- vocab 설계가 불안정함
- sequence length가 너무 짧아 문맥을 잘 못 봄
- 샘플은 그럴듯하지만 loss가 불안정함

### 산출물

- 학습 곡선 이미지
- 생성 예시
- 모델 구조 설명
- 회고 문서

### 포트폴리오 포인트

"직접 작은 언어모델을 학습하고 decoding behavior를 해석할 수 있다"는 점을 보여준다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;text corpus&quot;] --> B[&quot;tokenizer&quot;]
  B --> C[&quot;dataset / dataloader&quot;]
  C --> D[&quot;tiny language model&quot;]
  D --> E[&quot;loss + generation eval&quot;]`"
/>

## Track 2. 문서 QA 또는 미니 RAG

### 목표

검색과 생성이 결합된 시스템을 직접 만들며 retrieval 품질, context injection, answer evaluation을 익힌다.

### 선행 지식

- Python과 PyTorch 또는 LLM API 사용 경험
- LLM 실전 기본기
- AI Engineering 기본 이해

### 데이터 / 입력

- 문서 묶음, 노트, 블로그 글, PDF 추출 텍스트
- 사용자 질문 세트

### 구현 범위

- 문서 chunking
- embedding / indexing
- retrieval
- prompt 구성
- answer generation
- 간단한 eval set 작성

### 평가

- retrieval hit quality
- 답변 정확도/근거성
- latency와 비용

### 실패 사례

- chunk가 너무 커서 retrieval이 흐릿함
- 관련 문서를 못 가져옴
- 답변이 근거 없이 hallucination함

### 산출물

- 시스템 아키텍처 다이어그램
- retrieval/eval 결과표
- 실패 케이스 분석

### 포트폴리오 포인트

"모델 호출"이 아니라, 검색-프롬프트-평가-운영 축을 설계할 수 있다는 점을 보여준다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;documents&quot;] --> B[&quot;chunking&quot;]
  B --> C[&quot;embedding / index&quot;]
  D[&quot;user query&quot;] --> E[&quot;retrieval&quot;]
  C --> E
  E --> F[&quot;prompt with context&quot;]
  F --> G[&quot;LLM answer&quot;]
  G --> H[&quot;eval&quot;]`"
/>

## Track 3. bandit 또는 preference experiment

### 목표

강화학습 전체를 다 구현하지 않더라도, 보상과 선호 기반 업데이트 감각을 프로젝트로 익힌다.

### 선행 지식

- 확률과 기대값
- RL과 RLHF 기본 개념
- Python 구현 능력

### 데이터 / 입력

- 여러 응답 후보
- 간단한 사용자 선호 또는 synthetic reward

### 구현 범위

- bandit 실험 또는 pairwise preference dataset 구성
- reward 계산
- 선택 전략 비교
- 결과 시각화

### 평가

- 누적 보상
- regret 또는 preference accuracy
- 정책 변화 추세

### 실패 사례

- exploration이 너무 적어 한 행동에 과하게 고정
- reward 정의가 잘못돼 이상한 정책 학습
- synthetic reward와 실제 선호가 불일치

### 산출물

- reward 그래프
- 선택 전략 비교표
- 실험 회고

### 포트폴리오 포인트

alignment와 reward 문제를 "용어"가 아니라 실험으로 이해하고 있다는 점을 보여준다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;candidates&quot;] --> B[&quot;reward / preference signal&quot;]
  B --> C[&quot;selection policy&quot;]
  C --> D[&quot;observed outcome&quot;]
  D --> E[&quot;policy update&quot;]`"
/>

## 공통 프로젝트 템플릿

- 문제 정의
- 데이터와 제약
- 모델 또는 시스템 설계
- 구현 범위
- 평가 기준
- 실패 사례
- 회고

## 프로젝트를 읽는 면접관 관점

면접관은 대체로 아래를 본다.

1. 왜 이 문제를 골랐는가
2. 어떤 지표로 성공을 판단했는가
3. 실패했을 때 무엇을 배웠는가
4. 운영 리스크를 생각했는가

## 체크리스트

- 문제 정의가 분명한가
- 평가 기준이 있는가
- 실패 사례를 말할 수 있는가
- 회고에서 개선 포인트를 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

프로젝트 장은 끝이 아니라 다시 시작점이다. 프로젝트를 만든 뒤에는 수학, Transformer, AI Engineering 섹션으로 돌아가 약한 부분을 다시 채운다.

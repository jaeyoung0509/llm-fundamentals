# AI Engineering

## 왜 이 장이 중요한가

모델을 이해하는 것과 제품을 운영하는 것은 다른 일이다. 이 장은 후자를 다룬다. 좋은 AI 시스템은 모델 정확도만 높은 것이 아니라, 평가 가능하고, 배포 가능하고, 관측 가능하고, 안전해야 한다.

## 이 장에서 꼭 가져갈 한 문장

AI Engineering은 모델 성능만이 아니라 평가, 배포, 관측성, 비용, 보안, 롤백 전략을 동시에 관리하는 일이다.

## 실무 축

- 데이터 파이프라인과 실험 추적
- eval-driven development
- RAG, tool calling, agent workflow의 구분
- 배포와 모니터링
- 비용 관리와 latency
- 프롬프트 인젝션, 권한, 개인정보 같은 운영 리스크

## 시스템 관점 그림

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;데이터와 문서&quot;] --> B[&quot;모델/프롬프트 실험&quot;]
  B --> C[&quot;평가&quot;]
  C --> D[&quot;배포&quot;]
  D --> E[&quot;모니터링&quot;]
  E --> F[&quot;개선 루프&quot;]
  F --> B`"
/>

## eval-driven 개발 루프

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;task definition&quot;] --> B[&quot;eval set&quot;]
  B --> C[&quot;prompt or model change&quot;]
  C --> D[&quot;score results&quot;]
  D --> E{&quot;better?&quot;}
  E -->|&quot;yes&quot;| F[&quot;deploy candidate&quot;]
  E -->|&quot;no&quot;| C`"
/>

## eval dataset는 어떻게 설계할까

평가셋은 "적당한 예시 모음"이 아니라, 시스템이 실제로 실패할 만한 상황을 대표해야 한다.

- 정상 질의만이 아니라 애매한 질의, 장문 질의, 실패 사례를 포함
- 정답 형식, 근거 필요 여부, 안전성 기준을 미리 정의
- 오프라인 평가셋과 실제 운영 피드백을 분리해 관리

## offline eval과 online eval

| 종류 | 무엇을 본다 | 왜 필요한가 |
| --- | --- | --- |
| offline eval | 고정된 테스트셋에서 성능 비교 | 모델/프롬프트 변경을 안정적으로 비교 |
| online eval | 실제 사용자 트래픽에서 반응 관찰 | 현실 품질, latency, 비용, 실패율 확인 |

둘 중 하나만 보면 시스템 판단이 흔들린다.

## RAG, tool calling, agent workflow를 실무적으로 구분하기

| 패턴 | 주된 목적 | 실패 포인트 |
| --- | --- | --- |
| RAG | 외부 지식을 검색해서 답변 품질을 보강 | retrieval 품질, chunking, citation 오류 |
| tool calling | 계산, 검색, 외부 API 호출 같은 행동 수행 | tool schema 불일치, 권한, 실패 처리 |
| agent workflow | 여러 단계의 계획과 실행을 조합 | 루프 제어, 상태 관리, 비용 폭증 |

<MermaidDiagram
  :code="`flowchart TD
  A[&quot;user request&quot;] --> B{&quot;what is missing?&quot;}
  B -->|&quot;knowledge&quot;| C[&quot;RAG&quot;]
  B -->|&quot;action&quot;| D[&quot;tool calling&quot;]
  B -->|&quot;multi-step coordination&quot;| E[&quot;agent workflow&quot;]`"
/>

## 프롬프트와 버전 추적

실무에서는 모델 버전만 관리하면 부족하다. 아래를 같이 기록해야 재현이 된다.

- 모델 이름과 버전
- system prompt / tool schema / retrieval 설정
- eval dataset 버전
- latency, 비용, 실패 로그

즉, prompt도 코드처럼 버전 관리해야 한다.

## 모니터링

운영에서는 정확도만 보면 부족하다. latency, 실패율, 비용, 사용자 피드백, 안전성 이벤트까지 같이 봐야 한다.

<MermaidDiagram
  :code="`flowchart LR
  A[&quot;production traffic&quot;] --> B[&quot;latency / cost / quality&quot;]
  B --> C[&quot;alerts&quot;]
  C --> D[&quot;rollback or fix&quot;]
  D --> E[&quot;new evaluation&quot;]
  E --> F[&quot;redeploy&quot;]`"
/>

## 롤백 전략은 왜 필요한가

AI 시스템은 "조용히 나빠지는" 경우가 많다. 그래서 문제가 생겼을 때 아래가 준비돼 있어야 한다.

- 이전 prompt / 모델 / 검색 설정으로 즉시 복귀
- 문제 쿼리 샘플 수집
- hotfix 전 재평가

## 안전성과 보안 리뷰

운영 리스크는 단순 품질 문제를 넘는다.

- prompt injection
- 권한 없는 데이터 접근
- 개인정보 노출
- hallucination으로 인한 잘못된 업무 처리
- 과도한 비용과 지연시간

## observability 체크리스트

- 요청당 latency
- 요청당 비용
- retrieval hit quality
- tool call 실패율
- 사용자 만족/불만 신호
- 안전성 이벤트 수

## 논문과 실무를 연결해서 읽기

논문이 "성능 향상"을 말할 때 실무에서는 항상 같이 물어야 한다.

1. 어떤 eval로 좋아졌는가
2. 실제 트래픽에서도 유지되는가
3. 비용과 latency는 감당 가능한가
4. 안전성 리스크는 늘지 않았는가

## 연습

1. eval-driven development가 왜 감 의존 실험보다 나은지 적어본다.
2. RAG와 tool calling의 차이를 실패 모드 관점에서 설명해본다.
3. 운영 대시보드에 반드시 있어야 할 지표를 세 가지 이상 적어본다.

## 이 장의 산출물

- 평가 체크리스트
- 시스템 아키텍처 다이어그램
- 최소 운영 대시보드 요구사항
- 롤백 전략 문서 초안

## 체크리스트

- offline eval과 online eval 차이를 설명할 수 있는가
- RAG와 tool calling, agent workflow를 운영 관점에서 구분할 수 있는가
- prompt/version tracking이 왜 필요한지 설명할 수 있는가
- 운영 리스크와 롤백 전략을 설명할 수 있는가

## 다음 장으로 어떻게 연결되는가

운영 관점이 잡히면, 이제 그 관점을 실제 포트폴리오 프로젝트에 녹여내야 한다.

다음 장: [프로젝트](/projects/)

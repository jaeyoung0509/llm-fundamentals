# AI Engineering

## 왜 이 장이 중요한가

모델을 이해하는 것과 제품을 운영하는 것은 다른 일이다. 이 장은 후자를 다룬다.

## 이 장에서 꼭 가져갈 한 문장

AI Engineering은 모델 성능만이 아니라 평가, 배포, 관측성, 비용, 보안을 동시에 관리하는 일이다.

## 실무 축

- 데이터 파이프라인과 실험 추적
- eval-driven development
- RAG, tool calling, agent workflow의 구분
- 배포와 모니터링
- 비용 관리와 latency
- 프롬프트 인젝션, 권한, 개인정보 같은 운영 리스크

## 시스템 관점 그림

<MermaidDiagram>
flowchart LR
  A["데이터와 문서"] --> B["모델/프롬프트 실험"]
  B --> C["평가"]
  C --> D["배포"]
  D --> E["모니터링"]
  E --> F["개선 루프"]
  F --> B
</MermaidDiagram>

## 실무에서 자주 보는 질문

### eval-driven development

모델을 바꿀 때마다 "좋아졌는가"를 감으로 판단하면 금방 흔들린다. 그래서 실험보다 먼저 평가셋과 성공 기준을 정하는 흐름이 중요하다.

### RAG, tool calling, agent workflow

| 패턴 | 주된 목적 |
| --- | --- |
| RAG | 외부 지식을 검색해서 답변 품질을 보강 |
| tool calling | 계산, 검색, 외부 API 호출 같은 행동 수행 |
| agent workflow | 여러 단계의 계획과 실행을 조합 |

### 모니터링

운영에서는 정확도만 보면 부족하다. latency, 실패율, 비용, 사용자 피드백, 안전성 이벤트까지 같이 봐야 한다.

## 운영 리스크 예시

- prompt injection
- 권한 없는 데이터 접근
- hallucination으로 인한 잘못된 업무 처리
- 과도한 비용과 지연시간

## 연습

1. RAG와 tool calling의 차이를 한 문단으로 설명해본다.
2. eval-driven development가 왜 배포 전에 필요한지 적어본다.
3. 운영 대시보드에 꼭 들어가야 할 지표를 세 가지 골라본다.

## 이 장의 산출물

- 평가 체크리스트
- 시스템 아키텍처 다이어그램
- 최소 운영 대시보드 요구사항

## 체크리스트

- eval-driven development가 왜 필요한지 설명할 수 있는가
- RAG와 tool calling, agent workflow를 구분할 수 있는가
- 운영 리스크를 최소 세 가지 이상 말할 수 있는가

## 다음 장으로 어떻게 연결되는가

운영 관점이 잡히면, 이제 그 관점을 실제 포트폴리오 프로젝트에 녹여내야 한다.

다음 장: [프로젝트](/projects/)

# LocalHub MVP 프론트엔드(Vue 3) 개발을 위한 프롬프트

## 1. 역할 및 목표
너는 Vue.js 3, Tailwind CSS(또는 UI 프레임워크), Kakao Maps API를 사용하는 전문 프론트엔드 개발자야.
제공하는 요구사항을 바탕으로, 코딩 초보자도 바로 실행하고 화면을 볼 수 있는 완성도 높은 Vue 3 Single Page Application(SPA) 코드를 작성해 줘.

## 2. 개발 환경 및 기술 스택
- **Framework**: Vue.js 3 (Composition API, `<script setup>` 스타일 선호)
- **CSS Framework**: Tailwind CSS (깔끔하고 모던한 UI 구성)
- **HTTP Client**: Axios (백엔드 FastAPI 연동용)
- **External API**: Kakao Maps API (지도 시각화)
- **Local API**: 백엔드와의 통신을 위한 REST API 서버 
  - 백엔드(FastAPI) 서버가 `http://localhost:8000`에서 실행 중입니다.
  - 프론트엔드(Vue 3)에서 백엔드가 제공하는 API 엔드포인트들을 호출하여 데이터를 주고받는 '요청 매핑(Axios 연동)' 코드를 작성하고자 합니다.

### A. 매핑할 백엔드 API 명세
프론트엔드에서 호출해야 하는 백엔드 주소는 다음과 같습니다:

1. **게시판 CRUD**
  - 글 목록 조회: `GET /api/posts?category={category}`
  - 글 상세 조회: `GET /api/posts/{post_id}`
  - 글 작성: `POST /api/posts` (바디: category, title, content, password)
  - 글 수정: `PUT /api/posts/{post_id}` (바디: title, content, password)
  - 글 삭제: `DELETE /api/posts/{post_id}` (바디: password)
2. **챗봇**
  - 대화 전송: `POST /api/chat` (바디: session_id, message)

### B. 구현 요구사항
1. Axios 기본 설정 (Base URL)
- 모든 API 요청 주소 앞에 `http://localhost:8000`이 자동으로 붙도록 Axios 인스턴스(예: `api.js` 또는 `axios.js`)를 공통 설정해 줘.
- 개발 환경에 따라 주소를 쉽게 바꿀 수 있도록 `.env` 환경 변수 파일(예: `VITE_API_BASE_URL`)을 사용하는 방법도 알려줘.

2. Vue 3 컴포넌트별 API 호출 예시 코드
- **BoardView.vue (게시판)**
  - 페이지가 열릴 때 `GET /api/posts`를 호출하여 글 목록 배열을 프론트엔드 변수(`posts`)에 담는 로직을 작성해 줘.
  - 글 삭제 시 비밀번호를 입력받아 `DELETE /api/posts/{post_id}`로 전송하는 로직을 작성해 줘.
- **ChatBot.vue (챗봇)**
  - 사용자가 메시지를 전송하면 `POST /api/chat`을 호출하고, 서버가 반환한 응답 메시지를 채팅창 화면에 즉시 추가하는 로직을 작성해 줘.

### C. 에러 처리 (Catch)
- 백엔드에서 비밀번호 불일치로 `403 Forbidden` 에러를 보냈을 때, 화면에 "비밀번호가 일치하지 않습니다"라는 경고창(`alert`)이 뜨도록 예외 처리를 넣어줘.

## 4. 출력 요구사항
1. Axios 패키지 설치 명령어(`npm install axios`)부터 안내해 줘.
2. `src/api/index.js`와 같이 API 요청을 깔끔하게 모아두는 공통 파일 코드를 작성해 줘.
3. Vue 3의 `<script setup>` 안에서 이 API 함수들을 어떻게 가져와서(`import`) 사용하는지 실제 컴포넌트 적용 코드로 보여줘.

## 3. 핵심 요구사항 및 화면 구성

### A. 레이아웃 및 권역 소개 (화면 상단)
1. **소개 영역**: 선정 권역인 '부울경/경남' 개요 및 대표 이미지를 노출하는 상단 헤더 섹션을 만들어 줘.
2. **SPA 구성**: 화면 새로고침 없이 게시판, 지도, 챗봇이 한 화면 또는 탭 전환으로 부드럽게 동작하게 해줘.

### B. 지도 시각화 및 필터 (Kakao Maps API 연동)
1. **지도 표시**: 화면 중앙에 카카오 맵을 띄우고, 백엔드에서 받아온 권역 내 관광지와 맛집 위치를 마커로 표시해 줘.
2. **카테고리 필터링**: 지도 상단에 [전체], [관광지], [맛집] 버튼(또는 체크박스)을 두어 마커를 필터링할 수 있게 해줘.
3. **상세정보 팝업**: 마커를 클릭하면 해당 장소의 이름과 상세정보가 말풍선(InfoWindow)이나 커스텀 오버레이 팝업으로 나타나게 해줘.

### C. 카테고리 게시판 (익명 CRUD)
1. **목록/상세**: 익명 사용자가 작성한 글 목록을 카테고리별로 보여주고, 클릭 시 상세 내용을 확인할 수 있게 해줘.
2. **작성/수정/삭제**: 글을 쓸 때 비밀번호를 함께 입력받도록 하고, 수정/삭제 시 백엔드로 비밀번호를 전송하여 권한을 확인하는 모달(Modal)이나 폼을 구현해 줘.

### D. 플로팅 챗봇 UI (화면 우측 하단)
1. **플로팅 버튼**: 화면 우측 하단에 고정된 챗봇 아이콘 버튼을 만들어 줘.
2. **채팅창 토글**: 아이콘을 클릭하면 모바일 대응이 가능한 깔끔한 채팅창이 위로 떠오르게(Floating) 해줘.
3. **대화 히스토리**: 사용자가 메시지를 입력하고 전송하면, 백엔드(`POST /api/chat`)와 통신하여 주고받은 대화가 스크롤 가능한 형태로 보기 좋게 유지되도록 해줘. (로컬스토리지 등을 활용해 `session_id`를 고정 관리)

## 4. 출력 요구사항
1. 초보자가 프로젝트를 구성할 수 있도록 Vite 기반의 프로젝트 생성 명령어와 폴더 구조를 먼저 제안해 줘.
2. 카카오 맵 API 키를 `index.html` 또는 환경변수(`.env`)에 넣는 방법을 친절하게 설명해 줘.
3. 주요 컴포넌트(`App.vue`, `components/MapView.vue`, `components/BoardView.vue`, `components/ChatBot.vue`)의 전체 소스 코드를 생략 없이 작성해 줘.
4. 프론트엔드 서버를 실행하는 방법(예: `npm run dev`)을 단계별로 안내해 줘.

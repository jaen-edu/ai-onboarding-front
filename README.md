# LocalHub Frontend (Vue 3)

간단한 Vite + Vue 3 템플릿입니다. Axios로 백엔드 API를 호출하며, Kakao Maps 연동 예시와 챗봇, 게시판 컴포넌트를 포함합니다.

설치 및 실행:

```bash
npm install
# 또는 axios만 별도 설치: npm install axios
npm run dev
```

Tailwind CSS 설치(선택):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

환경변수 예시는 `.env.example`을 참고하세요. `.env` 파일에 `VITE_KAKAO_MAPS_KEY`를 설정하면 `MapView.vue`에서 자동으로 Kakao SDK를 동적으로 로드합니다.

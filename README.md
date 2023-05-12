### 패키지 설치

```
yarn add react-query
yarn add react-router-dom
yarn add axios
yarn add json-server
yarn json-server --watch db.json --port 4000

```

### tailwind 설정 방법

1. 설치

```
yarn add -D tailwindcss postcss autoprefixer
yarn tailwind init -p
```

2. tailwind.config.js 설정

- src 하위 파일 중 확장자가 .js, .jsx, .ts, .tsx인 파일을 대상으로 한다.

```
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3.기본 index.CSS 파일에 Tailwind의 각 레이어에 대한 지시문을 추가

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. index.js에 js파일로 import

```
import "tailwindcss/tailwind.css";
```

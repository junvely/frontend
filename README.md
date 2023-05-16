### 패키지 설치

```
yarn add styled-components
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

## 📌 nodemon

node server.js로 서버를 실행하면 작업할 때 페이지에 자동으로 업데이트가 반영되지 않기 때문에 불편하다.
nodemon으로 실행하면 저장할 때마다 페이지에 반영이 된다.

```
설치 : npm install nodemon -g
글로벌로 설치하면 다른 디렉토리에서도 사용할 수 있다.
실행 : nodemon server.js
```

## ✅ Commit Convention

```
Feat:	새로운 기능 추가
Fix:	버그 수정 또는 typo
Refactor:	리팩토링
Design:	CSS 등 사용자 UI 디자인 변경
Comment:	필요한 주석 추가 및 변경
Style:	코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
Test:	테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우)
Chore:	위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등)
Init:	프로젝트 초기 생성
Rename:	파일 혹은 폴더명 수정하거나 옮기는 경우
Remove:	파일을 삭제하는 작업만 수행하는 경우
Docs : README.md 텍스트 파일 수정하는 경우
```

## 프론트 AWS EC2 배포

```
[프론트 AWS EC2 배포]
ec2 인스턴스 발급하고 gitbash에서 ssh -i 받은키페어를끌어다놓기 ubuntu@AWS에적힌내아이피
1.
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
2.
sudo apt-get install -y nodejs
3.
sudo apt remove cmdtest
sudo apt remove yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y
4.
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn -y
5.
ec2 페이지 가서 보안 자격증명 열기
-> ssh, local host port, http 각각 ipv4, 6 열어주기
5.
FE 메인 레포 git clone
6.
ls로 파일 경로 확인하고 프로젝트 폴더로 들어가기 (cd 프로젝트 폴더 명)
7.
yarn (패키지 설치)
9.
yarn start
```

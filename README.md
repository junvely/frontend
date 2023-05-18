# 📱 아웃스타그램(OutStagram)

> 인스타그램(InStagram)을 클론 코딩하여 만든 저희만의 아웃스타그램 SNS입니다.

<br>

## ⚙️ FE Tech Stack

<div style="display: flex">
 <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <!-- <img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=#CC6699"> -->
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=black">
  <!-- <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=black"> -->
  <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black">
  </div>

<br>

## ⚙️ BE Tech Stack

<br>

## 📒 17조 아웃스타그램 S.A 보러가기

https://www.notion.so/S-A-7e9903d1733144afad46f8674af1015c

<br>

## 🖥️ 페이지 디자인

#### 회원가입 페이지

<img src="/public/img/메인페이지.jpg" />

#### 메인 페이지

<img src="/public/img/상세페이지.jpg" />

<br>

## ⚙️ ERD

![ERD](https://www.notion.so/S-A-7e9903d1733144afad46f8674af1015c?pvs=4#4c3aefd81a974540a8c0635ea533b798)

<br>

## ✨ 프로젝트 기능 정리

1. 회원가입 : 이미지 업로드, 이미지 미리보기, 이메일 인증, 유효성 검사(버튼 활성화)

2. 로그인 : Access-token과 Refresh-token을 사용한 로그인 인증, 인가 처리

3. 메인 페이지 : 인스타그램 피드 조회, 좋아요 기능

4. 사이드바 토글메뉴 : 포스팅(이미지 업로드, 미리보기)

5. 피드 상세 페이지 : 피드 수정 삭제, 댓글 조회 삭제

6. 기타 : 유저 페이지, 마이 페이지 게시물 조회, 유저 검색 기능, 팔로잉, 팔로우, 팔로잉한 유저의 게시글만 조회, 랜덤 유저의 게시물 조회, 좋아요 기능 등

<br>

## ❗페이지 예외 처리

### FE 예외 처리

```
로그인 여부에 따른 페이지 예외 처리 필요
```

### BE 예외 처리

```

```

<br>

## ✅ 트러블 슈팅 및 피드백 정리

### FE 트러블 슈팅

##### 1. 사용자 정보가 필요한 API요청에서 서버에 토큰을 전달할 때, headers 안에 set-cookie를 하여 전달하고자 하였는데 계속 access-token을 찾을 수 없다는 문제 발생.

```
=> 프론트에서는 전달 받은 headers의 cookie의 정보를 읽고 저장할 수는 있지만 set-cookie를 할 수는 없다는 것을 깨닫게 되어 headers안에 access-token과 refresh-token 키, 값을 각각 전달하여 로그인 처리에 성공할 수 있었다.
```

##### 2. formData 내부의 데이터 값을 확인할 수 없어 서버에 제대로 전송되고 있는지 확인이 불가능한 문제 발생.

```
=> formData는 특수한 객체 형태이기 때문에 formData 안의 키와 값은 console에 찍히지 않는다는 것을 깨닫고, for문으로 formData 내부를 순회하여 키와 값이 있음을 확인하고 서버에 전송할 수 있었다.
```

### BE 트러블 슈팅

##### 1. follow와 follower를 보여주는 부분에서 코딩 시 의도한 부분의 반대로 작동

```
=> ERD작성 시 Follows table에서 Users과의 관계 설정 시 Follows Table UserId와 followsUserId 가 각각 Users Table의 UserId와 각각 1:N관계로 설정되어있었음.
그로 인해 HasMany와 belongs to를 Model에 입력 시 같은 종속관계일 때에는 아래에 쓴 관계가 우선시 되는 것을 알게 되어 수정해서 완성시킴
```

##### 2. 게시물 조회 시 참조해야 할 table이 많아짐

```
=> 메인페이지 조회 부분에서 Posts Table에 Users, Follows, Comments table을 모두 참조해야 할 상황

처음에는 postService부분에서 postRepository로 method를 여러가지를, 여러 번 조회하였으나 데이터와의 통신이 많으면 비효율적일 것으로 예상됨

postRepository 에서 include로 전부 참조해서 처리하는 방식으로 변경

```

##### 3. multer-s3 와 aws-sdk 를 이용해 사진을 s3 에 업로드 하는 기능을 구현하였는데 this.client.send is not a function 에러가 발생

```
기본적으로 photo 에 대한 부분은 default value 에 기본 사진을 넣어 줌으로써 에러를 핸들링 했습니다. 근데 위 에러가 발생했습니다.

=> 위의 에러는 multer-s3 와 aws-sdk 의 버전 호환성 문제로 multer-s3 는 3.xxx 버전을, aws-sdk 는 2.xxx 버전을 활용할 때 발생한다.

따라서 multer-s3 를 uninstall 하고 2.xxx 버전으로 받아주면 된다

## 해결

npm uninstall multer-s3

npm i multer-s3@^2 --save

이렇게 하니 바로 정상적으로 작동

([link](https://stackoverflow.com/questions/72431773/multers3-is-giving-this-client-send-is-not-a-function-error))

```
##### 4. posts Model 에 likesCount 와 commentsCount 를 추가했다가 다시 제거한 부분

```
=> get posts method 에서 다른 db를 참조하지 않고 데이터를 불러올 수 있다는 부분에서 효율적이라고 생각했었지만,

반대로 likes 를 누르거나 comments 를 작성할 때 마다 posts table 을 참조해 숫자를 increment 해야 하기 때문에 부적합하다고 판단하여

제거하고 다시 설정하게 되었습니다.

```
##### 4. front 에서 backend 에 데이터를 header 에 담아서 전송할 때 모드 소문자로 치환되는 부분

```

accessToken 과 refreshToken 을 받을 때, front 에서 보내준 값과 다르게 모두 소문자로 들어가는 것을 확인했습니다.

그래서 req 로 백엔드에서 받을 때 고려해야했습니다.


```

<!-- ### 패키지 설치

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
``` -->

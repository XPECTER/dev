## Description

이 프로젝트는 Nest를 학습하기위한 프로젝트입니다.

## ERD

<p align="center">
  <img src="https://github.com/XPECTER/dev/assets/8602869/52d5822c-08a4-4b04-a749-c4dad7a635fa">
</p>

## 실행 전 필수사항

종속성을 설치해야합니다. 아래 커맨드를 실행해주세요.

```
$ yarn install
```

## 앱 실행하기

```
# 일반 실행
yarn run start

# Watch 모드
yarn run start:dev
```

## 주의사항

`.env` 파일이 없습니다. 환경변수가 반드시 필요하니 설정해주세요.

## 앞으로 추가할 목록

1. E2E test라도 추가해서 실패하면 ECR에 이미지 push 못하게 설정하기

2. 포인트 모듈 구현

3. 결제 모듈 구현

4. refresh 테이블 구현

5. logger 붙이기(winston)

6. swagger 설정하기

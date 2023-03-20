# Go-To-Study (개인 프로젝트)

## 💻 프로젝트 소개

고투스는 Go To Study의 줄임말로 회원들이 커뮤니케이션을 통해 궁금한 것을 글을 통해 작성하고 정보를 공유하는 스터디 커뮤니티 사이트입니다.

## ⏰ 개발 기간

23.02.25 - 23.03.20

## ⚙️개발 환경

Library: React(18.0.27)
Framework: NodeJs Express(4.18.2)
Database: Mysql(8.0.32)
IDE: Visual Studio Code(1.76.2)

## 📌주요 기능

로그인

- DB값 검증
- JWT를 이용하여 Access Token & Refresh Token 발급
- 유효 기간이 지남에 따라 Refresh Token으로 인해 Access Token 재발급

회원가입

- ID 중복 체크

마이 페이지

- 회원 정보 변경 (닉네임)
- 회원 탈퇴

게시물

- 게시물 작성, 읽기, 수정, 삭제 (CRUD)
- 게시물 추천 기능
- 게시물 즐겨찾기 기능
- 댓글 기능
- 대댓글 기능
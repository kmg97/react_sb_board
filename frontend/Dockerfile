# 첫 번째 스테이지: Node.js 애플리케이션 빌드
# 가져올 이미지를 정의
FROM node:18 as build

# 경로 설정하기
WORKDIR /app

# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json .

# 명령어 실행 (의존성 설치)
RUN npm install

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# 각각의 명령어들은 한줄 한줄씩 캐싱되어 실행된다.
# package.json의 내용은 자주 바뀌진 않을 거지만
# 소스 코드는 자주 바뀌는데
# npm install과 COPY . . 를 동시에 수행하면
# 소스 코드가 조금 달라질때도 항상 npm install을 수행해서 리소스가 낭비된다.

# 애플리케이션 빌드
RUN npm run build

# 두 번째 스테이지: Nginx를 사용하여 애플리케이션 실행
# 가져올 이미지를 정의
FROM nginx:stable-alpine

# 첫 번째 스테이지에서 빌드한 결과물을 /usr/share/nginx/html로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 기본 nginx 설정 파일 삭제 (custom 설정과 충돌 방지)
RUN rm /etc/nginx/conf.d/default.conf

# custom 설정 파일을 컨테이너 내부로 복사
COPY nginx/nginx.conf /etc/nginx/conf.d

# 컨테이너의 80번 포트를 열어줌
EXPOSE 80

# nginx 서버 실행 및 백그라운드로 동작
CMD ["nginx", "-g", "daemon off;"]
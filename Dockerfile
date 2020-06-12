# timeflow-admin-gui-react

FROM node:alpine
WORKDIR /react-app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build



FROM nginx:alpine
COPY nginx.conf /etc/nginx/
EXPOSE 8001
COPY build/* /usr/share/nginx/html/

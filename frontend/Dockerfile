FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]

# RUN npm ci

# RUN npm run build

# FROM nginx:1.25-alpine

# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
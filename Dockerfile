# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências
COPY package.json package-lock.json ./
RUN npm install

# Copia o projeto
COPY . .

# Garante Expo CLI
RUN npm install -g expo-cli

# Build para web
RUN npx expo export --platform web

# ---------- Stage 2: Production ----------
FROM nginx:alpine

# Remove config default
RUN rm /etc/nginx/conf.d/default.conf

# Copia config SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia build do Expo
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

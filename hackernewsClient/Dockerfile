# Використовуємо офіційний образ Node.js
FROM node:latest

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо package.json та package-lock.json у робочу директорію
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту додатку у робочу директорію
COPY . .

# Запускаємо додаток Next.js
CMD ["npm", "run", "dev"]

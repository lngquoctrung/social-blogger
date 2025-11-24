# Sử dụng phiên bản Node.js mới nhất
FROM node:18

WORKDIR /app

# Copy package.json và package-lock.json trước để cài đặt dependencies
COPY package*.json ./

# Sử dụng bộ nhớ đệm cho các package đã cài đặt trước đó
RUN npm install

# Copy toàn bộ mã nguồn còn lại sau khi đã cài dependencies
COPY . .

EXPOSE 5050
CMD ["npm", "start"]

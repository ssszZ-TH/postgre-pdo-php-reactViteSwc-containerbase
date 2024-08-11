# เริ่มจาก Node.js image
FROM node:18-alpine

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดเข้าใน container
COPY . .

# สร้าง build ของแอป
RUN npm run build

# ระบุพอร์ตที่ใช้
EXPOSE 4173

# คำสั่งที่จะรันเมื่อ container เริ่มทำงาน
CMD ["npm", "run", "preview"]

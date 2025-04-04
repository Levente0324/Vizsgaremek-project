<h1 align="center">🌐 Vizsgaremek Projekt 🌐</h1>

# ❗Fontos tudnivalók

Ez a projekt egy autóbérlő webalkalmazás, amelyet csapatban fejlesztettünk. Az alkalmazás lehetővé teszi a felhasználók számára, hogy autók között böngésszenek, foglaljanak és kezeljék bérléseiket egy modern, felhasználóbarát felületen. A projekt célja egy teljeskörű bérlési rendszer létrehozása, amely magában foglalja a backend és frontend technológiák használatát.

# 💻 Használt technológiák

- ![Next JS](https://img.shields.io/badge/NextJS-4c4c4d?style=for-the-badge&logo=next.js&logoColor=white)
- ![Nest JS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-21a690?style=for-the-badge&logo=Prisma&logoColor=white)
- ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-690000.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

# 🔎 Hogyan indítsd el

Kövesd az alábbi lépéseket ahhoz, hogy el tudd indítani a projektet:

### _Backend_

- Lépj be a backend mappába
  ```sh
  cd back
  ```
- NPM telepítés

  ```sh
  npm install
  ```

  Hozz létre egy `.env` fájlt és indítsd el az adatbázist. Csinálj egy <strong>_rentcar_</strong> nevű adatbázist és hagyd üresen. <br>
  Írd bele a `.env` fájlba a kapcsolat URL-t, például: <strong>_DATABASE_URL="mysql://root@localhost:3306/rentcar"_</strong>

- Generáld le a Prisma klienst
  ```sh
  npx prisma generate
  ```
- Seed-eld az adatbázist
  ```sh
  npx prisma migrate dev --name init
  ```
  ```sh
  npx prisma db seed
  ```
  Ha bármilyen hibát írna ki, töröld le a `/prisma/migrations` mappát és próbáld újra.
  <br>
  <br>
  Ezek után már csak el kell indítanod:
- Debug mód
  ```sh
  npm run start:debug
  ```

### _Frontend_

Nyiss meg egy új _terminál_-t (A _backend_-et hagyd futni a háttérbe)

- Lépj be a frontend mappába
  ```sh
  cd front
  ```
- NPM telepítés
  ```sh
  npm install
  ```
- Indítsd el
  ```sh
  npm run dev
  ```

<br>

Ha fut a _Backend_ és a _Frontend_ is, akkor menj fel a <strong>_[https://localhost:8080](https://localhost:8080)_</strong> oldalra, és látnod kellene a webalkalmazást.

<br>

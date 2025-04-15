<div align="center">

# 🌐 **Vizsgaremek Projekt** 🌐

</div>

# ❗Fontos tudnivalók

Ez a projekt egy autóbérlő webalkalmazás, amelyet csapatban fejlesztettünk. Az alkalmazás lehetővé teszi a felhasználók számára, hogy autók között böngésszenek, foglaljanak és kezeljék bérléseiket egy modern, felhasználóbarát felületen. A projekt célja egy teljeskörű bérlési rendszer létrehozása, amely magában foglalja a mobil, backend és frontend technológiák használatát.

# 💻 Használt technológiák

### **Web:**

- ![Next JS](https://img.shields.io/badge/NextJS-4c4c4d?style=for-the-badge&logo=next.js&logoColor=white)
- ![Nest JS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-21a690?style=for-the-badge&logo=Prisma&logoColor=white)
- ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-690000.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### **Mobil:**

- ![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
- ![Dart](https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white)

# 📦 Előfeltételek

- Node.js (v20.x vagy újabb)
- MySQL (8.0 vagy újabb)
- npm (v10.x vagy újabb)
- Flutter SDK (3.7.2)
- Dart SDK
- Android Studio vagy VS Code Flutter bővítményekkel

# 🔎 Hogyan indítsd el

Először is klónozd le a repót a gépedre aztán nyisd meg: <strong>`git clone <url>`</strong>

## **_Backend_**

- Lépj be a backend mappába
  ```sh
  cd back
  ```
- NPM telepítés

  ```sh
  npm install
  ```

  Hozz létre egy `.env` fájlt a _back_ mappában és indítsd el a MySQL adatbázisod (XAMPP). <br>
  Csinálj egy <strong>_rentcar_</strong> nevű adatbázist és hagyd üresen. <br>
  Írd bele a `.env` fájlba a kapcsolat URL-t, például: <strong>_`DATABASE_URL="mysql://root@localhost:3306/rentcar"`_</strong>

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

## **_Frontend_**

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

Ha fut a _Backend_ és a _Frontend_ is, akkor menj fel a <strong>_[http://localhost:8080](http://localhost:8080)_</strong> oldalra, és látnod kellene a webalkalmazást.

## **_Mobil_**

Kövesd az alábbi lépéseket a mobil app futtatásához:

1. Lépj be a mobil mappába

   ```sh
   cd mobil
   ```

2. Függőségek telepítése

   ```sh
   flutter pub get
   ```

3. Alkalmazás indítása
   ```sh
   flutter run
   ```

<br>

# 🛠️ Admin felület elérése

A seed-elés után az adatbázisban autómatikusan létre lesz hozva egy admin fiók, ahova az alábbi email és jelszóval tudsz belépni: <br>

### **Email:** _admin@example.com_

### **Jelszó:** _adminpass_ <br>

Ezek után fent a navbar-ban a fiók ikon mellet meg kell jelennie az **_"Admin Page"_** button-nek, amivel el tudsz jutni az admin felülethez.

---

### _Támogatott platformok_

- Android/iOS
- Windows/macOS/Linux
- Web

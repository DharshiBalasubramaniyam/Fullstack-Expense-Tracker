<h1 align="center">🌟 My Wallet - Expense tracking app 🌟</h1>

<p align="center">
  <img alt="Static Badge" src="https://img.shields.io/badge/Spring%20Boot-darkgreen?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/React.js-blue?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/mysql-red?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/css-purple?style=for-the-badge">
  <img alt="Static Badge" src="https://img.shields.io/badge/jwt-orange?style=for-the-badge">
</p>

## Table of contents

1. [Descripiton](#description)
2. [How to run?](#how-to-run)
3. [Screenshots](#screenshots)

## Description

- Developed a full-stack expense tracking web application using Spring Boot, React.js, and MySQL, facilitating seamless management of day-to-day finances.
- Implemented multi-role functionality with user authentication, enabling secure access for both users and administrators, with features such as sign-in, sign-up, password reset, and email verification.
- Developed intuitive user dashboards, transaction management, upcoming/recurring transactions tracking, monthly summaries, and statistics, budget management.
- Developed categories, users and transactions management for administrators.
- Implemented management capabilities including search, filter and pagination.

## How to run?

### Step 1: Fork and Clone the Repository

1. Fork the repository to your GitHub account.

2. Clone the forked repository to your local machine.

```sh
git clone https://github.com/<your-username>/Fullstack-Expense-Tracker
```

### Step 2: Setting up e-mail and database configurations

- Configure the following credentials in the [`application.properties`](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/blob/main/backend/src/main/resources/application.properties) file.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/YOUR_DATABASE_NAME
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.mail.username=YOUR_USERNAME
spring.mail.password=YOUR_PASSWORD
```

### Step 3: Run the backend.

- Run the backend application. It will automatically create the required tables. 
- Add some custom data manually in the [categories](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/blob/7ecea71aaeca4e26a4aafd02fd602abe4d9da67d/backend/src/main/java/com/fullStack/expenseTracker/models/Category.java#L13) table for both [type](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/blob/7ecea71aaeca4e26a4aafd02fd602abe4d9da67d/backend/src/main/java/com/fullStack/expenseTracker/models/TransactionType.java#L13) `expense` and `income`.
- To start as admin, Insert a new user manually with role admin in [`users`](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/blob/7ecea71aaeca4e26a4aafd02fd602abe4d9da67d/backend/src/main/java/com/fullStack/expenseTracker/models/User.java#L20) table.

### Step 4: Run the frontend

1. Navigate to [frontend direcory](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/tree/main/frontend).
```
cd ./frontend
```

2. Install dependencies.
```
npm install
```

3. Run the app.
```
npm start
```

Access the application at [`http://localhost:3000/`](http://localhost:3000/).
To get started create a new account using your email.

## Screenshots

![Screenshot 2024-04-18 091658](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/7637b70d-8b9f-485e-84f6-bce3c940f3f2)
![Screenshot 2024-04-18 091720](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/f58e2e13-7db4-439a-b371-ce9b6e5838c7)
![Screenshot 2024-04-18 091743](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/dbcfdbd2-d515-4197-b5ff-11ba0aed2dcf)
![Screenshot 2024-04-18 091803](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/9d271a52-1444-4739-afe4-f51aa616d55e)

Users's stuff

![Screenshot 2024-04-22 153501](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/a8e6d65b-626f-493e-922d-dd7c26d8294c)
![Screenshot 2024-04-22 153536](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/ed01d05e-cead-43c5-8959-6b64615fee43)
![Screenshot 2024-04-22 153556](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/40ab0b82-b38d-4a19-9044-d226e3f345ed)
![Screenshot 2024-04-22 153622](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/8f8bef4e-6735-464f-a180-f2bc17633b1b)
![Screenshot 2024-04-22 154204](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/994d23f0-e7c1-42a6-9571-44fd4353396e)
![Screenshot 2024-04-22 154244](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/7e43cb13-6187-4af0-8900-66afef908f66)
![Screenshot 2024-04-22 154301](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/1b308447-f5ef-4f26-826b-0e9f42e5914f)



Admin's stuff

![Screenshot 2024-04-18 092245](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/06454812-f542-4404-b9bf-e7d9b96b043d)
![Screenshot 2024-04-18 092306](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/a024fadc-5f6a-4e3f-96f6-f38dd1f6b477)
![Screenshot 2024-04-18 092325](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/5e93095e-f4be-4245-b3a4-8653cd9fea27)
![Screenshot 2024-04-18 092342](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/5d40498e-ec3b-4559-ba15-efdf9c248d22)
![Screenshot 2024-04-18 092805](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/aa94d2da-0080-421b-a191-d2ff9fb4472f)
![Screenshot 2024-04-18 092822](https://github.com/DharshiBalasubramaniyam/Fullstack-Expense-Tracker/assets/139672976/6cb49c2c-8317-4cec-ad16-b9496d97b16f)




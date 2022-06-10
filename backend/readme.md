
## Introduction
A backend of my Pizzaria Project

## Setupping

To setup this project run

clone repo 
```bash
git clone https://github.com/freezywt/Pizzaria.git
```

Open backend project and install dependencies :
```bash
    cd /backend && npm install
```

Installing prisma : 

```bash
    npm install prisma --save-dev
```

Migrating Database to postgres :

```bash
    npx prisma migrate dev --name init
```

Configuring project : 

```
        cd /src/middlewares && code isAuthenticated.ts 
        edit line 24 to you md5hash

        cd /prisma && code schema.prisma
        change line 8 to your postgresql url

```
## API Reference

#### Users :

#### Register User

```http
  POST /users
```

| Json      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{name, email, password}` | `json` | For register user in database |

#### Login User

```http
  POST /session
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `{email, password}` | `json` | For login user in database |


#### Details of User

```http
  POST /session
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token` | `bearer` | Details of User in database |

#### Category :


## Features

- List Users
- Register User
- Login User
- List Categories
- Add Categories
- Create Product
- List Product per category
- Create Order
- Delete Order
- List Order
- List Order Details
- Finish Order


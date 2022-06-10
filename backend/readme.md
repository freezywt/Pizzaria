
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

| Parameter      | Type    
| :-------- | :------- 
| `{name, email, password}` | `json` |

#### Login User

```http
  POST /session
```

| Parameter | Type    
| :-------- | :------- 
| `{email, password}` | `json` 


#### Details of User

```http
  GET /session
```

| Parameter | Type     
| :-------- | :-------
| `token` | `bearer` 

#### Category :

#### Create Category

```http
  POST /category
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
| `{name}` | `json` 


#### List Category

```http
  GET /category
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 

#### Product :

#### Register Product

```http
  POST /product
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
| `{name, price, description, file, category_id}` | `multipart` |

#### List Product

```http
  GET /category/product
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 


#### Order :

#### Create Order

```http
  POST /order
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
|`{table, name}`|`json`|

#### Delete Order

```http
  DELETE /order
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
|`order_id`|`query`|

#### Send Order

```http
  PUT /order/send
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
|`order_id`|`json`|

#### Add item to Order

```http
  POST /order/add
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
|`{order_id, product_id, amount}`|`json`|

#### Remove item to Order

```http
  DELETE /order/remove
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
|`item_id`|`query`|

#### Finish Order

```http
  PUT /order/finish
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 
|`order_id`|`query`|

#### List Order

```http
  get /orders
```

| Parameter | Type     
| :-------- | :------- 
| `token` | `bearer` 






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


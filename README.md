# Getting Started with node server App

## Installation

Enter to the server folder

```bash
cd server
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be cyan with the message:

`server run on: http://localhost:8181/`

And if there are no login errors you should see the message painted in cyan:

`connected to MongoDb!`

### Available Routes

### User

#### Register a new user

POST /http://localhost:8181/api/auth/users

request:

- firstName:
  -- string
  -- required
  -- min 2
  -- max 255
- lastName:
  -- string
  -- required
  -- min 2
  -- max 255
- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 6
  -- max 1024
- imageUrl:
  -- string
  -- min 6
  -- max 1024
- imageAlt:
  -- string
  -- min 6
  -- max 256
- city:
  -- string
  -- required
  -- min 2
  -- max 256
- street:
  -- string
  -- required
  -- min 2
  -- max 256
- houseNumber:
  -- string
  -- required
  -- min 1
  -- max 256
  -recommendations:
  -- string
  -- min 1
  -- max 256
- biz:
  -- boolean
  -- true/false

#### Login a user

POST /http://localhost:8181/api/auth/users/login

request:

- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 6
  -- max 1024

#### Get all users

GET /http://localhost:8181/api/auth/users

#### For Information about a user

GET /http://localhost:8181/api/auth/users/:id

request:

- must provide token
  \*\* must be registered as admin

You will need to provide a token to get an answer from this api

#### For User information update/edit

PUT /http://localhost:8181/api/auth/users/:id

request:

- must provide token
  \*\* must be registered as admin

- firstName:
  -- string
  -- required
  -- min 2
  -- max 255
- lastName:
  -- string
  -- required
  -- min 2
  -- max 255
- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 6
  -- max 1024
- imageUrl:
  -- string
  -- min 6
  -- max 1024
- imageAlt:
  -- string
  -- min 6
  -- max 256
- city:
  -- string
  -- required
  -- min 2
  -- max 256
- street:
  -- string
  -- required
  -- min 2
  -- max 256
- houseNumber:
  -- string
  -- required
  -- min 1
  -- max 256
  -recommendations:
  -- string
  -- min 1
  -- max 256
- biz:
  -- boolean
  -- true/false

You will need to provide a token to get an answer from this api
or You need to be admin

### Change isBusiness status

PATCH /http://localhost:8181/api/auth/users/:id

must provide token
\*\* must be admin

### Delete user

DELETE /http://localhost:8181/api/auth/users/:id

- must provide token
  \*\* must be registered as admin

You will need to provide a token to get an answer from this api

### Adding a recommendation

patch /http://localhost:8181/api/auth/users/contact/:id

-recommendations:
-- string
-- min 1
-- max 256

- must provide token
  \*\* must be registered
  You will need to provide a token to get an answer from this api

### Cards:

#### To receive all cards

GET /http://localhost:8181/api/cards

#### To receive all cards of the registered user

GET /http://localhost:8181/api/cards/my-cards

- must provide token

#### To get a specific card

GET/ http://localhost:8181/api/cards/:id

id of the card is required

You will need to provide a token to get an answer from this api

#### To create a new card

POST /http://localhost:8181/api/cards

request:

- must provide token
  \*\* must admin user

* title:
  -- string
  -- required
  -- min 2
  -- max 256
* description:
  -- string
  -- required
  -- min 2
  -- max 1024
  - imageUrl:
    -- string
    -- min 6
    -- max 1024

- imageAlt:
  -- string
  -- min 6
  -- max 256
  - price:
    -- number
    -- min 1
    -- max 256

* category:
  -- string
  -- min 2
  -- max 256

  #### To update a business card

PUT/ http://localhost:8181/api/cards/:id

request:

- must provide token
  \*\* must admin user

* title:
  -- string
  -- required
  -- min 2
  -- max 256
* description:
  -- string
  -- required
  -- min 2
  -- max 1024
  - imageUrl:
    -- string
    -- min 6
    -- max 1024

- imageAlt:
  -- string
  -- min 6
  -- max 256
  - price:
    -- number
    -- min 1
    -- max 256

* category:
  -- string
  -- min 2
  -- max 256

  You will need to provide a token to get an answer from this api

  ### To update card like

  PATCH http://localhost:8181/api/cards/like/:id

- must provide token

#### To delete a card

DELETE / http://localhost:8181/api/cards/:id

- must provide token
  \*\* must admin user
  You will need to provide a token to get an answer from this api

### Orders

#### To receive all Orders

GET /http://localhost:8181/api/orders

- must provide token
  \*\* must admin user

  #### To receive My order of registered user

  GET /http://localhost:8181/api/orders/my-orders

- must provide token

#### To get a specific Order by id

GET/ http://localhost:8181/api/orders/:id

- must provide token
  \*\* must be registered as admin

id of the Order is required

#### You will need to provide a token to get an answer from this api

#### To create a new order

POST /http://localhost:8181/api/cards

request:

- must provide token
  \*\* must admin user

* name:
  -- string
  -- required
  -- min 2
  -- max 256
* phone:
  -- string
  -- required
  -- min 10
  -- max 10
* email:
  -- string
  -- min 6
  -- max 1024
* imageAlt:
  -- string
  -- min 6
  -- max 256
* city:
  -- string
  -- min 2
  -- max 256
* street:
  -- string
  -- min 2
  -- max 256
* houseNumber:
  -- number
  -- min 2
  -- max 256
* takeAway:
  -- boolean
  -- true/false

#### To delete a order

DELETE / http://localhost:8181/api/orders/:id

- must provide token
  \*\* must admin user
  You will need to provide a token to get an answer from this api

#### To get order FindOne dy user id

GET/ http://localhost:8181/api/orders/my-order-findOne/:id

- must provide token
  -Returns id of last order

#### To Get all order details dy user id

GET/http://localhost:8181/api/orders/my-allorder-findOne

- must provide token
- returns any private order

#### To Update tickets in the order

PATCH / http://localhost:8181/api/orders/menuOrder/:id

- must provide token

#### Change order status

PATCH /http://localhost:8181/api/orders/orderStatus/:id

- must provide token
  \*\* must admin user

### Order Tabel:

#### To receive all orders-table

GET /http://localhost:8181/api/ordersTable

- must provide token
  \*\* must admin user

#### To receive all my order-table of the registered user

GET /http://localhost:8181/api/ordersTable/my-orders

- must provide token

#### To get a specific order-table

GET/ http://localhost:8181/api/cards/:id

id of the order-table is required

- must provide token
  \*\* must be registered as admin

  #### To create a order-table

POST /http://localhost:8181/api/ordersTable

request:

- must provide token

* name:
  -- string
  -- required
  -- min 2
  -- max 256
* phone:
  -- string
  -- required
  -- min 10
  -- max 10
* date:
  -- string
  -- min 2
  -- max 256
* time:
  -- string
  -- min 2
  -- max 6
* numOfPeople:
  -- string
  -- min 
  -- max 10

#### To delete a order-table

DELETE /http://localhost:8181/api/ordersTable/:id

- must provide token
  \*\* must admin user
  You will need to provide a token to get an answer from this api

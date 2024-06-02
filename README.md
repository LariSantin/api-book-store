# Book Store

book store api is used for a book store to control books. The api allow the user register clients, books, and which book each client bought.


Requirements:
 - one book can have many copies
 - the quantity of book should decrease with each sale.
 

Dependencies:
express, prisma ORM, bcrypt, jsonwebtoken, lodash, dotenv

- next features: 
financial

Initialize project:

Routes:



generate migration:
```
 npx prisma migrate dev --name namemigration 
```

run: yarn start 

run coverage test: npm test -- --coverage

Create postgres container:

```
sudo docker network create --driver bridge postgres-network

sudo docker run --name postgres --network=postgres-network -e "POSTGRES_PASSWORD=postgres" -p 5432:5432 -v /home/larissa/Documentos/projetoso:/var/lib/postgresql/data -d postgres 

sudo docker run --name pgadmin --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=lari_santin@hotmail.com" -e "PGADMIN_DEFAULT_PASSWORD=pgadmin" -d dpage/pgadmin4
```

![alt text](image.png)

Structure:
```
api-book-store/
│
├── src/
│   ├── controllers/
|   |   ├── bookcustomer.controller.ts
|   |   ├── customer.controller.ts
|   |   ├── user.controller.ts 
│   │   └── book.controller.ts
│   ├── services/
|   |   ├── book.service.ts
|   |   ├── bookcustomer.service.ts
|   |   ├── customer.service.ts
│   │   └── user.service.ts
│   ├── repositories/
|   |   ├── book.repository.ts
|   |   ├── bookcustomer.repository.ts
|   |   ├── customer.repository.ts
│   │   └── user.repository.ts
│   ├── routes/
|   |   ├── book.routes.ts
|   |   ├── bookcustomer.routes.ts
|   |   ├── customer.routes.ts
|   |   ├── index.ts
│   │   └── user.routes.ts
│   ├── middlewares/
|   |   ├── auth.ts
│   │   └── errors.ts
│   └── exceptions/
|       ├── http.exception.ts
|       ├── internal-server-error.ts
|       ├── unauthorized.ts
│       └── bad-requests.ts
├── __tests__/
│   ├── controllers/
|   |   ├── bookcustomer.controller.test.ts
|   |   ├── customer.controller.test.ts
|   |   ├── user.controller.test.ts 
│   │   └── book.controller.test.ts
│   └──  services/
|       ├── book.service.test.ts
|       ├── bookcustomer.service.test.ts
|       ├── customer.service.test.ts
│       └── user.service.test.ts
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json

```

// [Note: if you use any reanational database you should use [npx prisma migrate]
// 	but if you use mongoDB you should use [npx prisma generate]]

// npm install prisma --save-dev
// npm i @prisma/client
// npx prisma init       //it will create schema.prisma & .env
// npx prisma generate   //or create file: prisma/indes.ts
// npx prisma db push

// npx prisma studio   //for prisma studio



// --------------------utils\prismadb.js----------------------

import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export const prismadb = client


// --------------------prisma\schema.prisma----------------------

generator client {
    provider = "prisma-client-js"
  }
  
  datasource db {
    provider = "mongodb"
    url      = env("DATABASE_URL")
  }
  
  // next-auth prisma adapter---------------------
  model Account {
    id                String  @id @default(cuid()) @map("_id")
    userId            String
    type              String
    provider          String
    providerAccountId String
    refresh_token     String?
    access_token      String?
    expires_at        Int?
    token_type        String?
    scope             String?
    id_token          String?
    session_state     String?
  
    user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
    @@unique([provider, providerAccountId])
  }
  
  model Session {
    id           String   @id @default(cuid()) @map("_id")
    sessionToken String   @unique
    userId       String
    expires      DateTime
    user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  }
  
  model User {
    id            String    @id @default(cuid()) @map("_id")
    name          String?
    email         String    @unique
    emailVerified DateTime?
    image         String?
    accounts      Account[]
    sessions      Session[]
    Post          Post[]
    Comment       Comment[]
  }
  
  model VerificationToken {
    identifier String   @id @map("_id")
    token      String   @unique
    expires    DateTime
  
    @@unique([identifier, token])
  }
  
  // db model--------------------------//
  model Category {
    id    String  @id @default(cuid()) @map("_id")
    slug  String  @unique
    title String
    img   String?
    Posts Post[]
  }
  
  model Post {
    id        String    @id @default(cuid()) @map("_id")
    createdAt DateTime  @default(now())
    slug      String    @unique
    title     String
    desc      String
    img       String?
    views     Int       @default(0)
    catSlug   String
    cat       Category  @relation(fields: [catSlug], references: [slug])
    userEmail String
    user      User      @relation(fields: [userEmail], references: [email])
    comments  Comment[]
  }
  
  model Comment {
    id        String   @id @default(cuid()) @map("_id")
    createdAt DateTime @default(now())
    desc      String
    userEmail String
    user      User     @relation(fields: [userEmail], references: [email])
    postSlug  String
    post      Post     @relation(fields: [postSlug], references: [slug])
  }
  
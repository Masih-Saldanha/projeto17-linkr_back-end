CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
<<<<<<< HEAD:tables.sql
	"password" TEXT NOT NULL,
=======
	"password" text NOT NULL,
>>>>>>> main:src/config/tables.sql
	"username" varchar(100) NOT NULL,
	"pictureUrl" text NOT NULL
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL PRIMARY KEY,
	"token" TEXT NOT NULL UNIQUE,
	"userId" integer NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"description" varchar(140),
	"link" TEXT NOT NULL,
	"userId" integer NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "likes" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"postId" integer NOT NULL REFERENCES "posts"("id")
);

CREATE TABLE "hashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"hashtag" varchar(140) NOT NULL,
	"postId" integer NOT NULL REFERENCES "posts"("id")
);
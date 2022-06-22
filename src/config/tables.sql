CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
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
	"id" SERIAL NOT NULL PRIMARY KEY,
	"hashtag" VARCHAR(140) NOT NULL,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id")
);

CREATE TABLE "comments" (
    "id" serial NOT NULL PRIMARY KEY,
	"comment" VARCHAR(280) NOT NULL,
	"postId" INTEGER NOT NULL REFERENCES "posts"("id"),
    "userId" integer NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "followers" (
    "id" serial NOT NULL PRIMARY KEY,
	"followerId" INTEGER NOT NULL REFERENCES "users"("id"),
    "followedId" integer NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "reposts" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"postId" INTEGER NOT NULL REFERENCES "posts"("id")
);
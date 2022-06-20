import db from '../config/db.js';

async function createPost(description, link, userId) {
  return db.query(`
        INSERT INTO posts(description, link, "userId")
        VALUES ($1, $2, $3) RETURNING id;
    `, [description, link, userId]);
}

async function getPostsByUserId(userId) {
  // TODO: adicionar com os hashtags?
  return db.query(`
  SELECT p.id as "postId", p.description, p.link, COUNT(l.*) as likes
  FROM posts p
  LEFT JOIN likes l ON l."postId" = p.id
  WHERE p."userId" = $1
  GROUP BY p.id
  LIMIT 20
    `, [userId]);
}

async function searchPostById(id) {
  return db.query('SELECT * FROM posts WHERE id = $1', [id]);
}

async function getPostsList(page) {
  return db.query(`
        SELECT
            users.username,
            users.id as "userId",
            users."pictureUrl" as "userPicture",
            posts.description,
            posts.link,
            posts.id as "postId",
            COUNT(likes."postId") as likes
        FROM posts
        JOIN users ON posts."userId" = users.id
        LEFT JOIN likes ON posts.id = likes."postId"
        GROUP BY 
            users.username,
            users.id,
            users."pictureUrl",
            users.id,
            posts.description,
            posts.link,
            posts.id
        ORDER BY posts.id DESC
        LIMIT 20
        OFFSET $1;
    `, [page]);
}

async function getPostsByHashtag(hashtag) {
  return db.query(`
    SELECT 
      P.id AS "postId", 
      P.description, 
      P.link, P."userId", 
      U.username, 
      U."pictureUrl", 
      count(L.id) AS "likesPost"
    FROM posts P 
    INNER JOIN users U ON P."userId" = U.id
    LEFT JOIN likes L ON P.id = L."postId" AND U.id = L."userId" 
    WHERE P.id IN (SELECT "postId" FROM hashtags WHERE hashtag = $1)
    GROUP BY 
      P.id, 
      P.description, 
      P.link, 
      P."userId", 
      U.username, 
      U."pictureUrl"
    ORDER BY P.id DESC
  `, [hashtag]);
}

async function editPostByPostId(description, postId, userId) {
  return db.query(`
    UPDATE posts
    SET description = $1
    WHERE id = $2 AND "userId" = $3;
  `, [description, postId, userId]);
}

async function searchPostId(postId, userId) {
  return db.query(`
    SELECT * 
    FROM posts
    WHERE id = $1 AND "userId" = $2;
  `, [postId, userId]);
}

async function deletePostById(postId, userId) {
  return db.query(`
    DELETE FROM posts
    WHERE id = $1 AND "userId" = $2;
  `, [postId, userId]);
}

async function deleteLikesByPostId(postId) {
  return db.query(`
    DELETE FROM likes
    WHERE "postId" = $1;
  `, [postId]);
}

async function deleteHashtagsByPostId(postId) {
  return db.query(`
    DELETE FROM hashtags
    WHERE "postId" = $1;
  `, [postId]);
}

const postRepository = {
  createPost,
  searchPostById,
  getPostsList,
  getPostsByUserId,
  getPostsByHashtag,
  editPostByPostId,
  searchPostId,
  deletePostById,
  deleteLikesByPostId,
  deleteHashtagsByPostId
};

export default postRepository;

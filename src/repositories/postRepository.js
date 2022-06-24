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
    SELECT 
      p.id as "postId", 
      p.description, 
      p.link, 
      users.id as "userId",
      COUNT(reposts."postId") as reposts, 
      COUNT(l.*) as likes
    FROM posts p
    LEFT JOIN likes l ON l."postId" = p.id
    LEFT JOIN reposts ON p.id = reposts."postId"
    JOIN users ON p."userId" = users.id
    WHERE p."userId" = $1
    GROUP BY 
      p.id,
      users.id
    ORDER BY p.id DESC
    LIMIT 20
    `, [userId]);
}

async function searchPostById(id) {
  return db.query('SELECT * FROM posts WHERE id = $1', [id]);
}

async function getPostsList(followerId, page) {
  return db.query(`
    SELECT 
      ufollowed.username,
      ufollowed.id as "userId",
      ufollowed."pictureUrl" as "userPicture",
      posts.description,
      posts.link,
      posts.id as "postId",
      COUNT(reposts."postId") as reposts,
      COUNT(likes."postId") as likes
    FROM followers
    JOIN users ufollower ON followers."followerId" = ufollower.id
    JOIN users ufollowed ON followers."followedId" = ufollowed.id
    JOIN posts ON posts."userId" = ufollowed.id
    LEFT JOIN likes ON posts.id = likes."postId"
    LEFT JOIN reposts ON posts.id = reposts."postId"
    WHERE ufollower.id = $1
    GROUP BY 
      ufollowed.username,
      ufollowed.id,
      ufollowed."pictureUrl",
      ufollowed.id,
      posts.description,
      posts.link,
      posts.id
    ORDER BY posts.id DESC
    LIMIT 10
    OFFSET $2;
    `, [followerId, page]);
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

async function searchFollowerId(followerId) {
  return db.query(`
    SELECT * FROM followers
    WHERE followers."followerId" = $1;
  `, [followerId])
}

async function insertNewRepost(userId, postId) {
  return db.query(`
    INSERT INTO reposts("userId", "postId")
    VALUES($1, $2);
  `, [userId, postId]);
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
  deleteHashtagsByPostId,
  searchFollowerId,
  insertNewRepost
};

export default postRepository;

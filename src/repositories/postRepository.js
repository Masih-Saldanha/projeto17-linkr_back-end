import db from '../config/db.js';

async function createPost(description, link, userId) {
  return db.query(`
        INSERT INTO posts(description, link, "userId")
        VALUES ($1, $2, $3);
    `, [description, link, userId]);
}

async function getPostsByUserId(userId) {
  // TODO: testar a query com dados no banco
  // TODO: adicionar com os hashtags
  return db.query(`
    SELECT p.*, COUNT(l.*) as "postLikes" 
    FROM posts p
    JOIN likes l ON l."userId" = p."userId"
    WHERE p."userId" = $1 
    GROUP BY p.id, "postLikes"
    `, [userId]);
}

async function searchPostById(id) {
  return db.query('SELECT * FROM posts WHERE id = $1', [id]);
}

async function getPostsList(page) {
  return db.query(`
        SELECT
            users.username,
            users."pictureUrl" as "userPicture",
            posts.description,
            posts.link,
            COUNT(likes."postId") as likes
        FROM posts
        JOIN users ON posts."userId" = users.id
        LEFT JOIN likes ON posts.id = likes."postId"
        GROUP BY 
            users.username,
            users."pictureUrl",
            posts.description,
            posts.link,
            posts.id
        ORDER BY posts.id DESC
        LIMIT 20
        OFFSET $1;
    `, [page]);
}

const postRepository = {
  createPost,
  searchPostById,
  getPostsList,
  getPostsByUserId,
};

export default postRepository;

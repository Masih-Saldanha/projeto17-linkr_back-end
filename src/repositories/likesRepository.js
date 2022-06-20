import db from '../config/db.js';

async function insertLike(userId, postId) {
  return db.query('INSERT INTO likes ("userId", "postId") VALUES ($1, $2)', [userId, postId]);
}

async function deleteLike(userId, postId) {
  return db.query('DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2', [userId, postId]);
}

async function checkIfPostIsLiked(userId, postId) {
    return db.query('SELECT id FROM likes WHERE "userId" = $1 AND "postId" = $2', [userId, postId]);
}

async function getUsers(idPost) {
    return db.query(`
    SELECT us.username, us.id as "userId"
    FROM likes l
    JOIN users us ON l."userId" = us.id
    JOIN posts p ON l."postId" = p.id
    WHERE l."postId" = $1
    GROUP BY us.username, us.id
    `, [idPost]);
}
const likesRepository = {
  insertLike,
  deleteLike,
  checkIfPostIsLiked,
  getUsers
};

export default likesRepository;

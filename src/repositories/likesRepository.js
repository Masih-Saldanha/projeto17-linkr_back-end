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

const likesRepository = {
  insertLike,
  deleteLike,
  checkIfPostIsLiked
};

export default likesRepository;

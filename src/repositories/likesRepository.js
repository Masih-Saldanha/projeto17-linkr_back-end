import db from "./../config/db.js";

async function insertLike(userId, postId) {
    return db.query('INSERT INTO likes ("userId", "postId") VALUES ($1, $2)', [userId, postId]);
}

async function deleteLike(userId, postId) {
    return db.query('DELETE FROM likes WHERE "userId" = $1 AND "postId" = $2', [userId, postId]);
}

const postRepository = {
    insertLike,
    deleteLike
}

export default postRepository;
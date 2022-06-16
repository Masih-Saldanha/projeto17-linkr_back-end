import db from "./../config/db.js";

async function createPost(description, link, userId) {
    return db.query(`
        INSERT INTO posts(description, link, "userId")
        VALUES ($1, $2, $3);
    `, [description, link, userId]);
}

async function getPostsByUserId(userId) {
    //TODO: testar a query com dados no banco
    return db.query(`
    SELECT p.*, COUNT(l.*) as "postLikes" 
    FROM posts p
    JOIN likes l ON l."userId" = p."userId"
    WHERE p."userId" = $1 
    GROUP BY p.id, "postLikes"
    `, [userId]);
}

const postRepository = {
    createPost,
    getPostsByUserId
}

export default postRepository;
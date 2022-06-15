import db from "./../config/db.js";

async function createPost(description, link, userId) {
    return db.query(`
        INSERT INTO posts(description, link, "userId")
        VALUES ($1, $2, $3);
    `, [description, link, userId]);
}

async function searchPostById(id) {
    return db.query('SELECT * FROM posts WHERE id = $1', [id]);
}

const postRepository = {
    createPost,
    searchPostById
}

export default postRepository;
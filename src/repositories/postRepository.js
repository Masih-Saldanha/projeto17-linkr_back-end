import db from "./../config/db.js";

async function createPost(description, link, userId) {
    return db.query(`
        INSERT INTO posts(description, link, "userId")
        VALUES ($1, $2, $3);
    `, [description, link, userId]);
}

const postRepository = {
    createPost
}

export default postRepository;
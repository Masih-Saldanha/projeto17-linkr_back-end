import db from '../db.js';

export async function likePost(req, res) {
    const {idPost} = req.params;

    //TODO: implement jwt validation to get userId and check if its logged

    try {
        const postSearch = await db.query('SELECT * FROM posts WHERE id = $1', [idPost]);

        if (postSearch.rowCount === 0) return res.status(404).send('Post não encontrado');

        await db.query('INSERT INTO likes ("userId", "postId") VALUES ($1, $2)', []);
    } catch (e) {
        
    }
}
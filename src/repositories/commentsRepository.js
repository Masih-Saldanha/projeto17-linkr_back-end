// eslint-disable-next-line import/extensions
import db from '../config/db.js';

async function addComment(userId, postId, comment) {
  return db.query(`
    INSERT INTO comments ("userId", "postId", comment) 
    VALUES ($1, $2, $3)`, [userId, postId, comment]);
}

async function getCommentsByPostId(postId) {
  console.log('get normal passou');
  return db.query(`
    SELECT *  FROM comments WHERE "postId" = $1 
    ORDER BY id DESC `, [postId]);
}

async function getQtyCommentsByPostId(postId) {
  console.log('quantidade passou');
  return db.query(`
    SELECT count(id) AS quantity FROM comments WHERE "postId" = $1`, [postId]);
}

const commentsRepository = {
  getCommentsByPostId,
  addComment,
  getQtyCommentsByPostId,
};

export default commentsRepository;

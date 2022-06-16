// eslint-disable-next-line import/extensions
import db from '../config/db.js';

async function getTrendingHashtags() {
  return db.query(`
        SELECT hashtag FROM (
          SELECT hashtag, count(*)            
          FROM hashtags
          GROUP BY hashtag
          ORDER BY 2 DESC
          LIMIT 10 
        ) AS LIST
    `);
}

async function getHashtagsByHashtag(hashtag) {
  return db.query(`
    SELECT 
      H.id as "hashtagId", 
      H.hashtag, 
      H."postId", 
      P.description, 
      P.link, P."userId", 
      U.username, 
      U."pictureUrl", 
      count(L.id) AS "likesPost"
    FROM hashtags H
    INNER JOIN posts P ON H."postId" = P.id
    INNER JOIN users U ON P."userId" = U.id
    LEFT JOIN likes L ON P.id = L."postId" AND U.id = L."userId" 
    WHERE H.hashtag = $1
    GROUP BY 
      H.id, 
      H.hashtag, 
      H."postId", 
      P.description, 
      P.link, 
      P."userId", 
      U.username, 
      U."pictureUrl"
    ORDER BY H."postId" DESC
  `, [hashtag]);
}

const hashtagsRepository = {
  getTrendingHashtags,
  getHashtagsByHashtag,
};

export default hashtagsRepository;

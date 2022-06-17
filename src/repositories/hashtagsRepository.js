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
    SELECT *  FROM hashtags 
    WHERE hashtag = $1
    ORDER BY hashtag DESC
  `, [hashtag]);
}

const hashtagsRepository = {
  getTrendingHashtags,
  getHashtagsByHashtag,
};

export default hashtagsRepository;

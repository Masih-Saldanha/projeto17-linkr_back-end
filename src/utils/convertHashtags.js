/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
export default function convertHashtags(description) {
  let palavra = '';
  let aux = 0;
  const hashtags = [];
  for (let i = 0; i < description.length; i++) {
    palavra = '';
    for (let j = i + 1; j < description.length; j++) {
      if (description[i] === '#' && description[j] !== '#' && description[j] !== ' ') {
        palavra += description[j];
      } else {
        break;
      }
      aux = j;
    }
    if (palavra !== '') hashtags.push(palavra);
    i === aux;
  }
  return hashtags;
}

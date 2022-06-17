import postRepository from '../repositories/postRepository.js';

// FIXME: PRECISA ITERAR description PARA BUSCAR HASHTAGS E
// ENVIAR NA TABELA DE hashtags. FAZER ITERAÇÃO NO MIDDLEWARE.
export async function publishPost(req, res) {
  const { description, link } = req.body;
  const { user } = res.locals;
  const userId = user.id;
  try {
    await postRepository.createPost(description, link, userId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getPosts(req, res) {
  const formatedPostsList = res.locals.formatedPostsList;
  try {
    // FIXME: PODE-SE TENTAR LÓGICA DE PAGINAÇÃO AQUI DEPOIS.
    res.status(200).send(formatedPostsList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

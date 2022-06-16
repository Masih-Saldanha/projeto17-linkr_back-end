import postRepository from "../repositories/postRepository.js";

// FIXME: PRECISA ITERAR description PARA BUSCAR HASHTAGS E
// ENVIAR NA TABELA DE hashtags. FAZER ITERAÇÃO NO MIDDLEWARE.
// PS.: BUSCAR userId POR res.locals NO MIDDLEWARE TOKEN.
export async function publishPost(req, res) {
    const { description, link } = req.body;
    // userId do res.locals
    const userId = 1;
    try {
        await postRepository.createPost(description, link, userId)
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getPosts(req, res) {
    try {
        // FIXME: PODE-SE TENTAR LÓGICA DE PAGINAÇÃO AQUI DEPOIS.
        const { rows: postsList } = await postRepository.getPostsList(0);
        res.status(200).send(postsList);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
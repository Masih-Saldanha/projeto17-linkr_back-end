import urlMetadata from "url-metadata";

import postRepository from "../repositories/postRepository.js";

export async function validateUrlMetadata(req, res, next) {
    try {
        const metadata = await urlMetadata(req.body.link);
        console.log(metadata);

        next();
    } catch (error) {
        console.log(error);
        res.status(400).send("Esse link não é aceito, envie um link válido");
    }
}

export async function urlMetadataFormater(req, res, next) {
    const { id } = req.params;
    try {
        const { rows: postsList } = id ? await postRepository.getPostsByUserId(id) : await postRepository.getPostsList(0);
        const formatedPostsList = [];
        for (let post of postsList) {
            const link = post.link;
            const metadata = await urlMetadata(link);
            const newObject = { linkUrl: link, linkTitle: metadata.title, linkDescription: metadata.description, linkImage: metadata.image };
            post = { ...post, link: newObject };
            formatedPostsList.push(post);
        }
        res.locals.formatedPostsList = formatedPostsList;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
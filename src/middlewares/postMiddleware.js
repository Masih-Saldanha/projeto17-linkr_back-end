import urlMetadata from "url-metadata";

import postRepository from "../repositories/postRepository.js";

export async function urlMetadataFormater(req, res, next) {
    try {
        const { rows: postsList } = await postRepository.getPostsList(0);
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
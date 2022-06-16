/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */

export async function validaHeader(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    if (!token) return res.status(401).send('Esta rota precisa do token de acesso');
    next();
  } catch (e) {
    console.log('Erro ao validar header', e);
    return res.sendStatus(500);
  }
}

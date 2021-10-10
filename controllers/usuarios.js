const { response } = require('express');

const usuarioGet = (req, res) => {

    const {q,nombre='No name',apiKey,page,limit} = req.query;

    res.json({
        msg:'get API - controlador',
        q,
        nombre,
        apiKey,
        page,
        limit
    });
};

const usuarioPut =  (req, res) => {

    const {id} = req.params;

    res.json({
        msg:'put API - controlador',
        id
    });
};

const usuarioPost =  (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg:'post API - controlador',
        nombre,
        edad
    });
};

const usuarioDelete = (req, res) => {
    res.json({
        msg:'delete API - controlador'
    });
};

const usuarioPatch =  (req, res) => {
    res.json({
        msg:'patch API - controlador'
    });
};

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}
const { response, 
        request }          = require('express');
const   bcrypt             = require('bcryptjs');

const   Usuario            = require('../models/usuario');


const usuarioGet  = async (req = request , res= response) => {

    // const { q, nombre='No name', apiKey, page, limit } = req.query;

    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([ 
            Usuario.countDocuments( query ),
            Usuario.find( query )
                .skip(Number(desde))
                .limit(Number(limit))
        ]);

    res.json({
        total,
        usuarios
    });
}; 

const usuarioPut =  async(req, res= response) => {

    const {id} = req.params;
    const { _id, password, google,correo, ...resto } = req.body;

    //TODO  validar contra BD
    if( password ){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate ( id, resto );

    res.json(usuario);
};

const usuarioPost = async( req, res = response ) => {

    const { nombre, correo, password, rol }    = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
};

const usuarioDelete = async (req, res= response) => {

    const { id } = req.params;
 
    const usuario = await Usuario.findByIdAndUpdate( id , { estado: false});
    

    res.json({usuario});
};

const usuarioPatch =  (req, res= response) => {
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
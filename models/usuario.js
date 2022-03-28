/***********Esquema de Base de Datos******************************
 * 
 * Sirve para darle las caracteristicas a la tabla que se va a crear 
 * se utilizan algunos atributos como son el 
 * @Type que es el tipo de dato que va llevar el campo
 * @required que es si el campo es requerido o no 
 * @unique para saber si el campo debe ser unico o no 
 * @enum es para colocar alguno campo por defecto o mejor dicho que solo reciva esos campos
 */

const { Schema,model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});


// con esto logramos que no nos muestre la __v y el password.
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports= model('Usuario', UsuarioSchema);


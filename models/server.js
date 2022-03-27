const express           = require('express');
const cors              = require('cors');
const { dbConnection }  = require('../databases/config');


class Server {

    constructor() {
        
        this.app          = express();
        this.port         = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Connectar a base de datos
         this.conectarDB();

        //Middelwares
        this.middlewares();


        // Rutas de mi aplicacion 
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS 
        this.app.use(cors());

        //Lectura y Parseo del Body
        this.app.use( express.json());

        // Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en puerto", this.port);
        });
    }
}

module.exports = Server;
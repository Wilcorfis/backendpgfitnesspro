const Hapi = require('@hapi/hapi')
const { pool } = require('./config/db')
const HapiSwagger = require('hapi-swagger')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Joi = require('joi')
const Path = require('path');
const cors = require('hapi-modern-cors');
const { firebase } = require('firebase/app');
const { getAllusuario, getOneusuario, deleteUsuario, createUsuario, updateUsuario } = require('./routers/usuario')
const controller = {};
const init = async () => {
    
    //////
    
    var admin = require("firebase-admin");

    var serviceAccount = require("./serviceAccount.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://postic-607ec-default-rtdb.firebaseio.com"
    });

    
    //configuration firebase admin sdk

    module.exports = controller;
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',

        routes: {
            cors: true
            ,

            files: {
                relativeTo: Path.join("C:/Program Files/PostgreSQL/10/data")
            }
        }

    })

    const swaggerOptions = {
        info: {
            title: "API REST ACADEMIA",
            description:
                "Esta es la documentación de la API academia, creada en la sesión de clase Backend para demostrar el uso de swagger",
            contect: {
                name: "Ingrid Argote",
                email: "ingridloargote@gmail.com",
            },
            servers: ["http://localhost:3000"],
            version: '0.0.1'
        },
    }


    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            option: swaggerOptions
        }
    ])
    await server.register({
        plugin: cors,
        options: {
            overrideOrigin: "*",
            allowMethods: "GET,PUT,POST,DELETE,PATCH",
            allowHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            maxAge: 500,
            allowCreds: true,
            allowOriginResponse: true

        },
    });


    //////////////////////////////////////////////////////////usuarios/////////////
    server.route(getAllusuario);
    server.route(getOneusuario);
    server.route(deleteUsuario);
    server.route(createUsuario);
    server.route(updateUsuario);
    //firebase



    /////////////////////////////////////////////////suscripciones////////////////////////
    /*server.route({
        method: 'GET',
        path: '/api/fabricantes',
        handler: async (request, h) => {
            let cliente = await pool.connect()
            try {
                let result = await cliente.query(
                    `SELECT * FROM fabricante`,

                )
                return result.rows
            } catch (err) {
                console.log({ err })
                return h.response({ err })
            } finally {
                cliente.release(true)
            }
        },
        options: {
            description: 'Obtener todas los fabricantes',
            notes: 'regresa todos los fabricantes',
            tags: ['api'],

        }

    });

    server.route({
        method: 'GET',
        path: '/api/fabricante/{id}',
        handler: async (request, h) => {
            let cliente = await pool.connect()
            const { id } = request.params
            try {
                let result = await cliente.query(
                    `SELECT * FROM fabricante WHERE id_fabricante = $1 `,
                    [id]
                )
                return result.rows
            } catch (err) {
                console.log({ err })
                return h.response({ err })
            } finally {
                cliente.release(true)
            }
        },
        options: {
            description: 'Obtener fabricante por su id',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        }

    });
    server.route({
        method: 'DELETE',
        path: '/api/fabricante/{id}',
        handler: async (request, h) => {
            let cliente = await pool.connect()
            const { id } = request.params
            try {
                let result = await cliente.query(
                    `Delete FROM fabricante WHERE id_fabricante = $1 `,
                    [id]
                )
                return h.response("borrado correctamente").code(200)
            } catch (err) {
                console.log({ err })
                return h.response({ err })
            } finally {
                cliente.release(true)
            }
        },
        options: {
            description: 'Borrar fabricante por su id',
            notes: 'regresa un mensaje de borrado correctamente',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        }


    });
    server.route({
        method: 'POST',
        path: '/api/fabricante',
        handler: async (request, h) => {
            let cliente = await pool.connect()

            const { nombre, descripcion, activo, fk_id_marca } = request.payload
            try {
                let result = await cliente.query(
                    `INSERT INTO fabricante
                    VALUES (NEXTVAL('fabricante_seq'),$1, $2, $3, $4); `,
                    [nombre, descripcion, activo, fk_id_marca]
                )

                return h.response({ nombre, descripcion, activo, fk_id_marca }).code(200)
            } catch (err) {
                return h.response({ err })
            } finally {
                cliente.release(true)
            }

        },
        options: {
            description: 'registrar fabricantes',
            notes: 'regresa un mensaje de creado correctamente',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    nombre: Joi.string().required(),
                    descripcion: Joi.string().required(),
                    activo: Joi.string().required(),
                    fk_id_marca: Joi.number().integer().required()
                })
            }
        }


    });

    server.route({
        method: 'PUT',
        path: '/api/fabricante/{id}',
        handler: async (request, h) => {
            let cliente = await pool.connect()
            const { id } = request.params

            const { nombre, descripcion, activo, fk_id_marca } = request.payload
            try {
                let result = await cliente.query(
                    `UPDATE fabricante SET nombre = $1, descripcion=$2,activo=$3,fk_id_marca=$4 where id_fabricante=$5; `,
                    [nombre, descripcion, activo, fk_id_marca, id]
                )

                return h.response({ id, nombre, descripcion, activo, fk_id_marca }).code(200)
            } catch (err) {
                console.error(err)
                return h.response({ err })
            } finally {
                cliente.release(true)
            }
        },
        options: {
            description: 'actualizar fabricantes',
            notes: 'regresa un mensaje de actualizado correctamente',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()

                }),
                payload: Joi.object({
                    nombre: Joi.string().required(),
                    descripcion: Joi.string().required(),
                    activo: Joi.string().required(),
                    fk_id_marca: Joi.number().integer().required()
                })
            }
        }
    });*/

    await server.start()

    console.log('Server running on port 3000')
}

init()
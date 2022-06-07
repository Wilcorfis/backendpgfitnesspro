const { pool } = require('../config/db')
const Joi = require('joi')
const getAllusuario = {
    method: 'GET',
    path: '/api/usuarios',
    handler: async (request, h) => {
        let cliente = await pool.connect()
        try {
            let result = await cliente.query(
                `SELECT * FROM usuario`,

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
        description: 'Obtener todoss los usuarios',
        notes: 'regresa todos los usuarios',
        tags: ['api'],

    }

}
const getOneusuario={
    method: 'GET',
    path: '/api/usuario/{id}',
    handler: async (request, h) => {
        let cliente = await pool.connect()
        const { id } = request.params
        try {
            let result = await cliente.query(
                `SELECT * FROM usuario WHERE id_usuario = $1 `,
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
        description: 'Obtener usuarios por su id',
        notes: 'obtener usuario por id',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        }
    }

}
const deleteUsuario={
    method: 'DELETE',
    path: '/api/usuario/{id}',
    handler: async (request, h) => {
        let cliente = await pool.connect()
        const { id } = request.params
        try {
            let result = await cliente.query(
                `Delete FROM usuario WHERE id_usuario = $1 `,
                [id]
            )
            return h.response("borrado correctamente")
        } catch (err) {
            console.log({ err })
            return h.response({ err })
        } finally {
            cliente.release(true)
        }
    },
    options: {
        description: 'Borrar usuarios por su id',
        notes: 'regresa un mensaje de borrado correctamente',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            })
        }
    }


}
const createUsuario={
    method: 'POST',
    path: '/api/usuario',
    handler: async (request, h) => {
        let cliente = await pool.connect()

        const {
            correo,
            tipo_usuario,
            cedula,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            registrado,
            clave } = request.payload
        try {
            let result = await cliente.query(
                `INSERT INTO usuario
                VALUES (NEXTVAL('usuario_seq'),$1, $2, $3, $4, $5, $6, $7, $8, $9); `,
                [
                    correo,
                    tipo_usuario,
                    cedula,
                    primer_nombre,
                    segundo_nombre,
                    primer_apellido,
                    segundo_apellido,
                    registrado,
                    clave
                ]
            )

            return h.response({
                correo,
                tipo_usuario,
                cedula,
                primer_nombre,
                segundo_nombre,
                primer_apellido,
                segundo_apellido,
                registrado,
                clave
            }).code(200)
        } catch (err) {
            return h.response({ err })
        } finally {
            cliente.release(true)
        }

    },
    options: {
        description: 'registrar usuario',
        notes: 'regresa un mensaje de creado correctamente',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                correo : Joi.string().required() ,
                tipo_usuario: Joi.string().required(),
                cedula: Joi.number().integer().required(),
                primer_nombre: Joi.string().required(),
                segundo_nombre: Joi.string().required(),
                primer_apellido: Joi.string().required(),
                segundo_apellido: Joi.string().required(),
                registrado: Joi.string().required(),
                clave : Joi.string().required()
            })
        }
    }
}
const updateUsuario={
    method: 'PUT',
    path: '/api/usuario/{id}',
    handler: async (request, h) => {
        let cliente = await pool.connect()
        const { id } = request.params

        const {
            correo,
            tipo_usuario,
            cedula,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            registrado,
            clave } = request.payload
        try {
            let result = await cliente.query(
                `UPDATE usuario SET correo = $1, tipo_usuario=$2,cedula=$3
                ,primer_nombre=$4,segundo_nombre=$5,primer_apellido=$6,segundo_apellido=$7,registrado=$8,clave=$9
                
                where id_usuario=$10; `,
                [
                    correo,
                    tipo_usuario,
                    cedula,
                    primer_nombre,
                    segundo_nombre,
                    primer_apellido,
                    segundo_apellido,
                    registrado,
                    clave,
                    id]
            )

            return h.response({
                correo,
                tipo_usuario,
                cedula,
                primer_nombre,
                segundo_nombre,
                primer_apellido,
                segundo_apellido,
                registrado,
                clave
            }).code(200)
        } catch (err) {
            console.error(err)
            return h.response({ err })
        } finally {
            cliente.release(true)
        }
    },
    options: {
        description: 'actualizar usuario',
        notes: 'regresa un mensaje de actualizado correctamente',
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()

            }),
            payload: Joi.object({
                correo : Joi.string().required() ,
                tipo_usuario: Joi.string().required(),
                cedula: Joi.number().integer().required(),
                primer_nombre: Joi.string().required(),
                segundo_nombre: Joi.string().required(),
                primer_apellido: Joi.string().required(),
                segundo_apellido: Joi.string().required(),
                registrado: Joi.string().required(),
                clave : Joi.string().required()
            })
        }
    }
}
module.exports={createUsuario,deleteUsuario,getAllusuario,getOneusuario,updateUsuario}
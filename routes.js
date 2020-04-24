const express = require('express');
const conexion = require('./database');

const Router = express.Router();

let menError = [{"mensaje": "No hay nada"}]
let menValidar = [{"mensaje": "true"}]


Router.get('/', (req, res)=>{
    res.render('index');
})

Router.get('/api/usuarios', (req, res)=>{
    const { nombre, contraseña } = req.query;
    console.log(nombre + "   -   " + contraseña)
    conexion.query(`SELECT * FROM usuario WHERE nombre = '${nombre}' and contraseña = '${contraseña}'`, (error, consultado)=>{
        console.log('--------------------------------------');
        console.table(consultado);
        console.log('--------------------------------------');
        if(consultado != ""){
            res.json(consultado[0]);
        }else{
            res.json(menError[0]);
        }
    });
})

Router.get('/api/usuarios/register', (req, res)=>{
    const { nombre, contraseña } = req.query;
    console.log(nombre + "   -   " + contraseña)

    conexion.query(`INSERT INTO usuario(nombre, contraseña) VALUES('${nombre}', '${contraseña}')`, (error, consultado)=>{
        console.table(consultado);
        if(consultado != ""){
            res.json(consultado);
        }else{
            res.json(menError[0]);
        }
    });
})


Router.get('/api/usuarios/formulario', (req, res)=>{
    const { id, input2, input3, input4, input5, input6, input7  } = req.query;
    console.log(`Id: '${id}', Documento'${input2}', fecha nacimiento: '${input3}', lugar de nacimiento: '${input4}', Estado civil: '${input5}', 
                    Direccion: '${input6}', Telefono: '${input7}'`);

    conexion.query(`INSERT INTO hojas(id_usuario, descripcion, fecha_nacimiento, lugar_nacimiento, estado_civil, direccion, telefono) VALUES(${id},'${input2}','${input3}','${input4}','${input5}','${input6}','${input7}')`, (error, consultado)=>{
        
        console.log("---------------------- Consultado: -----------------------------");
        console.table(consultado);
        console.log("---------------------- ----------- -----------------------------");
        console.log(error)
        if(consultado != ""){
            res.json(consultado);
        }else{
            res.json(menError[0]);
        }
    });


})


Router.get('/api/usuarios/mostrar/formulario', (req, res)=>{
    const { id } = req.query;
    console.log(id);

    conexion.query(`SELECT * FROM hojas WHERE id_usuario = '${id}'`, (error, consultado)=>{
        console.log("---------------------- Consultado: -----------------------------");
        console.table(consultado);
        console.log("---------------------- ----------- -----------------------------");
        if(consultado != ""){
            res.json({consultado});
        }else{
            res.json(menError[0]);
        }

    });
})

module.exports = Router;
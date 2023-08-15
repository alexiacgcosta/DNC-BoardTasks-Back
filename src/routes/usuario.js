const express = require('express');
const conectarBancoDados = require('../../middlewares/conectarBD');
const router = express.Router();
const bcrypt = require('bcrypt');
const EsquemaUsuario = require('../models/usuario');


router.post('/criar', conectarBancoDados, async function(req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let {nome, email, senha} = req.body;
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD = await EsquemaUsuario.create({nome, email, senha: senhaHash});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Usuário criado com sucesso.",
      resposta: respostaBD
    })
  } catch (error) {

    return tratarErrosEsperados(res, error)
  }
});

module.exports = router;

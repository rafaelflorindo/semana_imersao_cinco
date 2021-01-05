const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');

require('./models/Metas');
const Meta = mongoose.model('Meta');

const app = express();
app.use(express.json());

//liberando um meedware para acesso externo
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/metas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão de dados com o MongoDb realizado com sucesso!!! ")
}).catch((err) => {
    console.log("Erro: Conexão de dados com o MongoDb não realizado")
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta: http://localhost:8080 ")
});


//ROTAS
app.get('/', async function (req, res){
    //res.send('Seja bem vindo!!!')
    return res.json({nome: "5ª Semana de Imersão Node"});
});
app.get('/metas', async function (req, res){
    //res.send('Seja bem vindo!!!')
    await Meta.find({}).then((metas) => {
        return res.json({
            error: false,
            metas
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro encontrado!!!"
        });
    });
});

app.post('/metas', async (req, res) => {
    //console.log(req.body);
    await Meta.create(req.body, (err)=>{
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Meta não cadastrada com sucesso!!!"
        });
    });
    return res.json({
        error: false,
        metas: "Meta cadastrada com sucesso!!!"
    });
});

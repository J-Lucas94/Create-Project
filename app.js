const express = require('express');
const app = express();
app.use(express.json());

//passport
const passport = require('passport')
require("./config/auth")(passport)

// Session

const session = require('express-session')
const flash = require('connect-flash')

//config

app.use(session({
    secret: "332427",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//midleware

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// handlebars template

const hbs = require('express-handlebars');
const { decodeBase64 } = require('bcryptjs');
app.engine("handlebars", hbs.engine({
    helpers: {
        ifStatus: (status) => {
            //console.log(status === "A")
            if (status === 1) {
                return 'checked'
            }
            return ''
        },
        ifGrupo: async(grupo, id_usuario) => {
            console.log(grupo)
            await grupoxusuarios.findOne({
                raw: true,
                where: { id_usuario: id_usuario, descricao: grupo }
            }).then(async(result) => {
                return await result.status === 1
            })
        },
        formatMoney: async(places, symbol, thousand, decimal) => {
            places = !isNaN(places = Math.abs(places)) ? places : 2;
            symbol = symbol !== undefined ? symbol : "$";
            thousand = thousand || ",";
            decimal = decimal || ".";
            var number = this,
                negative = number < 0 ? "-" : "",
                i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");

        },
        formatNumber: (number, cDecimal) => {
            if (number === null) {
                number = 0;
            }
            return number.format(cDecimal)
        },
        formatDate: (cDate) => {
            var cDateRet = new Date(cDate).toISOString().split('T')[0]

            return cDateRet
        },
        formatDate2: (cDate) => {
            var cDateRet = new Date(cDate).toLocaleDateString()

            return cDateRet
        }
    }
}));

//Models

// const Canis = require('./models/Canis')
const Chips = require('./models/Chips')
// const Clientes = require('./models/Clientes')
const MotivosBaixa = require('./models/MotivosBaixa')
const Procedimentos = require('./models/Procedimentos')
const ViasAdmissao = require('./models/ViasAdmissoes')
const Contratos = require('./models/Contratos')
const Admissoes = require('./models/Admissoes')
const PrecosProc = require('./models/PrecosProc')
const AgendaProc = require('./models/AgendaProc')
const RegProcAutAvulsos = require('./models/RegProcAutAvulsos')
const RegOcorrencias = require('./models/RegOcorrencias')
const Baixa = require('./models/Baixa')
const Funcoes = require('./models/Funcoes')
const Permissoes = require('./models/Permissoes')
const PermissoesFuncoes = require('./models/PermissoesFuncoes')
const FuncaoUsuario = require('./models/FuncaoUsuario')
const Usuario = require('./models/Usuario')
const Banco = require('./models/Banco')

app.set("view engine", "handlebars");

//public path

app.use(express.static('public'))

//Routes

const UsuarioRoutes = require('./routes/UsuarioRoutes')
// const canisRoutes = require('./routes/canisRoutes')
// const clientesRoutes = require('./routes/clientesRoutes')
// const chipsRoutes = require('./routes/chipsRoutes')
// const viaRoutes = require('./routes/viaRoutes')
// const procRoutes = require('./routes/procRoutes')
// const motBaixaRoutes = require('./routes/motBaixaRoutes')
// const contratoRoutes = require('./routes/contratosRoutes')
// const precosRoutes = require('./routes/precosRoutes')
// const admissoesRoutes = require('./routes/admissoesRoutes')
// const agendaRoutes = require('./routes/agendaRoutes')
// const regProcAutAvulsosRoutes = require('./routes/regProcAutAvulsosRoutes')
// const regOcorrenciasRoutes = require('./routes/regOcorrenciasRoutes')
// const baixaRoutes = require('./routes/baixaRoutes')
// const funcoesRoutes = require('./routes/funcoesRoutes')
// const permissoesRoutes = require('./routes/PermissoesRoutes')
// const permissoesFuncRoutes = require('./routes/permissoesFuncRoutes')
// const FuncaoUsuarioRoutes = require('./routes/funcaoUsuarioRoutes')

app.use('/', UsuarioRoutes)
// app.use('/canis', canisRoutes)
// app.use('/clientes', clientesRoutes)
// app.use('/chips', chipsRoutes)
// app.use('/vias', viaRoutes)
// app.use('/procedimentos', procRoutes)
// app.use('/motivos', motBaixaRoutes)
// app.use('/contratos', contratoRoutes)
// app.use('/precos', precosRoutes)
// app.use('/admissoes', admissoesRoutes)
// app.use('/agenda', agendaRoutes)
// app.use('/avulsos', regProcAutAvulsosRoutes)
// app.use('/ocorrencias', regOcorrenciasRoutes)
// app.use('/baixa', baixaRoutes)
// app.use('/funcoes', funcoesRoutes)
// app.use('/permissoes', permissoesRoutes)
// app.use('/permissoesfunc', permissoesFuncRoutes)
// app.use('/funcao', FuncaoUsuarioRoutes)

const rotas = require('./routes/router')

app.use('/canil', rotas)
//Conection



app.listen(3000, console.log('Iniciado na porta 3000'))
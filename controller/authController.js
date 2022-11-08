const User = require("../models/User");
const Funcoes = require("../models/Funcoes");
const bcryptjs = require("bcryptjs");
const passport = require("passport");


module.exports = class AuthController{


      static login(req, res) {
        res.render("auth/login");
      }

      static async loginPost(req, res, next) {
        passport.authenticate("local", {
          successRedirect: "/pedido/registrar",
          failureRedirect: "/login",
          failureFlash: true,
        })(req, res, next);
      }

      static register(req, res){
        res.render("auth/register")
      }

      static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;
    
        if (password != confirmpassword) {
          res
            .status(400)
            .json({ message: "As senhas não conferem, tente novamente !" });
          return;
        }
    
        if (password.length < 6) {
          res.status(411).json({ message: "Senha muito fraca !" });
          return;
        }
    
        const checkUser = await User.findOne({ where: { email: email } });
    
        if (checkUser) {
          res.status(400).json({ message: "O E-mail já está em uso !" });
          return;
        }
    
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);
    
        const user = {
          name,
          email,
          password: hashedPassword,
        };
  
        try {
          const createUser = await User.create(user);
          res.status(200).json({ message: "Cadastro realizado com sucesso !" });
          return;
        } catch (error) {
          console.log(error);
        }
      }

      static async user(req, res){

        try {
          
         let user = await User.findOne({where: {id: req.params.id}, include:[{
          model: Funcoes,
          as: 'funcoes_id',
          where: {
            nome: 'Nome da Funcao'
          }
         }]})
         return res.json({user: user})

        } catch (error) {
          console.log(error)
        }

      }

      static logout(req, res) {
        req.logout(req.user, (err) => {
          if (err) return next(err);
          req.flash("success_msg", "Deslogado com sucesso!");
          res.redirect("/login");
        });
      }

}
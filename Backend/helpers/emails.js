import nodemailer from 'nodemailer'
 
export const emailRegistro = async ({email, nombre, token}) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transport.sendMail({
          from: "TestGames - Administra de juegos <cuentas@testtwich.com>",
          to: email,
          subject: "Twich API Test - comprueba tu cuenta",
          text: "comprueba tu cuenta en TwichAPPTest",
          html:`
          <p>Hola ${nombre} tu cuenta esta casi lista, solo debes comprobarla, da click en el siguiente enlace: </p>

          <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar</a>
          
          <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
          
          `
      })
}

export const emailResetPass = async ({email, nombre, token}) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transport.sendMail({
          from: "TestGames - Administra de juegos <cuentas@testtwich.com>",
          to: email,
          subject: "Twich API Test - Renueva tu password",
          text: "Renueva tu password en TwichAPPTest",
          html:`
          <p>Hola ${nombre} da click en el siguiente enlace para compeltar tu proceso de restablecimiento de password: </p>

          <a href="${process.env.FRONTEND_URL}/reset-pass/${token}">Renovar Password</a>
          
          <p>Si tu no creaste esta password, puedes ignorar el mensaje</p>
          
          `
      })
}
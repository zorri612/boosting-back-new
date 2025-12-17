// server.js o la ruta donde configures tu servidor
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Para permitir peticiones desde tu frontend
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json()); // Para poder leer el body de las peticiones JSON

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
  auth: {
    user: 'juandavidzhenao@gmail.com', // ⚠️ Tu correo electrónico
    pass: process.env.GMAIL_APP_PASSWORD // ⚠️ La contraseña de aplicación, no la de tu cuenta.
  }
});

app.post('/enviar-correo', (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  // ⚠️ Nuevo HTML con diseño
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">SOLICITUD SERVICIOS DE BOOSTING VÍA PÁGINA WEB</h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
            <p style="font-size: 16px; color: #555;">Hola Alejandro, alguien se interesó en los servicios de Boosting. Proveniente desde la página web www.boostingsas.com </p>
        </div>
        <div style="margin-top: 20px;">
            <h3 style="color: #007BFF;">Información:</h3>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 10px; padding: 10px; border-left: 3px solid #007BFF; background-color: #f0f8ff;">
                    <strong>Nombre:</strong> ${nombre}
                </li>
                <li style="margin-bottom: 10px; padding: 10px; border-left: 3px solid #007BFF; background-color: #f0f8ff;">
                    <strong>Email:</strong> ${email}
                </li>
                <li style="margin-bottom: 10px; padding: 10px; border-left: 3px solid #007BFF; background-color: #f0f8ff;">
                    <strong>Teléfono:</strong> ${telefono}
                </li>
                <li style="margin-bottom: 10px; padding: 10px; border-left: 3px solid #007BFF; background-color: #f0f8ff;">
                    <strong>Mensaje adjunto:</strong> ${mensaje}
                </li>
            </ul>
        </div>
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #aaa;">
            <p>Este es un mensaje automático, por favor no responder.</p>
        </div>
    </div>
  `;

  // Opciones del correo
  const mailOptions = {
    from: 'zorrillanico200312@gmail.com',
    to: 'gerencia@boostingsas.com', // Enviar al correo de gerencia
    subject: 'SOLICITUD SERVICIOS PÁGINA WEB',
    html: htmlContent // ⚠️ Usamos la nueva plantilla HTML
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo.');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado con éxito.');
    }
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
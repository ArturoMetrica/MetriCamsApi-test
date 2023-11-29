const nodemailer = require('nodemailer');
const fs = require('fs');
const { lang } = require('moment');
const { server: { environment }, geotab, email } = require('../config/env');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
        user: email.user,
        pass: email.password
    }
});
const htmlTemplate = '';
let mailOptions = {
    from: email.name,
}

async function send(email, { code, language }) {
    try {
        let mailTemplateLang;
        if (environment === 'dev') {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplateEN' : 'htmlTemplateES';
        } else {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplateENProd' : 'htmlTemplateESProd';
        }
        mailOptions.subject = language.code === 'en' ? 'User register' : 'Registro de usuario';

        if (environment == 'dev')
            mailOptions.html = await fs.readFileSync(`./src/email_templates/${mailTemplateLang}.txt`, { encoding: 'utf-8' }).replace('@', code).replace('$', environment);
        else
            mailOptions.html = await fs.readFileSync(`./src/email_templates/${mailTemplateLang}.txt`, { encoding: 'utf-8' }).replace('@', code).replace('$', geotab.database);

        mailOptions.to = email;

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

async function sendMailPass(email, { code, language }) {
    try {
        let mailTemplateLang;
        if (environment === 'dev') {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplatePassEN' : 'htmlTemplatePassES';
        } else {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplatePassENProd' : 'htmlTemplatePassESProd'
        }
        mailOptions.subject = language.code === 'en' ? 'User data update' : 'Actualización de datos de usuario';

        if (environment == 'dev')
            mailOptions.html = await fs.readFileSync(`./src/email_templates/${mailTemplateLang}.txt`, { encoding: 'utf-8' }).replace('@', code).replace('$', environment);
        else
            mailOptions.html = await fs.readFileSync(`./src/email_templates/${mailTemplateLang}.txt`, { encoding: 'utf-8' }).replace('@', code).replace('$', geotab.database);

        mailOptions.to = email;

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendEmail: send,
    sendMailPass
}

/********************* Propiedad de Métrica Móvil SA de CV **************************/
const nodemailer = require('nodemailer');
const fs = require('fs');
const { lang } = require('moment');
const { environment } = require('../config/env').server;

const { database } = require('../config/env').geotab;
const { user, password, name } = require('../config/env').email;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
        user,
        password
    }
});
const htmlTemplate = '';
let mailOptions = {
    from: name,
}

async function send(email, { code, language }) {
    try {
        let mailTemplateLang;
        if (environment === 'true') {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplateEN' : 'htmlTemplateES';
        } else {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplateENProd' : 'htmlTemplateESProd';
        }
        mailOptions.subject = language.code === 'en' ? 'User register' : 'Registro de usuario';
        mailOptions.html = await fs.readFileSync(`./email_templates/${mailTemplateLang}.txt`, { encoding: 'utf-8' }).replace('@', code).replace('$', environment);
        mailOptions.to = email;
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                console.log(error.message);
            else
                console.log('Email Sent: ' + info.response);
        });
    } catch (error) {
        console.log(error);
    }
}

async function sendMailPass(email, { code, language }) {
    try {
        let mailTemplateLang;
        if (environment === 'true') {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplatePassEN' : 'htmlTemplatePassES';
        } else {
            mailTemplateLang = language.code === 'en' ? 'htmlTemplatePassENProd' : 'htmlTemplatePassESProd'
        }
        mailOptions.subject = language.code === 'en' ? 'User data update' : 'Actualización de datos de usuario';
        mailOptions.html = await fs.readFileSync(`./email_templates/${mailTemplateLang}.txt`, { encoding: 'utf-8' }).replace('@', code).replace('$', environment);
        mailOptions.to = email;
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                console.log(error.message);
            else
                console.log('Email Sent : ' + info.response);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendEmail: send,
    sendMailPass
}

/********************* Propiedad de Métrica Móvil SA de CV **************************/
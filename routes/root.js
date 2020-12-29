'use strict'
const nodemailer = require("nodemailer");
const schema = require('../schemas/mail.schema');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  });
  fastify.post('/send', {schema: schema.create, preValidation : [fastify.authenticate]}, async function (request, reply) {
    async function main() {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.mail_host,
        port: parseInt(process.env.mail_port),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.mail_user, // generated ethereal user
          pass: process.env.mail_pass, // generated ethereal password
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
        }
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: request.body.from, // sender address
        to: request.body.to, // list of receivers
        subject: request.body.subject, // Subject line
        html: request.body.message, // html body
      });
      return reply
      .code(200)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({
              statusCode : 200,
              data : info.messageId,
              message : `Message sent: %s, ${info.messageId}`,
          });

    }
    
    main().catch(
      err => {
        console.log(err);
        return reply
        .code(500)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({
                statusCode : 500,
                data : false,
                message : err,
            });
      }
    );
  })
}

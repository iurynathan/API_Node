var sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.sendgridKey)


exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'iurynathan@gmail.com',
        subject: subject,
        html: body
    })
}
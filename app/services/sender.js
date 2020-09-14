const nodemailer = require('nodemailer');

const sender = params => {
    const transporter = nodemailer.createTransport({
        transport: 'SMTP',
        service: 'smtp.163.com',
        host: 'smtp.163.com',
        port: 465,
        secureConnection: true,
        auth: {
            user: '15212219417@163.com',
            pass: '' //put your email smtp pin here
        }
    });
    const mailOptions = {
        from: '15212219417@163.com',
        to: params.email,
        subject: 'Verify your account!',
        text: `Hi, Your code to activate account is ${params.code}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            try {
                transporter.close()
            } catch(err) {
                console.error(err);
            }
            if(error) {
                reject({
                    status: 400,
                    message: 'Fail to send mail'
                });
            }
            resolve({
                status: 200,
                message: 'Send Message Successfully',
            })
        });
    });
};

module.exports = sender
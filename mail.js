const nodemailer = require('nodemailer'); //引入模块
const mailConfig = require('./mailConfig')

let transporter = nodemailer.createTransport({
    //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
    service: mailConfig.service, //类型qq邮箱
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
        //pass 不是邮箱账户的密码而是stmp的授权码（必须是相应邮箱的stmp授权码）
        //邮箱---设置--账户--POP3/SMTP服务---开启---获取stmp授权码
    },
    tls: {rejectUnauthorized: false}, // 解决 unable to verify the first certificate
});

function sendMail(mail, subject, html) {
    // 发送的配置项
    let mailOptions = {
        from: `"${mailConfig.userName}" <${mailConfig.user}>`, // 发送方
        to: mail, //接收者邮箱，多个邮箱用逗号间隔
        subject: subject, // 标题
        html: html //页面内容
    };

    //发送函数
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error', error)
        } else {
            console.log('has send')
        }
    });

}

module.exports = sendMail
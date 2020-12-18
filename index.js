const axios = require("axios");
const sendMail = require('./mail.js')
const mailConfig = require('./mailConfig')

const send = () => {
    const getTime = () => {
        const date = new Date();
        return `今天是${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${date.getDay()}`
    }

    const promiseList = [
        // 天气 深圳
        axios.get('http://wthrcdn.etouch.cn/weather_mini?city=%E6%B7%B1%E5%9C%B3'),
        // 彩虹屁
        axios.get('https://chp.shadiao.app/api.php'),
        // 毒鸡汤
        axios.get('https://www.iowen.cn/jitang/api/')
    ]
    Promise.all(promiseList).then(res => {
        const result = []
        result[0] = +res[0].data.status === 1000 ? res[0].data.data : '未知天气'
        result[1] = +res[1].status === 200 ? res[1].data : '你上辈子一定是碳酸饮料吧，为什么我一看到你就开心的冒泡'
        result[2] = +res[2].data.status === 1 ? res[2].data.data.content.content : '高考在昨天，考研在明天，今天没有什么事儿。'

        const weather = result[0].forecast[0]
        const weatherInfo = `天气：${weather.type} 温度：${weather.low}~${weather.high} ${result[0].ganmao}`
        const html = `<div>${getTime()} ${weatherInfo}</div> <div>${result[1]}</div> <div>${result[2]}</div>`
        sendMail(mailConfig.sendEmail, '幺儿嘞 起床咯', html)
    })
}
// 云函数需要导出调用，自己测试时可直接调用
// send()

exports.send = send;
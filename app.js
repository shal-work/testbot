const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const text = require('./const')
// const { Markup } = require('telegraf/typings/markup')



const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply(
    `Привет ${ctx.message.from.first_name ? 
    ctx.message.from.first_name : 
    'незнакомец'}!`)
)
bot.help((ctx) => ctx.reply(text.comands1))

bot.command('video', async (ctx)=>{

    try {
        await ctx.replyWithHTML('<b>Видео</b>', Markup.inlineKeyboard (
            [
                [
                    Markup.button.callback('6 кадров', 'btn_1'), 
                    Markup.button.callback('ЗнаТоКи', 'btn_2'), 
                    Markup.button.callback('Галкина', 'btn_3')
                ],
                [ Markup.button.callback('Youtube', 'btn_4')]
            ]
        ))
    } catch(e) {
        console.err(e)
        console.log(e + 'ошибочка111111')
    }
})


function addActionBot (name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            // await ctx.answerCbQuery() //можно не ставить
            if(src !== false){
                console.log(src)
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                    disable_web_page_preview: true
                }
            )
        } catch(e) {
            console.err(e)
            console.log(e + '- ошибочка2222222')
        }
    })
}

addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', './img/3.jpg', text.text3)
addActionBot('btn_4', false, text.text4)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
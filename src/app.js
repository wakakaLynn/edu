import express from 'express'
import config from './config.js'
import indexRouter from '../routes/index_route.js'
import advertRouter from '../routes/advert_route.js'
import postHandler from '../middlewares/postHandler.js'
import errLog from '../middlewares/error_log.js'


const app = express()
const nunjucks = require('nunjucks')

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))


nunjucks.configure(config.viewPath, {
    autoescape: true,
    express: app,
    noCache: true
});

//解析处理表单POST请求体中间件
app.use(postHandler)

app.use(indexRouter)
app.use(advertRouter)

app.use(errLog)

app.listen(3000, () => {
    console.log('server is running')
})
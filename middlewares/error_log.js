import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'edu'

export default (errLog, req, res, next) => {
    //1. 将错误日志记录到数据库
    //2. 将响应发送给用户，给一些友好的提示信息
    MongoClient.connect(url,  (err, client) => {

        const col = client.db(dbName).collection('error_logs');
        col.insertOne({
            name: errLog.name,
            message: errLog.message,
            stack: errLog.stack,
            time: new Date()
        }, (err, result) => {

            //console.log(result)
            res.json({
                err_code: 500,
                message: errLog.message
            })
        })
        client.close()
    })
}
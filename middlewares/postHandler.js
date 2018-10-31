import queryString from 'querystring'

const postHandler = (req,res,next) => {
    //if(!req.headers['content-length']){
    if(req.method.toLocaleLowerCase() ==='get'){
        return next()
    }
    //如果是普通表单，则自己处理，如果有文件则跳过不处理
    if(req.headers['content-type'].startsWith('multipart/form-data')) {
        return next()
    }

    let data = '';
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        let dataObj = queryString.parse(data)
        //console.log(dataObj)
        req.body = dataObj
        next()
    })
}

export default postHandler
import express from 'express'
import Advert from '../models/advert.js'
import formidable from "formidable";
import config from '../src/config.js'
import { basename } from 'path'

const router = express.Router()

router.get('/advert',(req, res, next ) => {
    const page = Number.parseInt(req.query.page,10)
    const pageSize = 5
    Advert.find().skip((page - 1)*pageSize).limit(pageSize).exec((err, adverts) => {
        if(err){
            return next(err)
        }
        Advert.count((err, count) => {
            if(err){
                return next(err)
            }
            const totalPage = Math.ceil(count / pageSize)
            res.render('advert_list.html',{ adverts, totalPage, page })
        })
    })
})

router.get('/advert/add',(req, res, next ) => {
    res.render('advert_add.html')
})

//添加广告
router.post('/advert/add', (req,res,next) => {
    //接收数据
    //操作数据库
    //发送响应消息
    //res.json(req.body)
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadDir
    form.keepExtensions = true

    form.parse(req, function(err, fields, files) {
        if(err){
            return next(err)
        }
        /*res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));*/
        const body = fields
        body.image = basename(files.image.path)
        //console.log(body.image)

        //操作数据库
        const advert = new Advert({
            title:body.title,
            image:body.image,
            link:body.link,
            start_time:body.start_time,
            end_time:body.end_time,
        })
        advert.save((err,result) => {
            if(err){
                return next(err)
            }
            res.json({
                err_code:0
            })
        })
    });
})


//查看所有广告列表
router.get('/advert/list', (req, res, next) => {
    Advert.find((err, docs)=> {
        if(err){
            return next(err)
        }
        res.json({
            err_code: 0,
            result: docs,
        })
    })
})

//根据ID查看单条广告
router.get('/advert/one/:advertId', (req, res, next) => {
    Advert.findById(req.params.advertId, ( err, result) => {
        if(err){
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result,
        })
    })
})

//更新广告
router.post('/advert/edit', (req, res, next) => {
    Advert.findById(req.body.id, ( err, advert ) => {
        if (err) {
            return next(err)
        }
        advert.title = req.body.title
        advert.image = req.body.image
        advert.link = req.body.link
        advert.start_time = req.body.start_time
        advert.end_time = req.body.end_time
        advert.last_modified = Date.now()
        advert.save((err, result)=>{
            if(err){
                return next(err)
            }
            res.json({
                err_code:0
            })
        })
    })
})

//删除广告
router.delete('/advert/remove/:advertId', (req, res, next) => {
    Advert.remove({_id: req.params.advertId }, err => {
        if(err){
            return next(err)
        }
        res.json({
            err_code:0,
            message:'删除成功'
        })
    })
})

export default router

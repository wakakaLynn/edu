const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true })

//1.创建一个模型架构，设计数据结构和约束
const studentSchema = mongoose.Schema({
    name: String,
    age: Number
})

//2.通过mongoose.model()将架构发布为一个模型
//第一个参数就是给你的集合起一个名字，这名字最好使用帕斯卡命名法
const Student = mongoose.model('Student', studentSchema)

//3.通过操作模型去操作数据库
const s1 = new Student({
    name: 'Mike',
    age: 23
})

/*s1.save((err,result) => {
    if(err) {
        throw err
    }
    console.log(result)
})*/

Student.find(/*{name:'Mike'},*/(err,docs)=>{
    console.log(docs)
})
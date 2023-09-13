const express=require('express')
const multer=require('multer')
const app=express()

// const multerUpload=multer({dest:'client-images'})

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, fileData, callBack) {
      return callBack(null, 'client-images')
    },
        filename:function(req,fileData,callback){
            return callback(null,`${Date.now()}-${fileData.originalname}`)

        }
    }),
    limits:{
        fileSize:Infinity
    }
})
app.use(express.urlencoded())
app.use(express.json())

app.use(express.static('public'))

const products=[]

app.post('/products',multerUpload.single('productImage'),(request,response)=>{
    const fileData=request.file
    console.log(fileData)


    const productData=request.body
    products.push(productData)
    console.log(productData)
    response.end()
})
app.get("/products",(req,res)=>{
    res.send(products)
})
const PORT=process.env.PORT || 8000;

console.log("Port Number",PORT)
app.listen(PORT,()=>{
    console.log("Server Started Successfully")
    console.log(process.env)
})
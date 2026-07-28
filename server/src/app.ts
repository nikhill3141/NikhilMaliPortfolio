import express, { Request } from 'express'

const app = express()
app.use(express.json())

//health routh
app.use("/health", (_req, res)=>{
  res.status(200).json({
    success:true,
    message:"Okk hai ji"
  })
})



export default app
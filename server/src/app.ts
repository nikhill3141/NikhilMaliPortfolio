import express, { Request } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import compression from "compression";
import errorMiddelware from './middlewares/error.middleware.js'
import ApiError from './utils/ApiError.js'
import apiRoutes from './routes/index.routes.js'

const app = express()

//security middleware
app.use(helmet())

//cors
app.use(
  cors({
    origin: "https://nikhil-mali-portfolio.vercel.app/",
    credentials: true,
  }),
);

//loging
app.use(morgan('dev'))

//body parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//cookies
app.use(cookieParser())

//compression
app.use(compression())

//health check
app.use("/api/v1", apiRoutes)


app.use(errorMiddelware)

export default app
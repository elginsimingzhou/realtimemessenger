import express, {Request, Response} from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from 'cors';
const authRouter = require('./routers/authRouter');

const app = express();

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

//Middleware
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use("/auth", authRouter);

app.get('/', (req: Request, res: Response)=>{
    res.json({message: "hi"})
})

io.on("connect", (socket) => {});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

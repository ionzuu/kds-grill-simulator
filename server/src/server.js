// server.ts
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
// config cors for http
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
// creats server http
const httpServer = createServer(app);
//config socket.io supporting cors
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});
// websocket connection
io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log('KDS server running on PORT:', PORT);
});
//# sourceMappingURL=server.js.map
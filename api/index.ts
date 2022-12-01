import server from "./server";
import 'dotenv/config';

const port = process.env.PORT || 3000;

server.startServer(port);

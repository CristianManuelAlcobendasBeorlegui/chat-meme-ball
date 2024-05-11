// === MODO ESTRICTO === //
"use strict";

// === DEPENDENCIAS === //
import express from "express";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";
import sqlite3 from 'sqlite3';

// === CONSTANTES === //
const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);
const db = new sqlite3.Database("database.sqlite");

// === LOGGER === //
app.use(logger('dev'));

// === CONFIGURACION DE LA BASE DE DATOS === //
db.exec(
    "CREATE TABLE IF NOT EXISTS messages ("
    +   "id INTEGER PRIMARY KEY AUTOINCREMENT, "
    +   "content TEXT"
    + ")"
);

// === CONFIGURACION DEL SERVIDOR === //
io.on("connection", function(socket) {
    console.log("Se ha conectado un usuario.");

    socket.on("disconnect", function() {
        console.log("Se ha desconectado un usuario.");
    });

    socket.on("chat message", async function(message) {
        // Guarda el mensaje en BD
        db.exec("INSERT INTO messages (content) VALUES ('" + message + "')");
        
        // Envia el mensaje a todos los usuarios conectados (Broadcast)
        io.emit("chat message", message);
    });
});

server.listen(port, function() {
    console.log("Server is listening to *:" + port);
});

// === RUTAS === //
app.get("/", function(request, response) {
    response.sendFile(process.cwd() + "/client/index.html");
});


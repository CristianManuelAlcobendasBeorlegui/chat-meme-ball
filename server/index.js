// === MODO ESTRICTO === //
"use strict";

// === DEPENDENCIAS === //
import express from "express";
import logger from "morgan";

// === CONSTANTES === //
const port = 3000;
const app = express();

// === LOGGER === //
app.use(logger('dev'));

// === CONFIGURACION DEL SERVIDOR === //
app.listen(port, function() {
    console.log("Server is listening to *:" + port);
});

// === RUTAS === //
app.get("/", function(request, response) {
    response.send("Esto es el chat");
});


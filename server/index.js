// === MODO ESTRICTO === //
"use strict";

// === DEPENDENCIAS === //
import express from "express";

// === CONSTANTES === //
const port = 3000;
const app = express();

// === CONFIGURACION DEL SERVIDOR === //
app.listen(port, function() {
    console.log("Server is listening to *:" + port);
});

// === RUTAS === //
app.get("/", function(request, response) {
    response.send("Esto es el chat");
})
//Crea un servidor de node.js para mostrar una página web en el puerto 3000 y que muestre un mensaje en la consola cuando se inicie el servidor y cuando se reciba una petición GET en el servidor.
//Para ello, crea un fichero server.js que contenga el código necesario para crear el servidor y mostrar el mensaje en la consola.
//El servidor debe mostrar la página index.html que se encuentra en el directorio public.

const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(`Petición recibida: ${req.url} - ${req.method}`);
    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt === '.html') {
            fs.access(filePath, (err) => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
}
);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



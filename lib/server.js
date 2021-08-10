const http = require('http');

const server = {}

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const parsedPathName = parsedURL.pathname;
    let trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');


    req.on('data', (data) => {
        console.log('uzsklausa atsiunte duomenu...');
        console.log(data);
    })

    req.on('end', (data) => {
        console.log('Uzklausos pabaiga...');
        res.end('RETURN CONTENT');
    })
});

server.init = () => {
    server.httpServer.listen(3000, () => {
        console.log('Tavo serveris yra pasiekiamas http://localhost:3000');
    })

    // server.httpServer.on('listening', () => {
    //     console.log('### kazkas pradejo klausytis');
    // }) 
}

module.exports = server;
const http = require('http');
const _data = require('./data');

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

    req.on('end', async (data) => {
        if (trimmedPath === '') {
            // HOME PAGE
            const html = await _data.readHTML('index');
            return res.end(html);
        }

        if (trimmedPath === 'about') {
            // ABOUT PAGE
            const html = await _data.readHTML('about');
            return res.end(html);
        }

        return res.end('KITAS TURINYS');
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
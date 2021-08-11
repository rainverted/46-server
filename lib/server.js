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
            // HOME PAGE: http://www.example.com
            const html = await _data.readHTML('index');
            res.writeHead(200, {
                'Content-Type': 'text/html',
            })
            return res.end(html);
        }

        if (trimmedPath === 'about') {
            // ABOUT PAGE: http://www.example.com/about
            const html = await _data.readHTML('about');
            res.writeHead(200, {
                'Content-Type': 'text/html',
            })
            return res.end(html);
        }

        if (trimmedPath.slice(-4) === '.css') {
            //CSS file
            const fileContent = await _data.readStaticTextFile(trimmedPath);
            res.writeHead(200, {
                'Content-Type': 'text/css',
            })
            return res.end(fileContent);
        }

        if (trimmedPath.slice(-3) === '.js') {
            //JS file
            const fileContent = await _data.readStaticTextFile(trimmedPath);
            res.writeHead(200, {
                'Content-Type': 'text/javascript',
            })
            return res.end(fileContent);
        }

        //bus isspauzdinta, jei tipas nebus teisingas ir bus nurodytas paprastu(plain) tekstu
        res.writeHead(404, {
            'Content-Type': 'text/plain',
        })

        return res.end('Content/file not found');
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
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

        const textFileExtensions = ['css', 'js', 'svg'];
        const urlParts = trimmedPath.split('.');
        const fileExtension = urlParts[urlParts.length - 1];
        const isTextFile = textFileExtensions.includes(fileExtension);

        // css/base/main.css                -> [css.base/main, css]
        // css/base/main.min.css                -> [css.base/main, min, css]

        const MIMES = {
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
        }

        if (isTextFile) {
            //graziname kazkuri "tekstini" faila -> textFileExtensions
            const fileContent = await _data.readStaticTextFile(trimmedPath);
            if (fileContent === '') {
                res.writeHead(404, {
                    'Content-Type': MIMES[fileExtension],
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                })
            }
            return res.end(fileContent);
        } else {
            //PAGES
            if (trimmedPath === '') {
                // HOME PAGE: http://www.example.com
                const html = await _data.readHTML('index');
                if (html === '') {
                    res.writeHead(404, {
                        'Content-Type': 'text/html',
                    })
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                    })
                }
                return res.end(html);
            }

            if (trimmedPath === 'about') {
                // ABOUT PAGE http://www.example.com/about
                const html = await _data.readHTML('about');
                if (html === '') {
                    res.writeHead(404, {
                        'Content-Type': 'text/html',
                    })
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                    })
                }
                return res.end(html);
            }
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
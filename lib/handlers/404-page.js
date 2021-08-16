//jei handler neatininka nei vieno duoto(server.routes), bus nukreitpta i 404-page.js

function notFoundPageHandler() {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 | Barsukas</title>
                <link rel="stylesheet" href="./css/base/reset.css">
                <link rel="stylesheet" href="./css/base/layout.css">
            </head>
            <body>
                <h1>404 page</h1>
            </body>
            </html>`;
}

module.exports = notFoundPageHandler;
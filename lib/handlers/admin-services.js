//aprasyti funkcija, kuri generuoja esanciu servisu html - service.html
//sia funkcija galime kreiptis i .data/services esanciame folderyje sukurtus objektus(json)

function adminServicesPageHandler() {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                SERVICES LIST
            </body>
            </html>`;
}

module.exports = adminServicesPageHandler;

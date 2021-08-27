const _data = require('../../data');
const helpers = require('../../helpers');

const handlers = {}

handlers.services = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._services[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._services = {}

handlers._services.get = async (data, callback) => {
    // gaunam paslaugos info
    const uniqueNumber = data.queryStringObject.get('uniqueNumber');

    if (uniqueNumber === '') {
        return callback(400, {
            error: 'Nenurodytas unikalus numeris',
        })
    }

    const content = await _data.read('services', uniqueNumber);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas automobilis nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);
    //delete contentObj.hashedPassword;

    return callback(200, {
        success: contentObj,
    })
}

handlers._services.post = async (data, callback) => {
    // irasom paslaugos info
    const { serviceName, urlSlug, shortDescription, fullDescription, price, isActive } = data.payload;

    const serviceObject = {
        serviceName,
        urlSlug,
        shortDescription,
        fullDescription,
        price,
        isActive,
        registerDate: Date.now(),
    }

    const res = await _data.create('services', urlSlug, serviceObject); //kokius duomenis siuncia

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti objekto',
        })
    }

    return callback(200, {
        success: 'Objektas sukurtas',
    })
}

handlers._services.put = async (data, callback) => {
    // atnaujinam user info
    const { carname, model, uniqueNumber } = data.payload;

    if (!uniqueNumber) {
        return callback(400, {
            error: 'Nenurodytas automobilio unikalus numeris, kuriam reikia atnaujinti informacija',
        })
    }

    if (!carname && !model) {
        return callback(400, {
            error: 'Nenurodyta nei viena reiksme, kuria norima atnaujinti',
        })
    }

    const content = await _data.read('add-services', uniqueNumber);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas automobilis nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);

    if (carname) {
        // atnaujiname carname
        contentObj.carname = carname;
    }

    if (model) {
        // atnaujiname model
        // const hashedPassword = helpers.hash(password);
        contentObj.model = model;
    }

    const res = await _data.update('services', uniqueNumber, contentObj);

    if (res) {
        return callback(200, {
            success: 'Automobilio informacija atnaujinta',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant atnaujinti automobilio informacija',
        })
    }
}

handlers._services.delete = async (data, callback) => {
    // istrinam auto info
    const uniqueNumber = data.queryStringObject.get('uniqueNumber');

    if (uniqueNumber === '') {
        return callback(400, {
            error: 'Nenurodytas unikalaus numerio parametras',
        })
    }

    const res = await _data.delete('services', uniqueNumber);
    if (res) {
        return callback(200, {
            success: 'Nurodytas automobilis istrintas',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant istrinti automobili',
        })
    }
}

module.exports = handlers;
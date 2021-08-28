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
    // gaunam user info
    const email = data.queryStringObject.get('email');

    if (email === '') {
        return callback(400, {
            error: 'Nenurodytas email parametras',
        })
    }

    const content = await _data.read('services', email);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas vartotojas nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);
    delete contentObj.hashedPassword;

    return callback(200, {
        success: contentObj,
    })
}

handlers._services.post = async (data, callback) => {
    // irasom paslaugos info
    const { serviceName, urlSlug, shortDescription, fullDescription, price, isActive } = data.payload;
    if (serviceName === "") {
        return callback(400, {
            error: 'Paslaugos pavadinimas negali buti tuscias!',
        })
    }
    if (urlSlug === "") {
        return callback(400, {
            error: 'Paslaugos URL negali buti tuscias!',
        })
    }

    const serviceObject = {
        serviceName,
        urlSlug,
        shortDescription,
        fullDescription,
        price,
        isActive
    }

    const res = await _data.create('services', urlSlug, serviceObject);

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti paslaugos',
        })
    }

    return callback(200, {
        success: 'Paslauga sukurtas',
    })
}

handlers._services.put = async (data, callback) => {
    // atnaujinam user info
    const { serviceName, urlSlug, shortDescription, fullDescription, price, isActive } = data.payload;

    if (!urlSlug) {
        return callback(400, {
            error: 'Nenurodytas vartotojo email, kuriam reikia atnaujinti informacija',
        })
    }
    if (serviceName === "") {
        return callback(400, {
            error: 'Paslaugos pavadinimas negali buti tuscias!',
        })
    }
    if (urlSlug === "") {
        return callback(400, {
            error: 'Paslaugos URL negali buti tuscias!',
        })
    }

    const serviceObject = {
        serviceName,
        urlSlug,
        shortDescription,
        fullDescription,
        price,
        isActive
    }

    const res = await _data.update('services', urlSlug, serviceObject);

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti paslaugos',
        })
    }

    return callback(200, {
        success: 'Paslauga sukurtas',
    })



}

module.exports = handlers;
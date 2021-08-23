// const _data = require('../../data');
// const helpers = require('../../helpers');

// const handlers = {}

// handlers.cars = (data, callback) => {
//     const acceptableMethods = ['get', 'post', 'put', 'delete'];

//     if (acceptableMethods.includes(data.httpMethod)) {
//         return handlers._cars[data.httpMethod](data, callback);
//     }

//     return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
// }

// handlers._cars = {}

// handlers._cars.get = async (data, callback) => {
//     // gaunam user info
//     const brand = data.queryStringObject.get('brand');

//     if (brand === '') {
//         return callback(400, {
//             error: 'Nenurodytas brand parametras',
//         })
//     }

//     const content = await _data.read('cars', brand);
//     if (content === '') {
//         return callback(400, {
//             error: 'Nurodytas automobilis nerastas',
//         })
//     }

//     const contentObj = helpers.parseJsonToObject(content);
//     delete contentObj.hashedPassword;

//     return callback(200, {
//         success: contentObj,
//     })
// }

// handlers._cars.post = async (data, callback) => {
//     // irasom user info
//     const { brand, model, color, price } = data.payload;

//     const carObject = {
//         brand,
//         model,
//         color,
//         price,
//         registerDate: Date.now(),
//     }

//     const res = await _data.create('cars', brand, carObject);

//     if (res !== true) {
//         return callback(400, {
//             error: 'Nepavyko sukurti automobilio',
//         })
//     }

//     return callback(200, {
//         success: 'Automobilis sukurtas',
//     })
// }

// handlers._cars.put = async (data, callback) => {
//     // atnaujinam user info
//     const { brand, model, price } = data.payload;

//     if (!brand) {
//         return callback(400, {
//             error: 'Nenurodytas automobilis, kuriam reikia atnaujinti informacija',
//         })
//     }

//     if (!model && !price) {
//         return callback(400, {
//             error: 'Nenurodyta nei viena reiksme, kuria norima atnaujinti',
//         })
//     }

//     const content = await _data.read('cars', model);
//     if (content === '') {
//         return callback(400, {
//             error: 'Nurodytas modelis nerastas',
//         })
//     }

//     const contentObj = helpers.parseJsonToObject(content);

//     if (brand) {
//         // atnaujiname brand
//         contentObj.brand = brand;
//     }

// }

// const res = await _data.update('cars', model, contentObj);

// if (res) {
//     return callback(200, {
//         success: 'Vartotojo informacija atnaujinta',
//     })
// } else {
//     return callback(400, {
//         error: 'Ivyko klaida bandant atnaujinti automobilio informacija',
//     })
// }


// handlers._cars.delete = async (data, callback) => {
//     // istrinam user info
//     const brand = data.queryStringObject.get('brand');

//     if (brand === '') {
//         return callback(400, {
//             error: 'Nenurodytas brand parametras',
//         })
//     }

//     const res = await _data.delete('cars', brand);
//     if (res) {
//         return callback(200, {
//             success: 'Nurodytas automobilis istrintas',
//         })
//     } else {
//         return callback(400, {
//             error: 'Ivyko klaida bandant istrinti automobili',
//         })
//     }
// }

// module.exports = handlers;
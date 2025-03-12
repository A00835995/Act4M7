//confDB.js
require('dotenv').config();
const hana = require('@sap/hana-client');

const connParams = {
    serverNode: process.env.HANA_SERVERNODE,
    uid: process.env.HANA_USER,
    pwd: process.env.HANA_PASSWORD,
};

const connection = hana.createConnection();

async function connectToHANA() {
    try {
        connection.connect(connParams);
        console.log('Conectado a SAP HANA');
    } catch (error) {
        console.error('Error conectando a SAP HANA:', error);
    }
}

module.exports = { connection, connectToHANA };

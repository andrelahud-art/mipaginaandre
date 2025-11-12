// Conekta es un módulo CommonJS, usamos require dinámico
// eslint-disable-next-line @typescript-eslint/no-var-requires
const conekta = require('conekta');

// Configuración de Conekta
conekta.api_key = process.env.CONEKTA_PRIVATE_KEY!;
conekta.api_version = '2.0.0';
conekta.locale = 'es';

export default conekta;

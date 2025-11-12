import conekta from 'conekta';

// Configuración de Conekta
conekta.api_key = process.env.CONEKTA_PRIVATE_KEY!;
conekta.api_version = '2.0.0';
conekta.locale = 'es';

export default conekta;

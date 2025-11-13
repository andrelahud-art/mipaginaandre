// Conekta es un módulo CommonJS, usamos require dinámico
// eslint-disable-next-line @typescript-eslint/no-var-requires
const conektaModule = require('conekta');

// Función para inicializar Conekta
function initializeConekta() {
  if (!process.env.CONEKTA_PRIVATE_KEY) {
    throw new Error('CONEKTA_PRIVATE_KEY is not configured');
  }

  const instance = conektaModule;

  // Configurar solo si no está ya configurado
  if (!instance.api_key) {
    instance.api_key = process.env.CONEKTA_PRIVATE_KEY;
    instance.api_version = '2.0.0';
    instance.locale = 'es';
  }

  return instance;
}

// Exportar una función que devuelva la instancia configurada
export default {
  get Order() {
    return initializeConekta().Order;
  },
  get Customer() {
    return initializeConekta().Customer;
  },
  get Charge() {
    return initializeConekta().Charge;
  }
};

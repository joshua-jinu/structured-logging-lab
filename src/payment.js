const processPayment = (log) => {
  const requestLogger = log || { info: () => {}, warn: () => {}, error: () => {} };

  requestLogger.info('payment.processing');

  setTimeout(() => {
    requestLogger.info('payment.completed');
  }, 500);
};

module.exports = { processPayment };

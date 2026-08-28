const SERVICE_NAME = 'orders-api';

const normalizeLogArgs = (arg1, arg2 = {}) => {
  let msg = 'event';
  let meta = {};

  if (typeof arg1 === 'string') {
    msg = arg1;
    meta = arg2;
  } else if (arg1 && typeof arg1 === 'object') {
    meta = { ...arg1 };
    if (typeof meta.msg === 'string') {
      msg = meta.msg;
    } else if (typeof meta.message === 'string') {
      msg = meta.message;
    }
    delete meta.msg;
    delete meta.message;
  } else if (typeof arg1 !== 'undefined') {
    meta = { value: arg1 };
  }

  const { service: _service, ...safeMeta } = meta || {};
  return { msg, meta: safeMeta };
};

const log = (level, arg1, arg2 = {}) => {
  const { msg, meta } = normalizeLogArgs(arg1, arg2);
  const entry = {
    ts: new Date().toISOString(),
    level,
    service: SERVICE_NAME,
    msg,
    ...meta,
  };

  console.log(JSON.stringify(entry));
  return entry;
};

const createChildLogger = (bindings = {}) => ({
  info: (arg1, arg2 = {}) => log('info', arg1, { ...bindings, ...arg2 }),
  warn: (arg1, arg2 = {}) => log('warn', arg1, { ...bindings, ...arg2 }),
  error: (arg1, arg2 = {}) => log('error', arg1, { ...bindings, ...arg2 }),
  child: (extra = {}) => createChildLogger({ ...bindings, ...extra }),
});

const logger = {
  info: (arg1, arg2 = {}) => log('info', arg1, arg2),
  warn: (arg1, arg2 = {}) => log('warn', arg1, arg2),
  error: (arg1, arg2 = {}) => log('error', arg1, arg2),
  child: createChildLogger,
};

module.exports = logger;
module.exports.logger = logger;
module.exports.createChildLogger = createChildLogger;

const test = require("node:test");
const assert = require("node:assert/strict");
const logger = require("../src/logger");

test("logger emits JSON with required fields", () => {
  const original = console.log;
  let captured = "";
  console.log = (message) => {
    captured = message;
  };

  try {
    logger.info({ msg: "payment.start", orderId: 8841 });
    const entry = JSON.parse(captured);
    assert.equal(entry.service, "orders-api");
    assert.equal(entry.msg, "payment.start");
    assert.equal(entry.level, "info");
    assert.ok(entry.ts);
  } finally {
    console.log = original;
  }
});

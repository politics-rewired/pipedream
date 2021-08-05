const pick = require("lodash.pick");
const stripe = require("../../stripe.app.js");

module.exports = {
  key: "stripe-list-balance-history",
  name: "List Balance History",
  version: "0.0.1",
  description: "Returns the last 100 transactions that have contributed to the Stripe account " +
    "balance (e.g., charges, transfers, and so forth). The transactions are returned in " +
    "sorted order, with the most recent transactions appearing first.",
  props: {
    stripe,
    payout: {
      propDefinition: [
        stripe,
        "payout",
      ],
    },
    currency: {
      propDefinition: [
        stripe,
        "currency",
      ],
    },
    type: {
      propDefinition: [
        stripe,
        "balance_transaction_type",
      ],
    },
  },
  async run() {
    const params = pick(this, [
      "payout",
      "type",
    ]);
    const { data } = await this.stripe.sdk().balanceTransactions.list(params);
    return data;
  },
};

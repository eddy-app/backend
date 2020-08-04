/**
 * Additional display information for your Stripe Plans
 * features - array of features specific to plan
 * highlight - boolean specifying whether plan should be highlighted
 */
const PLAN_INFO = {
  Free: {
    features: [
      "Up to 2 teams",
      "Up to 10 users",
      "Up to 20 devices",
      "No credit card required",
    ],
    highlight: false,
  },
  Starter: {
    features: [
      "Up to 5 teams",
      "Up to 50 users",
      "Up to 100 devices",
      "Remote access",
      "Remote lock",
      "Scheduled Upgrade",
    ],
    highlight: true,
  },
  Pro: {
    features: [
      " Up to 100 teams",
      "Up to 500 users",
      "Up to 1000 devices",
      "Remote access",
      "Remote lock",
      "Scheduled Upgrade",
      "Push Notifications",
    ],
    highlight: false,
  },
  Enterprise: {
    features: [
      " Unlimited teams",
      "Unlimited users",
      "Unlimited devices",
      "Remote access",
      "Remote lock",
      "Scheduled Upgrade",
      "Push Notifications",
    ],
    highlight: false,
  },
}

/**
 * One level deep version of Lodash's 'get' function: https://lodash.com/docs/4.17.15#get
 * @param {Object} obj
 * @param {string} property A key we expect to be present in "obj"
 * @param {*} defaultValue If "obj" or "obj[key]" are undefined, return this default value
 * @return {*} Value at obj[key] if defined, otherwise "defaultValue"
 */
const getValue = (obj, property, defaultValue) =>
  obj && obj[property] ? obj[property] : defaultValue

/**
 * @param {number} stripeAmount The price in cents
 * @return {string} The price represented as a formatted USD string ($X.YZ)
 */
const formatUSD = (stripeAmount) => `$${(stripeAmount / 100).toFixed(2)}`

/**
 * @param {string} USDString The price represented as a formatted USD string ($X.YZ)
 * @return {number} The price in cents
 */
const formatStripeAmount = (USDString) => parseFloat(USDString) * 100

module.exports = {
  PLAN_INFO,
  getValue,
  formatUSD,
  formatStripeAmount,
}

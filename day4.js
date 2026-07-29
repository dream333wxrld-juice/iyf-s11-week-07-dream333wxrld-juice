// Day 4: Refactor Challenge - Core Logic

const MINIMUM_PRICE_THRESHOLD = 10;
const BULK_DISCOUNT_THRESHOLD = 100;
const BULK_DISCOUNT_RATE = 0.9;

/**
 * Calculates the total cost of items above a minimum price threshold,
 * applying a bulk discount if the total exceeds a set amount.
 * @param {Array} items - Array of items with price and quantity
 * @returns {number} - Final calculated total
 */
function calculateOrderTotal(items) {
    if (!items || items.length === 0) {
        return 0;
    }

    const eligibleItems = items.filter(item => item.price > MINIMUM_PRICE_THRESHOLD);

    let total = eligibleItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    if (total > BULK_DISCOUNT_THRESHOLD) {
        total = total * BULK_DISCOUNT_RATE;
    }

    return total;
}
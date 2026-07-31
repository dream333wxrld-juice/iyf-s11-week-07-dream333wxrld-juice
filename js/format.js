// format.js - Pure utility functions

export function formatPrice(cents) {
    return `$${(cents / 100).toFixed(2)}`;
}

export function calculateDiscount(price, discountPercent) {
    if (price < 0 || discountPercent < 0) {
        return 0;
    }
    return price - (price * (discountPercent / 100));
}
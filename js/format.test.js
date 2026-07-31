// format.test.js - Unit tests for format.js

import { describe, it, expect } from 'vitest';
import { formatPrice, calculateDiscount } from './format.js';

describe('formatPrice', () => {
    it('formats whole dollars', () => {
        expect(formatPrice(500)).toBe('$5.00');
    });

    it('handles zero', () => {
        expect(formatPrice(0)).toBe('$0.00');
    });

    it('formats cents correctly', () => {
        expect(formatPrice(1099)).toBe('$10.99');
    });
});

describe('calculateDiscount', () => {
    it('calculates a 10% discount correctly', () => {
        expect(calculateDiscount(100, 10)).toBe(90);
    });

    it('returns 0 for negative price (edge case)', () => {
        expect(calculateDiscount(-50, 10)).toBe(0);
    });

    it('returns full price when discount is 0', () => {
        expect(calculateDiscount(100, 0)).toBe(100);
    });
});
/**
 * Generate @param n random numbers using a Linear Congruential Generator.
 * 
 * @param {number} seed
 * @param {number} mod 
 * @param {number} mul 
 * @param {number} inc 
 * @param {number} n 
 */
const lcg = function(seed, mod, mul, inc, n) {
    let rnd = [ seed ];
    for (let i = 1; i < n; i++) {
        rnd.push((rnd[i - 1] * mul + inc) % mod);
    }
    return rnd;
};

/**
 * Generate @param n random numbers 0 <= r <= max, feeding the LCG algorithm with the given seed.
 * 
 * @param {number} seed 
 * @param {number} max 
 * @param {number} n 
 */
const generateRandomIntegers = function(seed, max, n) {
    if (n <= 0) {
        return [];
    }
    const now = new Date().getTime();
    const [_, ...rnd] = lcg(seed, max, now & 0xFF, ((now >> 8) & 0xFF), n + 1);
    return rnd;
};

/**
 * Generate a single random number <= max with the given seed.
 * 
 * @param {number} seed 
 * @param {number} max 
 */
const generateRandomInteger = (seed, max) => generateRandomIntegers(seed, max, 1)[0];

/**
 * Determine whether given number n is prime.
 * 
 * @param {number} n 
 */
const isPrime = function(n) {
    if (n <= 3 || n % 2 == 0) {
        return n == 2 || n == 3;
    }
    let d = 3;
    while ((d <= Math.sqrt(n)) && n % d != 0) {
        d += 2;
    }
    return n % d != 0;
};

/**
 * Generate a random positive non-zero prime number.
 */
const generateRandomPrime = function() {
    let n;
    do {
        n = generateRandomInteger(
            new Date().getTime(),
            Number.MAX_VALUE
        ) + 1;
    } while (!isPrime(n));
    return n;
};

exports.generateRandomInteger = generateRandomInteger;
exports.isPrime = isPrime;
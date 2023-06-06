// @ts-check

/** 
 * Perform character-wise left shift in a string with carry.
 * 
 * @param {string} str,
 * @param {number} k
 */
const cyclicLeftShift = function(str, k) {
    k = k % str.length;
    return str.substring(k).concat(str.substring(0, k));
};

/**
 * Perform character-wise XOR between two (equally-lengthed) strings.
 * 
 * @param {string} str1 
 * @param {string} str2 
 * @returns {string}
 */
const xor = function(str1, str2) {
    let out = "";
    for (let i = 0; i < str1.length; i++) {
        // @ts-ignore
        out += str1.at(i) ^ str2.at(i);
    }
    return out;
};

/**
 * Split the input string in partSize-sized chunks and return them in an array.
 * 
 * @param {string} str 
 * @param {number} partSize 
 */
const splitEqually = function(str, partSize) {
    let parts = [];
    for (let start = 0; start < str.length; start += partSize) {
        parts.push(str.substring(start, Math.min(str.length, start + partSize)));
    }
    return parts;
};

/**
 * Return the decimal (number) representation of the input binary string.
 * 
 * @param {string} str 
 */
const binaryToDecimal = (str) => parseInt(str, 2);

/**
 * Return the binary string representation of the input number.
 * 
 * @param {number} n 
 * @returns {string}
 */
const decimalToBinaryString = (n) => n.toString(2);


/*************************/
/*     DES constants     */
/*************************/

const IP = [
    58, 50, 42, 34, 26, 18, 10 , 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7
];

const PC = [
    [
        57, 49, 41, 33, 25, 17,  9,
        1, 58, 50, 42, 34, 26, 18,
        10,  2, 59, 51, 43, 35, 27,
        19, 11,  3, 60, 52, 44, 36,
        63, 55, 47, 39, 31, 23, 15,
        7, 62, 54, 46, 38, 30, 22,
        14,  6, 61, 53, 45, 37, 29,
        21, 13,  5, 28, 20, 12,  4
    ], [
        14, 17, 11, 24,  1,  5,
        3, 28, 15,  6, 21, 10,
        23, 19, 12,  4, 26,  8,
        16,  7, 27, 20, 13,  2,
        41, 52, 31, 37, 47, 55,
        30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53,
        46, 42, 50, 36, 29, 32
    ]
];

const KS = [
    1,  1,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  1
];

const E = [
    32,  1,  2,  3,  4,  5,
    4,  5,  6,  7,  8,  9, 
    8,  9, 10, 11, 12, 13, 
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21, 
    20, 21, 22, 23, 24, 25, 
    24, 25, 26, 27, 28, 29, 
    28, 29, 30, 31, 32,  1
];

const S = [
    [
        [14, 4, 13,  1,  2, 15, 11,  8,  3, 10,  6, 12,  5,  9,  0,  7],
        [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11,  9,  5,  3,  8],
        [4, 1, 14,  8, 13,  6, 2, 11, 15, 12,  9,  7,  3, 10,  5,  0],
        [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ],
    [
        [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
        [3, 13,  4, 7, 15,  2,  8, 14, 12,  0, 1, 10,  6,  9, 11,  5],
        [0, 14, 7, 11, 10,  4, 13,  1,  5,  8, 12,  6,  9,  3,  2, 15],
        [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ],
    [
        [10, 0, 9, 14, 6, 3, 15, 5,  1, 13, 12, 7, 11, 4, 2,  8],
        [13, 7, 0, 9, 3,  4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
        [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14,  7],
        [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ],
    [
        [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
        [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14,  9],
        [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
        [3, 15, 0, 6, 10, 1, 13, 8, 9,  4, 5, 11, 12, 7, 2, 14]
    ],
    [
        [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
        [14, 11, 2, 12,  4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
        [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
        [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ],
    [
        [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
        [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
        [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
        [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ],
    [
        [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
        [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
        [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
        [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ],
    [
        [13, 2, 8,  4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
        [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6 ,11, 0, 14, 9, 2],
        [7, 11, 4, 1, 9, 12, 14, 2,  0, 6, 10 ,13, 15, 3, 5, 8],
        [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
];

const RP = [
    16,  7, 20, 21,
    29, 12, 28, 17,
    1,  15, 23, 26,
    5,  18, 31, 10,
    2,   8, 24, 14, 
    32, 27,  3,  9, 
    19, 13, 30,  6, 
    22, 11,  4, 25
];

const FP = [
    40, 8, 48, 16, 56, 24, 64, 32,
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43 ,11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25
]

/**
 * Perform DES block encoding with the Initial Permutation array IP.
 * 
 * @param {string} m 
 */
const encodeBlock = function(m) {
    return m.split('').map((c, i, arr) => arr[IP[i] - 1]).join("");
}

/**
 * Generate DES subkeys from the master key binary string.
 * 
 * @param {string} k 
 */
const generateSubkeys = function(k) {
    const subkeys = [];

    /* apply first key permutation */
    k = k.split('').map((c, i, arr) => arr[PC[0][i] - 1]).join("");

    /* split key in half */
    let Cn = [ k.substring(0, 28) ];
    let Dn = [ k.substring(28) ];

    /* generate i-th (half)key with i-th key shift */
    for (let i = 1; i <= KS.length; i++) {
        Cn.push(cyclicLeftShift(Cn[i - 1], KS[i - 1]));
        Dn.push(cyclicLeftShift(Dn[i - 1], KS[i - 1]));
    }

    /* join halves and apply second (sub)key permutation */
    for (let j = 1; j < Cn.length; j++) {
        let jthKey = Cn[j] + Dn[j];
        subkeys.push(jthKey.split('').map((c, ji, arr) => arr[PC[1][ji] - 1]).join(""));
    }

    return subkeys;
};

/**
 * Perform DES encryption rounds on the input string, upon which the Initial Permutation has
 * been applied, using the provided (sub)keys.
 * 
 * @param {string} ip 
 * @param {Array<string>} keys 
 */
const performRounds = function(ip, keys) {
    let Ln_1 = ip.substring(0, 32);
    let Rn_1 = ip.substring(32);
    let Ln = "", Rn = "", eRn_1;

    for (let ki = 0; ki < keys.length; ki++) {
        Ln = Rn_1;
        eRn_1 = E.map(e => Rn_1.charAt(e - 1)).join("");

        let xored = xor(eRn_1, keys[ki]);
        let bb = splitEqually(xored, 6);
        let cc = "";
        for (let i = 0; i < bb.length; i++) {
            let b = bb[i];
            // @ts-ignore
            let r = binaryToDecimal(b.at(0).concat(b.at(5)));
            let c = binaryToDecimal(b.substring(1, 5));
            cc += decimalToBinaryString(S[i][r][c]).padStart(4);
        }

        cc = cc.split('').map((c, i, arr) => arr[RP[i] - 1]).join("");
        Rn = xor(Ln_1, cc);

        Ln_1 = Ln;
        Rn_1 = Rn;
    }

    return Rn.concat(Ln).split('').map((c, i, arr) => arr[FP[i] - 1]).join("");
};

/**
 * Perform encryption using the DES algorithm on the provided message (as binary string)
 * using the provided key (as binary string).
 * 
 * @param {string} m 
 * @param {string} key 
 * @returns 
 */
const desEncryptBlock = function(m, key) {
    return performRounds(encodeBlock(m), generateSubkeys(key));
};

/**
 * Perform decryption using the DES algorithm on the provided message (as binary string)
 * using the provided key (as binary string).
 * 
 * @param {string} m 
 * @param {string} key 
 * @returns 
 */
const desDecryptBlock = function(m, key) {
    return performRounds(encodeBlock(m), generateSubkeys(key).reverse());
};

/**
 * Perform encryption using DES of an arbitrarily lengthed non-binary string.
 * 
 * @param {string} s 
 * @param {string} hexKey 
 */
const desEncrypt = function(s, hexKey) {
    const binKey = [...Buffer.from(hexKey, 'hex')].map(
        i => decimalToBinaryString(i).padStart(8, "0")).join("");
    return splitEqually(s, 8).map(chunk => {
        if (chunk.length < 8) {
            chunk = chunk.padEnd(8, '\x00');
        }
        const binChunk = chunk.split('').map(c => 
            decimalToBinaryString(c.charCodeAt(0)).padStart(8, "0")).join("");
        const bin = desEncryptBlock(binChunk, binKey);
        return bin.split('').flatMap((bit, i, arr) => {
            if ((i + 1) != 0 && (i + 1) % 8 == 0) {
                return [binaryToDecimal(bin.substring(i - 7, i + 1))
                    .toString(16)
                    .padStart(2, "0")
                ];
            }
            return [];
        }).join("");
    }).join("");
};

/**
 * Perform decryption using DES of an arbitrarily lengthed non-binary string.
 * 
 * @param {string} hexEnc
 * @param {string} hexKey 
 */
const desDecrypt = function(hexEnc, hexKey) {
    const binKey = [...Buffer.from(hexKey, 'hex')].map(
        i => decimalToBinaryString(i).padStart(8, "0")).join("");
    return splitEqually(hexEnc, 16).map(chunk => {
        const binChunk = [...Buffer.from(chunk, 'hex')].map(
            b => decimalToBinaryString(b).padStart(8, "0")).join("");
        const binDec = desDecryptBlock(binChunk, binKey);
        return binDec.split('').flatMap((bit, i, arr) => {
            if ((i + 1) != 0 && (i + 1) % 8 == 0) {
                return [binaryToDecimal(binDec.substring(i - 7, i + 1))];
            }
            return [];
        }).flatMap(ord => ord != 0 ? [String.fromCharCode(ord)] : []).join("");
    }).join("");
};

/**
 * Apply the Extended Euclidean Algorithm on integers a and b.
 * 
 * @param {number} a 
 * @param {number} b 
 */
const eea = function(a, b) {
    if (b == 0) {
        return [a, 1, 0];
    }
    const [gcd, x1, x2] = eea(b, a % b);
    const y = x1 - Math.round(a / b) * x2;
    return [gcd, x2, y];
};

/**
 * Compute private exponent d applying the EEA on the given public exponent and phi.
 * 
 * @param {number} e 
 * @param {number} phi 
 * @returns 
 */
const d = function(e, phi) {
    const [gcd, x] = eea(e, phi);
    if (gcd == 1) {
        return x % phi;
    }
    return NaN;
};

/**
 * Use the Euclidean Algorithm to compute the greatest common divisor of a and b.
 * 
 * @param {number} a 
 * @param {number} b 
 */
const gcd = function(a, b) {
    let t;
    while (b != 0) {
        t = b;
        b = a % b;
        a = t;
    }
    return a;
};

const _desEncrypt = desEncrypt;
export { _desEncrypt as desEncrypt };
const _desDecrypt = desDecrypt;
export { _desDecrypt as desDecrypt };
const _decimalToBinaryString = decimalToBinaryString;
export { _decimalToBinaryString as decimalToBinaryString };
import fs from "fs";

/**
 * Rsolves a promise after the delay
 * @param {number} delay 
 * @returns 
 */
export function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * 
 * @param {string} filePath 
 * @returns 
 */
export const readData = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    if (!data) {
        return [];
    }
    return JSON.parse(data);
};

/**
 * 
 * @param {object} data 
 * @param {string} filePath 
 */
export const writeData = (data, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


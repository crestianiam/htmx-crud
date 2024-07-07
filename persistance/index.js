import fs from "fs";
import path from "path";

/**
 * 
 * @param {string} folderPath 
 * @param {string} fileName 
 */
export const initPersistance = (folderPath, fileName) => {
    const filePath = path.join(folderPath, fileName);

    // folder verification
    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Folder ${folderPath} created`);
        } catch (err) {
            console.error(`Error during folder creation ${folderPath}:`, err);
        }
    } else {
        console.log(`Folder ${folderPath} already exists.`);
    }

    // file verification
    if (!fs.existsSync(filePath)) {
        try {
            fs.writeFileSync(filePath, '[]'); // Inizializza il file come un array vuoto (in formato JSON)
            console.log(`File ${filePath} created and initialized`);
        } catch (err) {
            console.error(`Error during file creation ${filePath}:`, err);
        }
    } else {
        console.log(`File ${filePath} already exists.`);
    }
};

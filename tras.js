import fs from 'fs';
import axios from 'axios';
import path from 'path';
import glob from 'glob';

// Function to translate text using MyMemory API
const translateText = async (text, targetLanguage) => {
  try {
    console.log(`Translating text: "${text}" to ${targetLanguage}`);
    const res = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `en|${targetLanguage}`
      }
    });
    return res.data.responseData.translatedText || text;
  } catch (err) {
    console.error('Translation error:', err);
    return text; // Return original text if translation fails
  }
};

// Function to translate content of a single file
const translateFile = async (file, targetLanguage) => {
  try {
    console.log(`Reading file: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    console.log(`Original content:\n`, content);

    // Regex to match text inside HTML tags
    const regex = />([^<]+)</g;
    let match;

    let changed = false; // Flag to check if any text was changed

    while ((match = regex.exec(content)) !== null) {
      const originalText = match[1].trim();
      if (originalText) {
        console.log(`Found text to translate: "${originalText}"`);
        const translatedText = await translateText(originalText, targetLanguage);
        if (originalText !== translatedText) {
          changed = true;
          console.log(`Replacing "${originalText}" with "${translatedText}"`);
          content = content.replace(originalText, translatedText);
        }
      }
    }

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Translated ${file}`);
    } else {
      console.log(`No text changes for ${file}`);
    }
  } catch (err) {
    console.error('Error during file translation:', err);
  }
};

// Function to translate all HTML files in a directory
const translateAllFiles = async (directory, targetLanguage) => {
  try {
    console.log(`Translating all files in directory: ${directory}`);
    const files = glob.sync(path.join(directory, '**/*.jsx'));
    if (files.length === 0) {
      console.log('No HTML files found.');
      return;
    }
    for (const file of files) {
      await translateFile(file, targetLanguage);
    }
    console.log('All files translated.');
  } catch (err) {
    console.error('Error during translating all files:', err);
  }
};

// Specify the directory and target language
const directory = './src'; // Replace with the path to your HTML files directory
const targetLanguage = 'fr'; // Target language code

translateAllFiles(directory, targetLanguage)
  .then(() => console.log('Translation complete'))
  .catch(err => console.error('Error during translation:', err));

import fs from 'fs';

function readConfigJson() {
  try {
    const configFile = fs.readFileSync('config.json', 'utf-8');
    const config = JSON.parse(configFile);
    return config;
  } catch (error) {
    console.error('Error reading config.json:', error);
    return null;
  }
}

export const config = readConfigJson();

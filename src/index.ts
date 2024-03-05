import { input } from '@inquirer/prompts';
import { readFile } from './controllers/readFiles.js';

const fileName = await input({ message: 'Enter File Path to Log File: ' });

readFile(fileName)
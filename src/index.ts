import select from '@inquirer/select';
import { input } from '@inquirer/prompts';



const fileFormat = await select({
    message: 'Select the file format of your log files',
    choices: [
        {
            name: 'json',
            value: 'json',
            description: 'Data objects consisting of attribute–value pairs and arrays (or other serializable values), It is a commonly used data format. ',
        },
        {
            name: 'text',
            value: 'text',
            description: 'A text file (sometimes spelled textfile; an old alternative name is flatfile) is a kind of computer file that is structured as a sequence of lines',
        },

    ],
});


const fileName = await input({ message: 'Enter Name of Log File: ' });


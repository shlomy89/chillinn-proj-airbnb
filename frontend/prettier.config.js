const fs = require('fs');
const path = require('path');

// We want to order the imports thusly: 3rd party -> absolute imports -> relative imports
const srcDirs = fs
    .readdirSync(path.resolve(__dirname, './src'))
    .map(n => n.split('.')[0])
    .filter(Boolean);

const importOrder = [
    `^(?!react)(?!${srcDirs.join('|')})[@a-z]`,
    `^(${srcDirs.join('|')})`,
    '^[./].*(?<!scss)$',
    '^[./]',
];

module.exports = {
    tabWidth: 4,
    arrowParens: 'avoid',
    singleQuote: true,
    printWidth: 120,
    endOfLine: 'auto',
    importOrder: importOrder,
    experimentalBabelParserPluginsList: ['jsx', 'classProperties', 'typescript'],
    overrides: [
        {
            files: ['*.json', '*.prettierrc'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};

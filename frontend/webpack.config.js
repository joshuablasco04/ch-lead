const path = require('path');

module.exports = {
  entry: './src/index.js',  // Adjust the entry point based on your project
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production', // Set mode to 'production' for minification
};
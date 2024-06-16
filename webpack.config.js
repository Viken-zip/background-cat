const path = require('path');

module.exports = {
  entry: './app.ts', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts?$/, // Match TypeScript files
        use: 'ts-loader', // Use ts-loader for TypeScript compilation
        exclude: /node_modules/,
      },
    ],
  },
};
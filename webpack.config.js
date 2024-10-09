// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js', // Entry point
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean the /dist folder before each build
    },
    module: {
        rules: [
            {
                test: /\.css$/,    // Process CSS files
                use: ['style-loader', 'css-loader']  // Use the CSS loader and style loader
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // Generates the HTML file
        })
    ],
    devServer: {
        static: './dist', // Serve files from /dist
        open: true, // Automatically open browser
        port: 3000, // Serve on http://localhost:3000
        hot: true, // Enable hot reloading
    },
    mode: 'development', // Development mode for easier debugging
};

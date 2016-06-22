'use strict';

module.exports = {

    entry: './scripts/calcApp.js',

    output: {
            path: './',
            filename: 'bundle.js',
            library: 'calcApp'
        },

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    }
};

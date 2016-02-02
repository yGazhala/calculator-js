'use strict';

module.exports = {

    entry: './scripts/calcInit.js',

    output: {
            path: './',
            filename: 'compiledCalc.js',
            library: 'calcApp'
        },

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }]
    }
};

/*
 loaders: [{
 test: /\.jsx?$/,
 exclude: /node_modules/,
 loader: 'babel', // 'babel-loader' is also a legal name to reference
 query: {
 presets: ['es2015']
 }
 }]
*/

/*loaders: [{
 test: /\.jsx?$/,
 loader: 'babel?optional=runtime'
 }]*/
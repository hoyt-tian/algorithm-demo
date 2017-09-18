/**
 * Created by htian on 5/25/2017.
 */

const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const html = require('html-webpack-plugin');
const cleanup = require('clean-webpack-plugin');

module.exports = {
    entry:{
        index:'./src/index.js'
    },
    devtool: 'source-map',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[hash].js'
    },
    module: {

        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }, 
        {
            test    : /\.jsx?$/,
            exclude : /node_modules/,
            loader  : 'babel-loader',
            query   : {
                 presets: ['react','es2015'] 
            }
        }, 
        {
            test   : /\.json$/,
            loader : 'json'
        },{
            test: /\.svg/,
                use: {
                    loader: 'svg-url-loader'
                }
        }
            ]
        
    },
    plugins:[
    new cleanup(['dist'],{
//        root:     __dirname,
        exclude:  [
            //'shared.js'
        ],
        verbose:  true,
        dry:      false
    }),
 
    new html({
        inject: true,
        title:'DM',
        template:'src/index.ejs',
        chunks:["index"]
    })
    ]
    
}
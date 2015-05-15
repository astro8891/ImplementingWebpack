 var path = require('path');
 var merge = require('./lib/merge');

 var TARGET = process.env.TARGET;
 var ROOT_PATH = path.resolve(__dirname);

 var common = {
 entry: [path.join(ROOT_PATH, 'app/main.js')],
 output: {
 path: path.resolve(ROOT_PATH, 'build'),
 filename: 'bundle.js',
 },
 module: {
 loaders: [
 {
 test: /\.css$/,
 loaders: ['style', 'css']
 }
 ]
 },
 };

 var mergeConfig = merge.bind(null, common);

 if(TARGET === 'build') {
 module.exports = mergeConfig({});
 }

 if(TARGET === 'dev') {
 module.exports = mergeConfig({
 entry: ['webpack/hot/dev-server'],
 module: {
 preLoaders: [
 {
 test: /\.jsx?$/,
 // we are using `eslint-loader` explicitly since
 // we have eslint module installed. This way we
 // can be certain that it uses the right loader
 loader: 'eslint-loader',
 include: path.join(ROOT_PATH, 'app'),
 }
 ],
 },
 });
 }
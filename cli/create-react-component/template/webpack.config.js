const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            titleProp: true, // 是否添加title属性到React组件中
                            refProp: 'innerRef', // 指定转换的SVG组件的ref属性名
                        },
                    },
                    'url-loader', // 或者使用'file-loader'，具体取决于你希望如何处理SVG文件
                ],
            },
        ],
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    plugins: [
        new JavaScriptObfuscator({
            rotateStringArray: true, // 启用字符串混淆
            stringArray: true, // 将字符串移到一个字符串数组中
            stringArrayThreshold: 0.75, // 混淆75%的字符串
        }, []), // 可以排除某些文件不被混淆
    ],
    mode: 'production',  // 设为'production'模式，启用优化
};

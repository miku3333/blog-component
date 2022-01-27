module.exports = {
    entry: "./src/components/index.js",
    output: {
        path: __dirname + '/dist',
        filename: "index.js",
        libraryTarget: "umd",
        library: 'blog-component-v2',
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'antd': 'antd'
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            "@babel/preset-env",
                            ["@babel/preset-react", {"runtime": "automatic"}]
                        ],
                        "plugins": [
                            "@babel/plugin-syntax-jsx"
                        ]
                    }
                },
                exclude: '/node-modules/'
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true  //开启css-loader模块化
                        }
                    },
                ],
            },
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true  //开启css-loader模块化
                        }
                    },
                    'sass-loader'
                ],
            },
        ]
    }
}
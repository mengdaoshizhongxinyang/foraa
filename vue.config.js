const options = {
    publicPath: './',
    configureWebpack: {
        resolve: {
            alias:{
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    },
 
    chainWebpack: (config) => {
        config.module.rule('md')
            .test(/\.md/)
            .use('text-loader')
            .loader('text-loader')
            .options({
                raw: true
            })
    },
    css: {
        loaderOptions: {
            less: {
                // TODO
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        port: 8100
    },
    productionSourceMap: false,
    transpileDependencies: []
};
module.exports = options
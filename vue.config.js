module.exports = {
    devServer: {
        proxy: {
            '/api/aaa': {
                target: 'https://isbn.market.alicloudapi.com/',
                changeOrigin: true,
                pathRewrite: {
                    '/api/aaa': '',
                }
            },
            '/api': {
                target: 'http://localhost:8080/',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '',//重写,
                }
            }
        },
        // before: app => {}
    }, // 第三方插件配置
    pluginOptions: {
        // ...
    }
};
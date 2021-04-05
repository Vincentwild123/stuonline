module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'API': '@/API',
        'axios': '@/axios',
        'components': '@/components',
        'pages': '@/pages',
        'store': '@/store',
		'UI':'@/UI'
      }
    }
  }
}


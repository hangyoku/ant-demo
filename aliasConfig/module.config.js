'use static'
var path = require('path')
var srcDir = path.resolve(process.cwd(), 'src')

module.exports = {
  vue$: 'vue/dist/vue.esm',

  HelloWorld: srcDir + '/components/HelloWorld.vue',
  index:srcDir+'/pages/index.vue',
  testVue: srcDir + '/views/test.vue'
}
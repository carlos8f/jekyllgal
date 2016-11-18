var reader = require('rreaddir')
var matcher = require('minimatch')
var assert = require('assert')
var argv = require('minimist')(process.argv.slice(2))
var path = require('path')

var out = '---\nw'
  + 'title: \n' 
  + 'category: gallery\n'
  + 'layout: post\n'
  + '---\n\n'

var prefix = process.cwd()
if (argv.prefix) {
  prefix = argv.prefix
}

reader(prefix, function (err, files) {
  assert.ifError(err)
  files.forEach(function (file) {
    file = file.replace(prefix, '')
    //console.error('file', file)
    if (file.match(/\.(jpg|jpeg)$/i)) {
      out += '![' + path.basename(file) + '](' + file + ')\n\n'
    }
  })
  console.log(out)
})

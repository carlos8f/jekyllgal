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

var dir = process.cwd()
if (argv.dir) {
  dir = argv.dir
}
var prefix = ''
if (argv.prefix) {
  prefix = argv.prefix
}

reader(dir, function (err, files) {
  assert.ifError(err)
  files.forEach(function (file) {
    file = file.replace(dir, '')
    //console.error('file', file)
    if (file.match(/\.(jpg|jpeg)$/i)) {
      out += '![' + path.basename(file) + '](' + prefix + file + ')\n\n'
    }
  })
  console.log(out)
})

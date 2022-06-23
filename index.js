const path = require('path')
const fs = require('fs')
const wordp = require(path.resolve(__dirname, './lib/wordp.js'))
const dic = fs.readFileSync(path.resolve(__dirname, './dic'), 'utf8')

module.exports = function(word) {
    return wordp.search(dic, word)
}
#!/usr/bin/env node

const path = require('path')
const pkg = require('./package.json')
const output = require('./lib/output.js')
const wordp = require('./lib/wordp.js')
const argv = require('./lib/argv.js')
const fs = require('fs')
const dic = fs.readFileSync('./dic', 'utf8')
const word = argv.get('--word') || argv.get('-w') || argv.param(0)

if (argv.is('-v') || argv.is('--version')) {
    output.ok(pkg.version)
} else if (argv.is('-h') || argv.is('--help')) {
    output.ok('Just pass your word after cli command.')
} else if (word) {
    wordp.search(dic, word).then(words => {
        const userOutputPath = argv.get('--output') || argv.get('-o')
        if (userOutputPath) {
            const outputPath = path.resolve(process.cwd(), userOutputPath)
            fs.writeFileSync(outputPath, words.join("\n"))
            output.ok(outputPath + ' created!')
        } else {
            output.ok("\n" + words.join("\n"))
        }
    }).catch(err => {
        output.error(err)
    })
} else {
    output.error('Unhandled parameters.')
}
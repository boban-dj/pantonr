#!/usr/bin/env node

var program = require('commander')
var pantonr = require('..')
var fs = require('fs')
var stdin = require('stdin');

var version = '0.0.1'

console.log('Pantonr CLI (' + version + ')')

program
  .version(version)

program
  .command('pms [pms]', 'convert PMS color to other formats', {
    isDefault: true
  })
  .action(function (pms) {
    console.log(pms);
    if (!pms) {
      console.log('Please specify a PMS color')
      return
    }

    try {
      console.log(JSON.stringify(pantonr(pms), null, 2))
    } catch (e) {
      console.log('Pantonr encountered an error finding ' + pms)
      console.log(e)
    }
  })

program.parse(process.argv)

if (!program.args.length) {
  console.log('Input a PMS color\n^C to cancel\n^D when complete')

  stdin(function (pms) {
    if (pms) {
      console.log(JSON.stringify(pantonr(pms), null, 2))
    }
  })
}

#! /usr/bin/env node

var siteswap = require('siteswap-generator')

var args = process.argv.slice(2)

var config = createConfig([
  {
    name: ['b', 'balls'],
    cb: range
  },
  {
    name: ['p', 'period'],
    cb: range
  },
  {
    name: ['h', 'height'],
    cb: range
  },
  {
    name: ['s', 'slice'],
    cb: parseInt
  }
])

var options  = parse(args, config)
var buffer   = siteswap.Buffer(options)
var patterns = buffer.slice(0, options.slice)
console.log(patterns)

function parse (args, config) {
  var options = {
    _: []
  }
  var currentParse
  args.forEach(function (arg) {
    var variable = parseVariable(arg)
    if (variable) {
      var variableParse = config[variable]
      if (variableParse) {
        currentParse = {
          name: variable,
          alias: variableParse.alias,
          cb: variableParse.cb
        }
      } else {
        currentParse = {
          name: variable
        }
      }
    } else if (currentParse) {
      var cb   = currentParse.cb
      var name = currentParse.name 
      options[name] = cb ? cb(arg) : arg
      var alias = currentParse.alias
      alias.forEach(function (a) {
        options[a] = options[name]
      })
      currentParse = undefined
    } else {
      options._.push(arg)
    }
  })

  return options
}

function createConfig (options) {
  return options.reduce(function (obj, e) {
    e.name.forEach(function (name, i) {
      var arr = [].concat(e.name)
      arr.splice(i, 1)
      obj[name] = {
        alias: arr,
        cb: e.cb
      }
    })
    return obj
  }, {})
}

function range(val) {
  var rg = val.split('..').map(Number)
  if (rg.length <= 1) {
    return {
      max: rg[0]
    }
  } else {
    return {
      min: rg[0],
      max: rg[1]
    }
  }
}

function parseVariable (variable) {
  if (variable.slice(0,2) === '--') {
    return variable.slice(2)
  } else if (variable[0]  === '-' ) {
    return variable.slice(1)
  }
}
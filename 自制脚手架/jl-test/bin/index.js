#!/usr/local/bin/env node
const lib = require('jl-test-lib');
// 注册一个命令 jl-test init
const argv = require('process').argv;
const command = argv[2];
const options = argv.slice(3)

if (options) {
  let [option, param] = options;

  option = option.replace('--', '');
  
  if (lib[command]) {
    lib[command]({ option, param });
  } else {
    console.log('please input correct command')
  }
}


// 支持参数输入
if (command.startsWith('--') || command.startsWith('-')) {
  const globalOption = command.replace(/--|-/g, '')
  if (globalOption === 'version' || globalOption === 'V') {
    console.log('1.0.0')
  }
}

console.log(calc(1,3))
#!/usr/local/bin/env node

modules.export = {
  calc(a, b) {
    return a + b;
  },
  init() {
    console.log('init')
  }
}
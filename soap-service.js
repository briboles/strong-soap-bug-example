'use strict';

module.exports = {
  sayHelloSoap: {
    sayHelloSoap: {
      sayHello: (name, cb) => {
        cb({ greeting: `Hello ${name}, greetings from 1.1 version.` })
      }
    },
    sayHelloSoap12: {
      sayHello: (name, cb) => {
        cb({ greeting: `Hello ${name}, greetings from 1.2 version.` })
      }
    }
  }
}
'use strict';

var expect = require('chai').expect;
var soap = require('strong-soap').soap;

var server = require('./server');

const url = 'http://127.0.0.1:8000/service?wsdl';

describe('Soap test', () => {

  let client11;
  let client12;

  after(() => {
    server.close();
  })

  it('creates a 1.1 client', (done) => {
    const options = {
      envelopeKey: 'soap',
      forceSoapVersion: '1.1'
    }
    soap.createClient(url, options, (err, client) => {
      expect(err).to.not.exist;
      client11 = client;
      done();
    });
  });

  it('creates a 1.2 client', (done) => {
    const options = {
      envelopeKey: 'soap12',
      forceSoapVersion: '1.2'
    }
    soap.createClient(url, options, (err, client) => {
      expect(err).to.not.exist;
      client12 = client;
      done();
    });
  });
    
  it('Returns greeting as soap 1.1', (done) => {
    client11.sayHello({ firstName: 'Jonny McSoapington' }, (err, res) => {
      expect(err).to.not.exist;
      expect(res).to.contain('1.1 version');
      done();
    });
  });

  it('Returns greeting as soap 1.2', (done) => {
    client12.sayHello({firstName: 'Jonny McSoapington' }, (err, res) => {
      expect(err).to.not.exist;
      expect(res).to.contain('1.2 version');
      // Uncaught AssertionError: expected 'Hello Jonny McSoapington, greetings from 1.1 version.' to include '1.2 version'
      done();
    });
  });
});
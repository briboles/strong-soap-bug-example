# strong-soap-bug-example
An example of a issue I encountered in strong soap. Repo created to aid in debugging.


# Issue Summary

Services defined in a WSDL that supports both SOAP 1.1 and 1.2 versions on the same route does not honor the expected port binding when executing the code. 

The example sets up a service with 2 different port bindings on the same location. Each with a different function to call during the request execution. When this location is called using either a SOAP 1.1 or SOAP 1.2 envelope from the client the SOAP server always uses the port listed first in the list.

```xml
<wsdl:service name="sayHelloSoap">
  <wsdl:port name="sayHelloSoap" binding="tns:sayHelloSoap">
    <soap:address location="http://127.0.0.1:8000/service" />
  </wsdl:port>
  <wsdl:port name="sayHelloSoap12" binding="tns:sayHelloSoap12">
    <soap12:address location="http://127.0.0.1:8000/service" />
  </wsdl:port>
</wsdl:service>
```

```javascript
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
```

```javascript

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

it('Returns greeting as soap 1.2', (done) => {
  client12.sayHello({ firstName: 'Jonny McSoapington' }, (err, res) => {
    expect(err).to.not.exist;
    expect(res).to.contain('1.2 version');
    // Uncaught AssertionError: expected 'Hello Jonny McSoapington, greetings from 1.1 version.' to include '1.2 version'
    done();
  });
});

```
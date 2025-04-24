'use strict';

 /* eslint-disable sonarjs/no-nested-functions */

sap.ui.require([
  'sap/ui/core/util/MockServer',
  'sap/ui/model/odata/v2/ODataModel',
  'openui5/model/odata/v2/ODataModelPromise'
], function(MockServer, ODataModel, ODataModelPromise) {
  const {test} = QUnit;
  const serviceUrl = 'https://services.odata.org/V2/Northwind/Northwind.svc';
  const entityName = 'Employees';
  const entityPath = ['/', entityName].join('');
  const mockServer = new MockServer({
    rootUri: 'https://services.odata.org/V2/Northwind/Northwind.svc/',
    recordRequests: false
  });
  mockServer.simulate('../testdata/metadata.xml', {
    bGenerateMissingMockData: true
  });
  const payload = {
    FirstName: 'Goku',
    LastName: 'Son',
    Country: 'Kakarot',
    HireDate: new Date('1984-12-03')
  };
  let model = {};

  QUnit.module('ODataModelPromise ($batch false)', {
    before: function() {
      mockServer.start();
    },
    beforeEach: function() {
      mockServer._refreshData();
      model = new ODataModelPromise(serviceUrl, {
        useBatch: false
      });
    },
    after: function() {
      mockServer.stop();
    },
    afterEach: function() {
      model.destroy();
      model = null;
      mockServer._refreshData();
    }
  }, function() {
    QUnit.module('constructor', () => {
      test('Should instantiate the control', (assert) => {
        window.model = model;
        window.mockServer = mockServer;
        assert.strictEqual(model instanceof ODataModel, true);
        assert.strictEqual(model.sServiceUrl, serviceUrl);
      });
    });

    QUnit.module('create', () => {
      test('Should create a single entity record', (assert) => {
        const totalRecordsBefore = mockServer.getEntitySetData(entityName).length;
        return model.metadataLoaded()
            .then(function() {
              return model.create(entityPath, payload);
            })
            .then(function(data) {
              const totalRecordsAfter = mockServer.getEntitySetData(entityName).length;
              assert.deepEqual(totalRecordsAfter - totalRecordsBefore, 1);
              assert.deepEqual(typeof data, 'object');
              assert.deepEqual(data.FirstName, payload.FirstName);
              assert.deepEqual(data.LastName, payload.LastName);
              assert.deepEqual(data.Country, payload.Country);
              assert.deepEqual(data.HireDate, payload.HireDate);
            });
      });

      test('Should fail when creating entity', (assert) => {
        const totalRecordsBefore = mockServer.getEntitySetData(entityName).length;
        const payload = {
          HireDate: 'Invalid Date'
        };
        return model.metadataLoaded()
            .then(function() {
              return model.create('/SOMETHING', payload);
            })
            .catch(function(err) {
              const totalRecordsAfter = mockServer.getEntitySetData(entityName).length;
              assert.deepEqual(totalRecordsAfter - totalRecordsBefore, 0);
              assert.deepEqual(typeof err, 'object');
              assert.ok(err.message);
            });
      });
    });

    QUnit.module('read', () => {
      test('Should read entity collection', (assert) => {
        return model.metadataLoaded()
            .then(function() {
              return model.read(entityPath);
            })
            .then(function(data) {
              assert.deepEqual(typeof data, 'object');
              assert.deepEqual(Array.isArray(data.results), true);
              assert.deepEqual(data.results.length > 0, true);
            });
      });

      test('Should read a single entity record', (assert) => {
        const record = mockServer.getEntitySetData(entityName)[0];
        return model.metadataLoaded()
            .then(function() {
              const key = model.createKey(entityPath, {EmployeeID: record.EmployeeID});
              return model.read(key);
            })
            .then(function(data) {
              assert.deepEqual(typeof data, 'object');
              assert.deepEqual(data.EmployeeID, record.EmployeeID);
              assert.deepEqual(data.FirstName, record.FirstName);
              assert.deepEqual(data.LastName, record.LastName);
            });
      });

      test('Should fail when reading entity', (assert) => {
        return model.metadataLoaded()
            .then(function() {
              const key = model.createKey(entityPath, {EmployeeID: 666666666});
              return model.read(key);
            })
            .catch(function(err) {
              assert.deepEqual(typeof err, 'object');
              assert.ok(err.message);
              assert.equal(err.statusCode, 404);
            });
      });
    });

    QUnit.module('update', () => {
      test('Should update a single entity record', (assert) => {
        const record = mockServer.getEntitySetData(entityName)[0];
        const totalRecordsBefore = mockServer.getEntitySetData(entityName).length;
        const key = model.createKey(entityPath, {EmployeeID: record.EmployeeID});
        return model.metadataLoaded()
            .then(function() {
              return model.update(key, payload);
            })
            .then(function() {
              return model.read(key);
            })
            .then(function(data) {
              const totalRecordsAfter = mockServer.getEntitySetData(entityName).length;
              assert.deepEqual(totalRecordsAfter - totalRecordsBefore, 0);
              assert.deepEqual(typeof data, 'object');
              assert.deepEqual(data.FirstName, payload.FirstName);
              assert.deepEqual(data.LastName, payload.LastName);
              assert.deepEqual(data.Country, payload.Country);
              assert.deepEqual(data.HireDate, payload.HireDate);
              assert.deepEqual(data.EmployeeID, record.EmployeeID);
              assert.notEqual(data.FirstName, record.FirstName);
              assert.notEqual(data.LastName, record.LastName);
              assert.notEqual(data.Country, record.Country);
              assert.notEqual(data.HireDate, record.HireDate);
            });
      });

      test('Should fail when updating entity', (assert) => {
        const totalRecordsBefore = mockServer.getEntitySetData(entityName).length;
        const payload = {
          HireDatex: 'Invalid Date'
        };
        return model.metadataLoaded()
            .then(function() {
              const key = model.createKey(entityPath, {EmployeeID: ''});
              return model.update(key, payload);
            })
            .catch(function(err) {
              const totalRecordsAfter = mockServer.getEntitySetData(entityName).length;
              assert.deepEqual(totalRecordsAfter - totalRecordsBefore, 0);
              assert.deepEqual(typeof err, 'object');
              assert.ok(err.message);
              assert.notEqual(err.statusCode, undefined);
            });
      });
    });

    QUnit.module('remove', () => {
      test('Should delete a single entity record', (assert) => {
        const recordBefore = mockServer.getEntitySetData(entityName)[0];
        const totalRecordsBefore = mockServer.getEntitySetData(entityName).length;
        const key = model.createKey(entityPath, {EmployeeID: recordBefore.EmployeeID});
        return model.metadataLoaded()
            .then(function() {
              return model.remove(key);
            })
            .then(function() {
              const recordAfter = mockServer.getEntitySetData(entityName)[0];
              const totalRecordsAfter = mockServer.getEntitySetData(entityName).length;
              assert.deepEqual(totalRecordsAfter - totalRecordsBefore, -1);
              assert.notEqual(recordAfter.EmployeeID, recordBefore.EmployeeID);
              assert.notEqual(recordAfter.FirstName, recordBefore.FirstName);
              assert.notEqual(recordAfter.LastName, recordBefore.LastName);
            });
      });

      test('Should fail when deleting entity', (assert) => {
        const recordBefore = mockServer.getEntitySetData(entityName)[0];
        const totalRecordsBefore = mockServer.getEntitySetData(entityName).length;
        return model.metadataLoaded()
            .then(function() {
              const key = model.createKey(entityPath, {EmployeeID: 666666666});
              return model.remove(key);
            })
            .catch(function(err) {
              const recordAfter = mockServer.getEntitySetData(entityName)[0];
              const totalRecordsAfter = mockServer.getEntitySetData(entityName).length;
              assert.deepEqual(totalRecordsAfter - totalRecordsBefore, 0);
              assert.deepEqual(recordAfter, recordBefore);
              assert.deepEqual(typeof err, 'object');
              assert.ok(err.message);
              assert.notEqual(err.statusCode, undefined);
            });
      });
    });
  });
});

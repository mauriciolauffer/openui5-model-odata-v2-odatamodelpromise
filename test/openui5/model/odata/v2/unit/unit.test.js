'use strict';

describe('QUnit test page', () => {
  it('should pass QUnit tests', async () => {
    const url = 'http://localhost:8080/test-resources/openui5/model/odata/v2/unit/unitTests.html';
    await browser.url(url);
    await browser.getQUnitResults();
  });
});

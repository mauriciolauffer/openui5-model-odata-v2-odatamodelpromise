'use strict';

/*
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/Core',
  'sap/ui/core/library'
],
/**
 * Module Dependencies
 *
 * @param {sap.ui.core.Core} Core - sap.ui.core.Core
 * @returns {object} openui5.model.odata.v2 library
 */
function(Core) {
  /**
   * OpenUI5 library: openui5.model.odata.v2
   *
   * @namespace
   * @name openui5.model.odata.v2
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  Core.initLibrary({
    name: 'openui5.model.odata.v2',
    dependencies: [
      'sap.ui.core'
    ],
    controls: [
      'openui5.model.odata.v2.ODataModelPromise'
    ],
    noLibraryCSS: true,
    version: '${version}'
  });

  return openui5.model.odata.v2; // eslint-disable-line
});

'use strict';

/*
 * openui5-model-odata-v2-odatapromise
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/ui/core/Lib',
  'sap/ui/core/library'
],
/**
 * Module Dependencies
 * @param {sap.ui.core.Lib} Lib - sap.ui.core.Lib
 * @returns {object} openui5.model.odata.v2 library
 */
function(Lib) {
  /**
   * OpenUI5 library: openui5.model.odata.v2
   * @namespace
   * @name openui5.model.odata.v2
   * @author Mauricio Lauffer
   * @version 0.0.1
   * @public
   */
  return Lib.init({
    name: 'openui5.model.odata.v2',
    dependencies: [
      'sap.ui.core'
    ],
    controls: [
      'openui5.model.odata.v2.ODataModelPromise'
    ],
    noLibraryCSS: true,
    version: '0.0.1'
  });
});

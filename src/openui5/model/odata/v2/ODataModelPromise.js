'use strict';

/*
 * ${copyright}
 */

sap.ui.define([
  'sap/base/Log',
  'sap/ui/model/odata/v2/ODataModel'
],
/**
 * Module Dependencies
 *
 * @param {sap.base.Log} Log - UI5 Logger
 * @param {sap.ui.model.odata.v2.ODataModel} ODataModel - ODataModel v2
 * @returns {object} ODataModelPromise object
 */
function(Log, ODataModel) {
  const logger = Log.getLogger('openui5.model.odata.v2.ODataModelPromise');

  /**
   * OpenUI5 ODataModelPromise extends ODataModel to support Promises.
   *
   * @author Mauricio Lauffer
   * @version ${version}
   * @class
   * @namespace
   * @name openui5.model.odata.v2
   * @public
   * @alias openui5.model.odata.v2.ODataModelPromise
   */
  const ODataModelPromise = ODataModel.extend('openui5.model.odata.v2.ODataModelPromise', {
    metadata: {
      library: 'openui5.model.odata.v2'
    },

    /**
     * Constructor for a new ODataModelPromise.
     *
     * @class
     * @augments sap.ui.model.odata.ODataModelPromise
     * @public
     */
    constructor: function() {
      ODataModel.apply(this, arguments);
    }
  });

  /**
   * Promisify sap.ui.model.odata.v2.ODataModel.create.
   * Callback parameters success and error are converted to Promise resolve and reject.
   *
   * @param {string} sPath - Same as in sap.ui.model.odata.v2.ODataModel.create
   * @param {object} oData - Same as in sap.ui.model.odata.v2.ODataModel.create
   * @param {object} mParameters - Same as in sap.ui.model.odata.v2.ODataModel.create
   * @returns {Promise<object>} Returns a Promise with sap.ui.model.odata.v2.ODataModel.create results
   * @public
   */
  ODataModelPromise.prototype.create = function(sPath, oData, mParameters) {
    logger.debug('ODataModelPromise.create called');
    return new Promise(function(resolve, reject) {
      const params = mParameters || {};
      const args = [sPath, oData, params];
      params.error = reject;
      params.success = resolve;
      ODataModel.prototype.create.apply(this, args);
    }.bind(this));
  };

  /**
   * Promisify sap.ui.model.odata.v2.ODataModel.read.
   * Callback parameters success and error are converted to Promise resolve and reject.
   *
   * @param {string} sPath - Same as in sap.ui.model.odata.v2.ODataModel.read
   * @param {object} mParameters - Same as in sap.ui.model.odata.v2.ODataModel.read
   * @returns {Promise<object>} Returns a Promise with sap.ui.model.odata.v2.ODataModel.read results
   * @public
   */
  ODataModelPromise.prototype.read = function(sPath, mParameters) {
    logger.debug('ODataModelPromise.read called');
    return new Promise(function(resolve, reject) {
      const params = mParameters || {};
      const args = [sPath, params];
      params.error = reject;
      params.success = resolve;
      ODataModel.prototype.read.apply(this, args);
    }.bind(this));
  };

  /**
   * Promisify sap.ui.model.odata.v2.ODataModel.update.
   * Callback parameters success and error are converted to Promise resolve and reject.
   *
   * @param {string} sPath - Same as in sap.ui.model.odata.v2.ODataModel.update
   * @param {object} oData - Same as in sap.ui.model.odata.v2.ODataModel.update
   * @param {object} mParameters - Same as in sap.ui.model.odata.v2.ODataModel.update
   * @returns {Promise<object>} Returns a Promise with sap.ui.model.odata.v2.ODataModel.update results
   * @public
   */
  ODataModelPromise.prototype.update = function(sPath, oData, mParameters) {
    logger.debug('ODataModelPromise.update called');
    return new Promise(function(resolve, reject) {
      const params = mParameters || {};
      const args = [sPath, oData, params];
      params.error = reject;
      params.success = resolve;
      ODataModel.prototype.update.apply(this, args);
    }.bind(this));
  };

  /**
   * Promisify sap.ui.model.odata.v2.ODataModel.remove.
   * Callback parameters success and error are converted to Promise resolve and reject.
   *
   * @param {string} sPath - Same as in sap.ui.model.odata.v2.ODataModel.remove
   * @param {object} mParameters - Same as in sap.ui.model.odata.v2.ODataModel.remove
   * @returns {Promise<object>} Returns a Promise with sap.ui.model.odata.v2.ODataModel.remove results
   * @public
   */
  ODataModelPromise.prototype.remove = function(sPath, mParameters) {
    logger.debug('ODataModelPromise.remove called');
    return new Promise(function(resolve, reject) {
      const params = mParameters || {};
      const args = [sPath, params];
      params.error = reject;
      params.success = resolve;
      ODataModel.prototype.remove.apply(this, args);
    }.bind(this));
  };

  /**
   * Promisify sap.ui.model.odata.v2.ODataModel.callFunction.
   * Callback parameters success and error are converted to Promise resolve and reject.
   *
   * @param {string} sFunctionName - Same as in sap.ui.model.odata.v2.ODataModel.callFunction
   * @param {object} mParameters - Same as in sap.ui.model.odata.v2.ODataModel.callFunction
   * @returns {Promise<object>} Returns a Promise with sap.ui.model.odata.v2.ODataModel.callFunction results
   * @public
   */
  ODataModelPromise.prototype.callFunction = function(sFunctionName, mParameters) {
    logger.debug('ODataModelPromise.callFunction called');
    return new Promise(function(resolve, reject) {
      const params = mParameters || {};
      const args = [sFunctionName, params];
      params.error = reject;
      params.success = resolve;
      ODataModel.prototype.callFunction.apply(this, args);
    }.bind(this));
  };

  return ODataModelPromise;
});

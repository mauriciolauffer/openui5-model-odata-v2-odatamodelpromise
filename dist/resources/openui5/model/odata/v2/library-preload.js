//@ui5-bundle openui5/model/odata/v2/library-preload.js
sap.ui.require.preload({
	"openui5/model/odata/v2/ODataModelPromise.js":function(){"use strict";
/*
 * openui5-model-odata-v2-odatapromise
 * (c) Copyright 2018-2022 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/base/Log","sap/ui/model/odata/v2/ODataModel"],function(e,o){const t=e.getLogger("openui5.model.odata.v2.ODataModelPromise");const n=o.extend("openui5.model.odata.v2.ODataModelPromise",{metadata:{library:"openui5.model.odata.v2"},constructor:function(){o.apply(this,arguments)}});n.prototype.create=function(e,n,r){t.debug("ODataModelPromise.create called");return new Promise(function(t,s){const a=r||{};const c=[e,n,a];a.error=s;a.success=t;o.prototype.create.apply(this,c)}.bind(this))};n.prototype.read=function(e,n){t.debug("ODataModelPromise.read called");return new Promise(function(t,r){const s=n||{};const a=[e,s];s.error=r;s.success=t;o.prototype.read.apply(this,a)}.bind(this))};n.prototype.update=function(e,n,r){t.debug("ODataModelPromise.update called");return new Promise(function(t,s){const a=r||{};const c=[e,n,a];a.error=s;a.success=t;o.prototype.update.apply(this,c)}.bind(this))};n.prototype.remove=function(e,n){t.debug("ODataModelPromise.remove called");return new Promise(function(t,r){const s=n||{};const a=[e,s];s.error=r;s.success=t;o.prototype.remove.apply(this,a)}.bind(this))};n.prototype.callFunction=function(e,n){t.debug("ODataModelPromise.callFunction called");return new Promise(function(t,r){const s=n||{};const a=[e,s];s.error=r;s.success=t;o.prototype.callFunction.apply(this,a)}.bind(this))};return n});
},
	"openui5/model/odata/v2/library.js":function(){"use strict";
/*
 * openui5-model-odata-v2-odatapromise
 * (c) Copyright 2018-2022 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/ui/core/Core","sap/ui/core/library"],function(e){e.initLibrary({name:"openui5.model.odata.v2",dependencies:["sap.ui.core"],controls:["openui5.model.odata.v2.ODataModelPromise"],noLibraryCSS:true,version:"0.0.1"});return openui5.model.odata.v2});
},
	"openui5/model/odata/v2/manifest.json":'{"sap.app":{"id":"openui5.model.odata.v2","type":"library","applicationVersion":{"version":"0.0.1"},"title":"An OpenUI5 library which extends sap.ui.model.odata.v2.ODataModel to support Promises"},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.56.0","libs":{"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true}}}'
});

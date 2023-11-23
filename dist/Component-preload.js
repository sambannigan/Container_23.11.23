//@ui5-bundle ContainerTransfer/containertransferapp/Component-preload.js
sap.ui.require.preload({
	"ContainerTransfer/containertransferapp/Component.js":function(){
sap.ui.define(["sap/suite/ui/generic/template/lib/AppComponent"],function(e){"use strict";return e.extend("ContainerTransfer.containertransferapp.Component",{metadata:{manifest:"json"}})});
},
	"ContainerTransfer/containertransferapp/ext/controller/ListReportExt.controller.js":'sap.ui.define(["sap/m/MessageToast","sap/ui/core/library"],function(e,a){"use strict";var t=a.ValueState;return{handleLiveChange:function(e){var a=e.getSource(),r=a.getValue().length,s=a.getMaxLength(),o=r>s?t.Warning:t.None;console.log(a);console.log(r);a.setValueState(o);var n=e.getSource();var i=e.getSource().getId();if(i=="contExcludeInput"){n.setValue(n.getValue().toUpperCase())}},onLiveChangeLoad:function(e){var a=e.getSource();a.setValue(a.getValue().toUpperCase())},Load:function(a){var t=this.extensionAPI.getSelectedContexts();var r=t[0];var s="";var o;var n;var i=r.oModel.getData(r.sPath).Status;if(t.length>1){sap.m.MessageBox.error("Please Select 1 Entry")}else if(r.oModel.getData(r.sPath).ExcludedFlag==1){sap.m.MessageBox.error("Unable to Load. Container has been excluded.")}else{if(r!=undefined){s=r.oModel.getData(r.sPath).ContainerNumber;o=r.oModel.getData(r.sPath).WagonNumber;n=r.oModel.getData(r.sPath).Slot}this._DialogGenerate=sap.ui.xmlfragment("ContainerTransfer.containertransferapp.ext.fragment.updateLoadingDialog",this);var d=sap.ui.getCore().byId("idUpdateLoading");d.setTitle("Load "+s);if(i=="Pending"){e.show("Please Stage Prior to Loading.");this.onActionCancel()}else{this.getView().addDependent(this._DialogGenerate);this._DialogGenerate.open()}}},Stage:function(e){var a=this.extensionAPI.getSelectedContexts();var t=a[0];if(a.length>1){sap.m.MessageBox.error("Please Select 1 Entry")}else{var r=t.oModel.getData(t.sPath).LoadingPoint;var s=t.oModel.getData(t.sPath).Location;var o=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSCM_CONTAINERTRANSF_SRV");o.read(`/ZSCM_I_ContainerTransfer_S1?$filter=LoadingPoint eq \'${r}\'`,{success:function(e,a){var t=new sap.ui.model.json.JSONModel;t.setData(e.results);sap.ui.getCore().byId("locationComboBox").setModel(t);sap.ui.getCore().byId("locationComboBox").setSelectedKey(s)}.bind(this)});this._DialogGenerate=sap.ui.xmlfragment("ContainerTransfer.containertransferapp.ext.fragment.updateStagingDialog",this);this._DialogGenerate.open()}},excludeContainer:function(e){var a=this.extensionAPI.getSelectedContexts();var t=a[0];var r=t.oModel.getData(t.sPath).ContainerNumber;var s=t.oModel.getData(t.sPath).ExcludedFlag;if(s==1){var o;var n;var i={};var d={};var a=this.extensionAPI.getSelectedContexts();var t=a[0];var p=t.oModel.getData(t.sPath).SAP_UUID;var c=this.extensionAPI;var u=t.oModel.getData(t.sPath).ContainerNumber;i={SAP_UUID:p};o=this.extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001",[],i);o.then(function(e){d={ID:e[0].response.data.ID,BSMNumber:e[0].response.data.BSMNumber,SalesOrder:e[0].response.data.SalesOrder,WagonNumber:e[0].response.data.WagonNumber,ContainerLoadPad:e[0].response.data.ContainerLoadPad,ContainerNumber:e[0].response.data.ContainerNumber,SealNumber:e[0].response.data.SealNumber,Carrier:e[0].response.data.Carrier,Buyer:e[0].response.data.Buyer,Stevedore:e[0].response.data.Stevedore,ActualPackingDate:e[0].response.data.ActualPackingDate,SAP_Description:e[0].response.data.SAP_Description,Location:e[0].response.data.Location,NetWeight:e[0].response.data.NetWeight,PRAStatus:e[0].response.data.PRAStatus,Slot:e[0].response.data.Slot,Status:e[0].response.data.Status,LoadingDate:e[0].response.data.LoadingDate,TrainID:e[0].response.data.TrainID,CheckPost:"",ExcludedFlag:0,Stevedorecode:e[0].response.data.Stevedorecode,LoadingPoint:e[0].response.data.LoadingPoint,DestLocation:e[0].response.data.DestLocation,VesselNumber:e[0].response.data.VesselNumber,WagonNet:e[0].response.data.WagonNet,GrossWeight:e[0].response.data.GrossWeight,Voyage:e[0].response.data.Voyage,PortOfDischargeCode:e[0].response.data.PortOfDischargeCode,PortOfDischargeName:e[0].response.data.PortOfDischargeName,ExclusionReason:""};n=c.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert",[],d);n.then(function(e){sap.m.MessageToast.show("Container Included");sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true)});n.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)})});o.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)})}else{this._DialogGenerate=sap.ui.xmlfragment("ContainerTransfer.containertransferapp.ext.fragment.excludeContainerDialog",this);var g=sap.ui.getCore().byId("idExcludeCont");g.setTitle("Exclude Container "+r);this.getView().addDependent(this._DialogGenerate);this._DialogGenerate.open()}},validate:function(e){var a=this.extensionAPI.getSelectedContexts();for(let e=0;e<a.length;e++){var t=a[e].oModel.getData(a[e].sPath).SAP_UUID;var r=a[e].oModel.getData(a[e].sPath).WagonNumber;var s=a[e].oModel.getData(a[e].sPath).HUNumber;var o=a[e].oModel.getData(a[e].sPath).ExcludedFlag;var n="";var i=0;r=a[e].oModel.getData(a[e].sPath).WagonNumber;if(r==""){if(i>0){n+=", "}n+="Wagon Number not entered";i+=1}if(s==""){if(i>0){n+=", "}n+="HU not found for container";i+=1}if(i==0){n="Success"}if(o==1){n="Container has been excluded"}updateCheck(r,t,n,this.extensionAPI)}},onActionCancel:function(){this._DialogGenerate.close();this._DialogGenerate.destroy();this.getView().removeDependent(this._DialogGenerate);this._DialogGenerate=null},_wagonSlotCheck:function(e,a,t,r){var s=t.toISOString().split("T")[0];var o=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSCM_CONTAINERTRANSF_SRV");return new Promise(function(t,n){o.read(`/ZSCM_C_ContainerTransfApp?$filter=WagonNumber eq \'${e}\' and Slot eq \'${a}\'`,{success:function(e,a){if(e.results.length===0){t(true)}else{var o=false;e.results.forEach(function(e){if(e.LoadingDate.indexOf(s)>=0&&e.ContainerNumber!==r){o=true}});if(o===true){t(false)}else{t(true)}}}.bind(this)})})},onActionOKLoad:function(e){var a=this.extensionAPI.getSelectedContexts();var t=a[0];var r;var s;var o={};var n={};var i=sap.ui.getCore().byId("containerInput").getValue();var d=sap.ui.getCore().byId("wagonInput").getValue();var p=sap.ui.getCore().byId("slotInput").getValue();var c=this.extensionAPI;if(i==""){sap.ui.getCore().byId("containerInput").setValueState(sap.ui.core.ValueState.Error)}else if(p==""){sap.ui.getCore().byId("wagonInput").setValueState(sap.ui.core.ValueState.Error)}else if(d==""){sap.ui.getCore().byId("slotInput").setValueState(sap.ui.core.ValueState.Error)}else{if(i===t.oModel.getData(t.sPath).HUNumber){i=t.oModel.getData(t.sPath).ContainerNumber}var u=t.oModel.getData(t.sPath).ContainerNumber;if(i==u){var g=t.oModel.getData(t.sPath).SAP_UUID;o={SAP_UUID:g};r=c.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001",[],o);r.then(async function(e){console.log(e[0].response.data);var a=await this._wagonSlotCheck(d,p,e[0].response.data.LoadingDate,e[0].response.data.ContainerNumber);if(a===false){sap.m.MessageBox.error("Wagon - Slot combination has already been taken for the Loading Date");return}n={ID:e[0].response.data.ID,BSMNumber:e[0].response.data.BSMNumber,SalesOrder:e[0].response.data.SalesOrder,WagonNumber:d,ContainerLoadPad:e[0].response.data.ContainerLoadPad,ContainerNumber:e[0].response.data.ContainerNumber,SealNumber:e[0].response.data.SealNumber,Carrier:e[0].response.data.Carrier,Buyer:e[0].response.data.Buyer,Stevedore:e[0].response.data.Stevedore,ActualPackingDate:e[0].response.data.ActualPackingDate,SAP_Description:e[0].response.data.SAP_Description,Location:e[0].response.data.Location,NetWeight:e[0].response.data.NetWeight,PRAStatus:e[0].response.data.PRAStatus,Slot:p,Status:e[0].response.data.Status,LoadingDate:e[0].response.data.LoadingDate,TrainID:e[0].response.data.TrainID,CheckPost:e[0].response.data.CheckPost,ExcludedFlag:e[0].response.data.ExcludedFlag,Stevedorecode:e[0].response.data.Stevedorecode,LoadingPoint:e[0].response.data.LoadingPoint,DestLocation:e[0].response.data.DestLocation,VesselNumber:e[0].response.data.VesselNumber,WagonNet:e[0].response.data.WagonNet,GrossWeight:e[0].response.data.GrossWeight,Voyage:e[0].response.data.Voyage,PortOfDischargeCode:e[0].response.data.PortOfDischargeCode,PortOfDischargeName:e[0].response.data.PortOfDischargeName,ExclusionReason:e[0].response.data.ExclusionReason};s=c.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert",[],n);s.then(function(e){sap.m.MessageToast.show("Loading successful for the selected container");sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true)});s.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)});this.onActionCancel()}.bind(this));r.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)})}else{sap.m.MessageBox.error("Scanned Container Does Not Match Selected")}}},onActionOKStage:function(e){var a=this.extensionAPI.getSelectedContexts();var t=a[0];var r=t.oModel.getData(t.sPath).SAP_UUID;console.log(r);var s;var o;var n={};var i={};var d=sap.ui.getCore().byId("locationComboBox").getSelectedKey();var p=this.extensionAPI;console.log(d);n={SAP_UUID:r};s=p.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001",[],n);s.then(function(e){console.log(e[0].response.data);i={ID:e[0].response.data.ID,BSMNumber:e[0].response.data.BSMNumber,SalesOrder:e[0].response.data.SalesOrder,WagonNumber:e[0].response.data.WagonNumber,ContainerLoadPad:e[0].response.data.ContainerLoadPad,ContainerNumber:e[0].response.data.ContainerNumber,SealNumber:e[0].response.data.SealNumber,Carrier:e[0].response.data.Carrier,Buyer:e[0].response.data.Buyer,Stevedore:e[0].response.data.Stevedore,ActualPackingDate:e[0].response.data.ActualPackingDate,SAP_Description:e[0].response.data.SAP_Description,Location:d,NetWeight:e[0].response.data.NetWeight,PRAStatus:e[0].response.data.PRAStatus,Slot:e[0].response.data.Slot,Status:e[0].response.data.Status,LoadingDate:e[0].response.data.LoadingDate,TrainID:e[0].response.data.TrainID,CheckPost:e[0].response.data.CheckPost,ExcludedFlag:e[0].response.data.ExcludedFlag,Stevedorecode:e[0].response.data.Stevedorecode,LoadingPoint:e[0].response.data.LoadingPoint,DestLocation:e[0].response.data.DestLocation,VesselNumber:e[0].response.data.VesselNumber,WagonNet:e[0].response.data.WagonNet,GrossWeight:e[0].response.data.GrossWeight,Voyage:e[0].response.data.Voyage,PortOfDischargeCode:e[0].response.data.PortOfDischargeCode,PortOfDischargeName:e[0].response.data.PortOfDischargeName,ExclusionReason:e[0].response.data.ExclusionReason};console.log(this);o=p.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert",[],i);o.then(function(e){sap.m.MessageToast.show("Staging successful for the selected container");sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true)});o.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)})});s.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)});this.onActionCancel()},onActionOKExcludeCont:function(e){var a;var t;var r={};var s={};var o=this.extensionAPI.getSelectedContexts();var n=o[0];var i=n.oModel.getData(n.sPath).SAP_UUID;var d=this.extensionAPI;var p=sap.ui.getCore().byId("contExcludeInput").getValue();var c=sap.ui.getCore().byId("excludeReasonID").getValue();var u=n.oModel.getData(n.sPath).ContainerNumber;if(p==""){sap.ui.getCore().byId("contExcludeInput").setValueState(sap.ui.core.ValueState.Error)}else if(c==""){sap.ui.getCore().byId("excludeReasonID").setValueState(sap.ui.core.ValueState.Error)}else if(p!=u){sap.m.MessageBox.error("Scanned Container Does Not Match Selected")}else{r={SAP_UUID:i};a=this.extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001",[],r);a.then(function(e){s={ID:e[0].response.data.ID,BSMNumber:e[0].response.data.BSMNumber,SalesOrder:e[0].response.data.SalesOrder,WagonNumber:e[0].response.data.WagonNumber,ContainerLoadPad:e[0].response.data.ContainerLoadPad,ContainerNumber:e[0].response.data.ContainerNumber,SealNumber:e[0].response.data.SealNumber,Carrier:e[0].response.data.Carrier,Buyer:e[0].response.data.Buyer,Stevedore:e[0].response.data.Stevedore,ActualPackingDate:e[0].response.data.ActualPackingDate,SAP_Description:e[0].response.data.SAP_Description,Location:e[0].response.data.Location,NetWeight:e[0].response.data.NetWeight,PRAStatus:e[0].response.data.PRAStatus,Slot:e[0].response.data.Slot,Status:e[0].response.data.Status,LoadingDate:e[0].response.data.LoadingDate,TrainID:e[0].response.data.TrainID,CheckPost:"Container has been excluded",ExcludedFlag:1,Stevedorecode:e[0].response.data.Stevedorecode,LoadingPoint:e[0].response.data.LoadingPoint,DestLocation:e[0].response.data.DestLocation,VesselNumber:e[0].response.data.VesselNumber,WagonNet:e[0].response.data.WagonNet,GrossWeight:e[0].response.data.GrossWeight,Voyage:e[0].response.data.Voyage,PortOfDischargeCode:e[0].response.data.PortOfDischargeCode,PortOfDischargeName:e[0].response.data.PortOfDischargeName,ExclusionReason:c};t=d.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert",[],s);t.then(function(e){sap.m.MessageToast.show("Container Excluded");sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true)});t.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)})});a.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)});this._DialogGenerate.close();this._DialogGenerate.destroy();this.getView().removeDependent(this._DialogGenerate);this._DialogGenerate=null}}}});function updateCheck(e,a,t,r){var s;var o;var n={};var i={};console.log(r);console.log("here");n={SAP_UUID:a};s=r.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001",[],n);s.then(function(e){i={ID:e[0].response.data.ID,BSMNumber:e[0].response.data.BSMNumber,SalesOrder:e[0].response.data.SalesOrder,WagonNumber:e[0].response.data.WagonNumber,ContainerLoadPad:e[0].response.data.ContainerLoadPad,ContainerNumber:e[0].response.data.ContainerNumber,SealNumber:e[0].response.data.SealNumber,Carrier:e[0].response.data.Carrier,Buyer:e[0].response.data.Buyer,Stevedore:e[0].response.data.Stevedore,ActualPackingDate:e[0].response.data.ActualPackingDate,SAP_Description:e[0].response.data.SAP_Description,Location:e[0].response.data.Location,NetWeight:e[0].response.data.NetWeight,PRAStatus:e[0].response.data.PRAStatus,Slot:e[0].response.data.Slot,Status:e[0].response.data.Status,LoadingDate:e[0].response.data.LoadingDate,TrainID:e[0].response.data.TrainID,CheckPost:t,ExcludedFlag:e[0].response.data.ExcludedFlag,Stevedorecode:e[0].response.data.Stevedorecode,LoadingPoint:e[0].response.data.LoadingPoint,DestLocation:e[0].response.data.DestLocation,VesselNumber:e[0].response.data.VesselNumber,WagonNet:e[0].response.data.WagonNet,GrossWeight:e[0].response.data.GrossWeight,Voyage:e[0].response.data.Voyage,PortOfDischargeCode:e[0].response.data.PortOfDischargeCode,PortOfDischargeName:e[0].response.data.PortOfDischargeName,ExclusionReason:e[0].response.data.ExclusionReason};o=r.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert",[],i);o.then(function(e){sap.m.MessageToast.show("Validation completed for the selected container");sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true)});o.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)})});s.catch(function(e){var a=jQuery.parseJSON(e[0].error.response.responseText);sap.m.MessageBox.error(a.error.message.value)})}\n//# sourceMappingURL=ListReportExt.controller.js.map',
	"ContainerTransfer/containertransferapp/ext/fragment/excludeContainerDialog.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc"\n\t height="100%"><Dialog id="idExcludeCont" title="Exclude Container" class="sapUiNoContentPadding"><content><VBox id="idExcludeContVbox" class="sapUiSmallMarginBeginEnd"><Label text="Scan Container" labelFor="contExcludeInput" class="sapUiTinyMarginTop"/><Input id="contExcludeInput" required="true" liveChange = "handleLiveChange"/><Label text="Please Enter Reason for Excluding Container" labelFor="excludeReasonID" class="sapUiTinyMarginTop"/><TextArea id="excludeReasonID" required="true" showExceededText="true" maxLength="100" width="100%" valueState="{= ${/value}.length > 100 ? \'Warning\' : \'None\' }" valueLiveUpdate="false" liveChange="handleLiveChange" /></VBox></content><buttons><Button id="btnok" text="OK" press="onActionOKExcludeCont" /><Button id="btncancel" text="Cancel" press="onActionCancel"/></buttons></Dialog></core:FragmentDefinition>',
	"ContainerTransfer/containertransferapp/ext/fragment/updateLoadingDialog.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc"\n\t height="100%"><Dialog id="idUpdateLoading" title="Load" class="sapUiNoContentPadding"><content><VBox id="idLoadVbox" class="sapUiSmallMarginBeginEnd"><Label text="Container" labelFor="containerInput" /><Input id="containerInput" required="true" liveChange = "onLiveChangeLoad"/><Label text="Wagon" labelFor="wagonInput" /><Input id="wagonInput" required="true" /><Label text="Slot" labelFor="slotInput" required="true" /><ComboBox id="slotInput" items="3" width="100%"><core:Item id="slotItem1ID" key="1" text="1" /><core:Item id="slotItem2ID" key="2" text="2" /><core:Item id="slotItem3ID" key="3" text="3" /></ComboBox></VBox></content><buttons><Button id="btnok" text="OK" press="onActionOKLoad" /><Button id="btncancel" text="Cancel" press="onActionCancel"/></buttons></Dialog></core:FragmentDefinition>',
	"ContainerTransfer/containertransferapp/ext/fragment/updateStagingDialog.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc"\n\t height="100%"><Dialog id="idUpdateStaging" title="Stage" class="sapUiNoContentPadding"><content><VBox id="idStageVbox" class="sapUiSmallMarginBeginEnd"><Label text="Location" labelFor="locationComboBox" /><ComboBox id="locationComboBox"\n\t\t\t\t\titems="{/}"><core:Item key="{Location}" text="{Location}" /></ComboBox></VBox></content><buttons><Button id="btnok" text="OK" press="onActionOKStage" /><Button id="btncancel" text="Cancel" press="onActionCancel"/></buttons></Dialog></core:FragmentDefinition>',
	"ContainerTransfer/containertransferapp/i18n/i18n.properties":'# This is the resource bundle for ContainerTransfer.containertransferapp\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Container Transfer\n\n#YDES: Application description\nappDescription=A Fiori application.\n\n#XTXT,35\nsuccess=Success\n',
	"ContainerTransfer/containertransferapp/manifest.json":'{"_version":"1.48.0","sap.app":{"id":"ContainerTransfer.containertransferapp","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.9.6","toolsId":"d140767d-d262-42fb-9bd6-63ed4b8ab6aa"},"dataSources":{"mainService":{"uri":"/sap/opu/odata/sap/ZSCM_CONTAINERTRANSF_SRV/","type":"OData","settings":{"annotations":["ZSCM_CONTAINERTRANSF_SRV_VAN","annotation"],"localUri":"localService/metadata.xml","odataVersion":"2.0"}},"ZSCM_CONTAINERTRANSF_SRV_VAN":{"uri":"/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/Annotations(TechnicalName=\'ZSCM_CONTAINERTRANSF_SRV_VAN\',Version=\'0001\')/$value/","type":"ODataAnnotation","settings":{"localUri":"localService/ZSCM_CONTAINERTRANSF_SRV_VAN.xml"}},"annotation":{"type":"ODataAnnotation","uri":"annotations/annotation.xml","settings":{"localUri":"annotations/annotation.xml"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.108.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.f":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.suite.ui.generic.template":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ContainerTransfer.containertransferapp.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"defaultBindingMode":"TwoWay","defaultCountMode":"Inline","refreshAfterChange":false,"metadataUrlParams":{"sap-value-list":"none"}}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[],"targets":{}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.suite.ui.generic.template.ListReport.view.ListReport":{"controllerName":"ContainerTransfer.containertransferapp.ext.controller.ListReportExt","sap.ui.generic.app":{"ZSCM_C_ContainerTransfApp":{"EntitySet":"ZSCM_C_ContainerTransfApp","Actions":{"stage":{"id":"StageButton","text":"Stage","press":"Stage","requiresSelection":true},"load":{"id":"loadButton","text":"Load","press":"Load","requiresSelection":true},"validate":{"id":"validateButton","text":"Validate","press":"validate","requiresSelection":true},"excludeContainer":{"id":"excludeContainerButton","text":"Exclude/Include Container","press":"excludeContainer","requiresSelection":true}}}}}}}}},"sap.ui.generic.app":{"_version":"1.3.0","settings":{"forceGlobalRefresh":false,"objectPageHeaderType":"Dynamic","considerAnalyticalParameters":true,"showDraftToggle":false},"pages":{"ListReport|ZSCM_C_ContainerTransfApp":{"entitySet":"ZSCM_C_ContainerTransfApp","component":{"name":"sap.suite.ui.generic.template.ListReport","list":true,"settings":{"condensedTableLayout":true,"smartVariantManagement":true,"enableTableFilterInPageVariant":true,"filterSettings":{"dateSettings":{"useDateRange":true,"fields":{"LoadingDate":{"defaultValue":{"operation":"TODAY"}}}}},"tableSettings":{"multiSelect":true,"selectAll":true},"quickVariantSelection":{"showCounts":true,"variants":{"0":{"key":"_tab1","annotationPath":"com.sap.vocabularies.UI.v1.SelectionVariant#All"},"1":{"key":"_tab2","annotationPath":"com.sap.vocabularies.UI.v1.SelectionVariant#NotChecked"},"2":{"key":"_tab3","annotationPath":"com.sap.vocabularies.UI.v1.SelectionVariant#Failed"},"3":{"key":"_tab4","annotationPath":"com.sap.vocabularies.UI.v1.SelectionVariant#Success"}}}}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"}}'
});
//# sourceMappingURL=Component-preload.js.map
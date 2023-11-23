sap.ui.define([
    "sap/m/MessageToast",
    'sap/ui/core/library'
], function(MessageToast, coreLibrary) {
    'use strict';
    var ValueState = coreLibrary.ValueState;
    return {

        handleLiveChange: function (oEvent) {
			var oTextArea = oEvent.getSource(),
				iValueLength = oTextArea.getValue().length,
				iMaxLength = oTextArea.getMaxLength(),
				sState = iValueLength > iMaxLength ? ValueState.Warning : ValueState.None;

            console.log(oTextArea)
            console.log(iValueLength)
			oTextArea.setValueState(sState);

            var inputEvent = oEvent.getSource();
            var inputID = oEvent.getSource().getId()

            if (inputID == 'contExcludeInput') {
                inputEvent.setValue(inputEvent.getValue().toUpperCase());
            }
        
            
		},


        onLiveChangeLoad: function(oEvent) {

            var containerInput = oEvent.getSource();
        
            containerInput.setValue(containerInput.getValue().toUpperCase());
        },

        Load: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");
            var context = this.extensionAPI.getSelectedContexts();
            var element = context[0];
            var container = "";
            var wagon;
            var slot;
            var status = element.oModel.getData(element.sPath).Status;
            if (context.length > 1) {
                sap.m.MessageBox.error("Please Select 1 Entry");
            } else if(element.oModel.getData(element.sPath).ExcludedFlag == 1) {
                sap.m.MessageBox.error("Unable to Load. Container has been excluded.");
            } else {
                if (element != undefined) {
                    container = element.oModel.getData(element.sPath).ContainerNumber
                    wagon = element.oModel.getData(element.sPath).WagonNumber
                    slot = element.oModel.getData(element.sPath).Slot
                }

                this._DialogGenerate = sap.ui.xmlfragment("ContainerTransfer.containertransferapp.ext.fragment.updateLoadingDialog", this);
                //console.log(sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel())

                var headerLabel = sap.ui.getCore().byId("idUpdateLoading");
                headerLabel.setTitle("Load " + container)
                
                if(status == 'Pending') {
                    MessageToast.show("Please Stage Prior to Loading.");
                    this.onActionCancel();
                } else {
                    this.getView().addDependent(this._DialogGenerate);
                    this._DialogGenerate.open();
                }
            }
        },

        Stage: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");
            var context = this.extensionAPI.getSelectedContexts();
            var element = context[0];

            if (context.length > 1) {
                sap.m.MessageBox.error("Please Select 1 Entry");
            } else {
                var loadingpoint = element.oModel.getData(element.sPath).LoadingPoint
                var location = element.oModel.getData(element.sPath).Location
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSCM_CONTAINERTRANSF_SRV");
                oModel.read(`/ZSCM_I_ContainerTransfer_S1?$filter=LoadingPoint eq '${loadingpoint}'`, {
                    success: function(oData, oResponse) {
                        var oJSONModel = new sap.ui.model.json.JSONModel();
                        oJSONModel.setData(oData.results);
                        sap.ui.getCore().byId("locationComboBox").setModel(oJSONModel);
                        sap.ui.getCore().byId("locationComboBox").setSelectedKey(location);                        
                    }.bind(this)
                });
                // var input = sap.ui.getCore().byId("locationInput");
                // input.setValue(location);
                this._DialogGenerate = sap.ui.xmlfragment("ContainerTransfer.containertransferapp.ext.fragment.updateStagingDialog", this);
                this._DialogGenerate.open();
            }
        },

        excludeContainer: function(oEvent) {
            var context = this.extensionAPI.getSelectedContexts();
            var element = context[0];
            var container = element.oModel.getData(element.sPath).ContainerNumber
            var excludeFlag = element.oModel.getData(element.sPath).ExcludedFlag

            if (excludeFlag == 1) {
                var oPromiseGet;
                var oPromiseUpsert;
                var oParameterGet = {};
                var oParameterUpsert = {};
                var context = this.extensionAPI.getSelectedContexts();
                var element = context[0];
                var SAP_UUID = element.oModel.getData(element.sPath).SAP_UUID;
                var extensionAPI = this.extensionAPI
                var containerSelect = element.oModel.getData(element.sPath).ContainerNumber

                oParameterGet = {
                    "SAP_UUID": SAP_UUID
                };

                oPromiseGet = this.extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001", [], 
                    oParameterGet);

                oPromiseGet.then(function (r) {
                    oParameterUpsert = {
                        "ID": r[0].response.data.ID,
                        "BSMNumber": r[0].response.data.BSMNumber,
                        "SalesOrder": r[0].response.data.SalesOrder,
                        "WagonNumber": r[0].response.data.WagonNumber,
                        "ContainerLoadPad": r[0].response.data.ContainerLoadPad,
                        "ContainerNumber": r[0].response.data.ContainerNumber,
                        "SealNumber": r[0].response.data.SealNumber,
                        "Carrier": r[0].response.data.Carrier,
                        "Buyer": r[0].response.data.Buyer,
                        "Stevedore": r[0].response.data.Stevedore,
                        "ActualPackingDate": r[0].response.data.ActualPackingDate,
                        "SAP_Description": r[0].response.data.SAP_Description,
                        "Location": r[0].response.data.Location,
                        "NetWeight": r[0].response.data.NetWeight,
                        "PRAStatus": r[0].response.data.PRAStatus,
                        "Slot": r[0].response.data.Slot,
                        "Status": r[0].response.data.Status,
                        "LoadingDate": r[0].response.data.LoadingDate,
                        "TrainID": r[0].response.data.TrainID,
                        "CheckPost": "",
                        "ExcludedFlag": 0,
                        "Stevedorecode": r[0].response.data.Stevedorecode,
                        "LoadingPoint": r[0].response.data.LoadingPoint,
                        "DestLocation": r[0].response.data.DestLocation,
                        "VesselNumber": r[0].response.data.VesselNumber,
                        "WagonNet": r[0].response.data.WagonNet,
                        "GrossWeight": r[0].response.data.GrossWeight,
                        "Voyage": r[0].response.data.Voyage,
                        "PortOfDischargeCode": r[0].response.data.PortOfDischargeCode,
                        "PortOfDischargeName": r[0].response.data.PortOfDischargeName,
                        "ExclusionReason": ""
                    };

                    oPromiseUpsert = extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert", [],
                    oParameterUpsert);

                    oPromiseUpsert.then(function (r) {
                        sap.m.MessageToast.show("Container Included");
                        sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true);

                    });
                    oPromiseUpsert.catch(function (r) {
                        var E = jQuery.parseJSON(r[0].error.response.responseText);
                        sap.m.MessageBox.error(E.error.message.value);
                    });
                    
                });
                oPromiseGet.catch(function (r) {
                    var E = jQuery.parseJSON(r[0].error.response.responseText);
                    sap.m.MessageBox.error(E.error.message.value);
                });
            } else {
                this._DialogGenerate = sap.ui.xmlfragment("ContainerTransfer.containertransferapp.ext.fragment.excludeContainerDialog", this);

                var headerLabel = sap.ui.getCore().byId("idExcludeCont");
                headerLabel.setTitle("Exclude Container " + container)

                this.getView().addDependent(this._DialogGenerate);
                this._DialogGenerate.open();
            }
        },

        validate: function(oEvent) {
            var context = this.extensionAPI.getSelectedContexts();

            for (let i=0; i<context.length; i++) {
                var SAP_UUID = context[i].oModel.getData(context[i].sPath).SAP_UUID
                var wagon = context[i].oModel.getData(context[i].sPath).WagonNumber
                var HU = context[i].oModel.getData(context[i].sPath).HUNumber
                var excludedFlag = context[i].oModel.getData(context[i].sPath).ExcludedFlag
                var check = ""
                var countErrors = 0
                wagon = context[i].oModel.getData(context[i].sPath).WagonNumber
                //console.log(wagon)
                if (wagon == "") {
                    if (countErrors > 0) {
                        check += ", "
                    }
                    check += "Wagon Number not entered"
                    countErrors += 1
                } 
                if (HU == "") {
                    if (countErrors > 0) {
                        check += ", "
                    }
                    check += "HU not found for container"
                    countErrors += 1
                } 
                if (countErrors == 0) {
                    check = "Success"
                }
                if (excludedFlag == 1) {
                    check = "Container has been excluded"
                }
                updateCheck(wagon, SAP_UUID, check, this.extensionAPI)     
            }
        },

        onActionCancel: function () {
            this._DialogGenerate.close();
            this._DialogGenerate.destroy();
            this.getView().removeDependent(this._DialogGenerate);
            this._DialogGenerate = null;
        },  

        _wagonSlotCheck: function (wagon, slot, loadingDate, containerNumber) {
            var loadingDateISO = loadingDate.toISOString().split("T")[0];
            var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSCM_CONTAINERTRANSF_SRV");
            return new Promise(
                function(resolve, reject) {
                    oModel.read(`/ZSCM_C_ContainerTransfApp?$filter=WagonNumber eq '${wagon}' and Slot eq '${slot}'`, {
                        success: function(oData, oResponse) {
                            if (oData.results.length === 0) {
                                resolve(true);
                            } else {
                                var bExist = false;
                                oData.results.forEach(function(val){
                                    if (val.LoadingDate.indexOf(loadingDateISO) >= 0 && val.ContainerNumber !== containerNumber) {
                                        bExist = true;
                                    }
                                });
                                if (bExist === true) {
                                    resolve(false);
                                } else {
                                    resolve(true);
                                }
                            }
                        }.bind(this)
                    });
                });
        },

        onActionOKLoad: function (oEvent) {
            var context = this.extensionAPI.getSelectedContexts();
            var element = context[0];
            var oPromiseGet;
            var oPromiseUpsert;
            var oParameterGet = {};
            var oParameterUpsert = {};
            var container = sap.ui.getCore().byId("containerInput").getValue()
            var wagon = sap.ui.getCore().byId("wagonInput").getValue()
            var slot = sap.ui.getCore().byId("slotInput").getValue()
            var storeThis = this.extensionAPI

            if (container == "") {
                sap.ui.getCore().byId("containerInput").setValueState(sap.ui.core.ValueState.Error);  // if the field is empty after change, it will go red
            } else if (slot == "") {
                sap.ui.getCore().byId("wagonInput").setValueState(sap.ui.core.ValueState.Error);  // if the field is empty after change, it will go red
            } else if (wagon == "") {
                sap.ui.getCore().byId("slotInput").setValueState(sap.ui.core.ValueState.Error);  // if the field is empty after change, it will go red
            } else {
                //Container - HU mapping
                if(container === element.oModel.getData(element.sPath).HUNumber) {
                    container = element.oModel.getData(element.sPath).ContainerNumber;
                }

                var containerSelect = element.oModel.getData(element.sPath).ContainerNumber
                if (container == containerSelect) {
                    var SAP_UUID = element.oModel.getData(element.sPath).SAP_UUID
                    oParameterGet = {
                        "SAP_UUID": SAP_UUID
                    };
                    
                    oPromiseGet = storeThis.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001", [], 
                        oParameterGet);

                    oPromiseGet.then(async function (r) {
                        console.log(r[0].response.data)
                        var uniqueCheck = await this._wagonSlotCheck(wagon, slot, r[0].response.data.LoadingDate,r[0].response.data.ContainerNumber);
                        if(uniqueCheck === false){
                            sap.m.MessageBox.error("Wagon - Slot combination has already been taken for the Loading Date");
                            return; 
                        }
                        oParameterUpsert = {
                            "ID": r[0].response.data.ID,
                            "BSMNumber": r[0].response.data.BSMNumber,
                            "SalesOrder": r[0].response.data.SalesOrder,
                            "WagonNumber": wagon,
                            "ContainerLoadPad": r[0].response.data.ContainerLoadPad,
                            "ContainerNumber": r[0].response.data.ContainerNumber,
                            "SealNumber": r[0].response.data.SealNumber,
                            "Carrier": r[0].response.data.Carrier,
                            "Buyer": r[0].response.data.Buyer,
                            "Stevedore": r[0].response.data.Stevedore,
                            "ActualPackingDate": r[0].response.data.ActualPackingDate,
                            "SAP_Description": r[0].response.data.SAP_Description,
                            "Location": r[0].response.data.Location,
                            "NetWeight": r[0].response.data.NetWeight,
                            "PRAStatus": r[0].response.data.PRAStatus,
                            "Slot": slot,
                            "Status": r[0].response.data.Status,
                            "LoadingDate": r[0].response.data.LoadingDate,
                            "TrainID": r[0].response.data.TrainID,
                            "CheckPost": r[0].response.data.CheckPost,
                            "ExcludedFlag": r[0].response.data.ExcludedFlag,
                            "Stevedorecode": r[0].response.data.Stevedorecode,
                            "LoadingPoint": r[0].response.data.LoadingPoint,
                            "DestLocation": r[0].response.data.DestLocation,
                            "VesselNumber": r[0].response.data.VesselNumber,
                            "WagonNet": r[0].response.data.WagonNet,
                            "GrossWeight": r[0].response.data.GrossWeight,
                            "Voyage": r[0].response.data.Voyage,
                            "PortOfDischargeCode": r[0].response.data.PortOfDischargeCode,
                            "PortOfDischargeName": r[0].response.data.PortOfDischargeName,
                            "ExclusionReason": r[0].response.data.ExclusionReason
                        };

                        oPromiseUpsert = storeThis.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert", [],
                        oParameterUpsert);

                        oPromiseUpsert.then(function (r) {
                            sap.m.MessageToast.show("Loading successful for the selected container");
                            sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true);

                        });
                        oPromiseUpsert.catch(function (r) {
                            var E = jQuery.parseJSON(r[0].error.response.responseText);
                            sap.m.MessageBox.error(E.error.message.value);
                        });
                        
                        this.onActionCancel();
                    }.bind(this));
                    oPromiseGet.catch(function (r) {
                        var E = jQuery.parseJSON(r[0].error.response.responseText);
                        sap.m.MessageBox.error(E.error.message.value);
                    });
                    // this.onActionCancel();
                } else {
                    sap.m.MessageBox.error("Scanned Container Does Not Match Selected");
                }
        }

        },

        onActionOKStage: function (oEvent) {
            var context = this.extensionAPI.getSelectedContexts();
            var element = context[0];
            var SAP_UUID = element.oModel.getData(element.sPath).SAP_UUID
            console.log(SAP_UUID)
            var oPromiseGet;
            var oPromiseUpsert;
            var oParameterGet = {};
            var oParameterUpsert = {};
            //var location = sap.ui.getCore().byId("locationInput").getValue()
            var location = sap.ui.getCore().byId("locationComboBox").getSelectedKey();
            var storeThis = this.extensionAPI
            console.log(location)
            oParameterGet = {
                "SAP_UUID": SAP_UUID
            };
            
            oPromiseGet = storeThis.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001", [], 
                oParameterGet);

            oPromiseGet.then(function (r) {
                console.log(r[0].response.data)

                oParameterUpsert = {
                    "ID": r[0].response.data.ID,
                    "BSMNumber": r[0].response.data.BSMNumber,
                    "SalesOrder": r[0].response.data.SalesOrder,
                    "WagonNumber": r[0].response.data.WagonNumber,
                    "ContainerLoadPad": r[0].response.data.ContainerLoadPad,
                    "ContainerNumber": r[0].response.data.ContainerNumber,
                    "SealNumber": r[0].response.data.SealNumber,
                    "Carrier": r[0].response.data.Carrier,
                    "Buyer": r[0].response.data.Buyer,
                    "Stevedore": r[0].response.data.Stevedore,
                    "ActualPackingDate": r[0].response.data.ActualPackingDate,
                    "SAP_Description": r[0].response.data.SAP_Description,
                    "Location": location,
                    "NetWeight": r[0].response.data.NetWeight,
                    "PRAStatus": r[0].response.data.PRAStatus,
                    "Slot": r[0].response.data.Slot,
                    "Status": r[0].response.data.Status,
                    "LoadingDate": r[0].response.data.LoadingDate,
                    "TrainID": r[0].response.data.TrainID,
                    "CheckPost": r[0].response.data.CheckPost,
                    "ExcludedFlag": r[0].response.data.ExcludedFlag,
                    "Stevedorecode": r[0].response.data.Stevedorecode,
                    "LoadingPoint": r[0].response.data.LoadingPoint,
                    "DestLocation": r[0].response.data.DestLocation,
                    "VesselNumber": r[0].response.data.VesselNumber,
                    "WagonNet": r[0].response.data.WagonNet,
                    "GrossWeight": r[0].response.data.GrossWeight,
                    "Voyage": r[0].response.data.Voyage,
                    "PortOfDischargeCode": r[0].response.data.PortOfDischargeCode,
                    "PortOfDischargeName": r[0].response.data.PortOfDischargeName,
                    "ExclusionReason": r[0].response.data.ExclusionReason
                };
                console.log(this)
                oPromiseUpsert = storeThis.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert" , [],
                oParameterUpsert);

                oPromiseUpsert.then(function (r) {
                    sap.m.MessageToast.show("Staging successful for the selected container");
                    sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true);

                });
                oPromiseUpsert.catch(function (r) {
                    var E = jQuery.parseJSON(r[0].error.response.responseText);
                    sap.m.MessageBox.error(E.error.message.value);
                });

            });
            oPromiseGet.catch(function (r) {
                var E = jQuery.parseJSON(r[0].error.response.responseText);
                sap.m.MessageBox.error(E.error.message.value);
            });
    
            this.onActionCancel();
        },
        
        onActionOKExcludeCont: function (oEvent) {
            // var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZSCM_CONTAINERTRANSF_SRV");
            // console.log(oModel.read("/ZSCM_I_Conatiner_L1"))
            // console.log(this.getOwnerComponent().getModel());
            var oPromiseGet;
            var oPromiseUpsert;
            var oParameterGet = {};
            var oParameterUpsert = {};
            var context = this.extensionAPI.getSelectedContexts();
            var element = context[0];
            var SAP_UUID = element.oModel.getData(element.sPath).SAP_UUID;
            var extensionAPI = this.extensionAPI
            var container = sap.ui.getCore().byId("contExcludeInput").getValue()
            var reason = sap.ui.getCore().byId("excludeReasonID").getValue()
            var containerSelect = element.oModel.getData(element.sPath).ContainerNumber

            if (container == "") {
                sap.ui.getCore().byId("contExcludeInput").setValueState(sap.ui.core.ValueState.Error);  // if the field is empty after change, it will go red
            } else if (reason == "") {
                sap.ui.getCore().byId("excludeReasonID").setValueState(sap.ui.core.ValueState.Error);  // if the field is empty after change, it will go red

            } else if (container != containerSelect) {
                sap.m.MessageBox.error("Scanned Container Does Not Match Selected");
            } else {

                oParameterGet = {
                    "SAP_UUID": SAP_UUID
                };

                oPromiseGet = this.extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001", [], 
                    oParameterGet);

                oPromiseGet.then(function (r) {
                    oParameterUpsert = {
                        "ID": r[0].response.data.ID,
                        "BSMNumber": r[0].response.data.BSMNumber,
                        "SalesOrder": r[0].response.data.SalesOrder,
                        "WagonNumber": r[0].response.data.WagonNumber,
                        "ContainerLoadPad": r[0].response.data.ContainerLoadPad,
                        "ContainerNumber": r[0].response.data.ContainerNumber,
                        "SealNumber": r[0].response.data.SealNumber,
                        "Carrier": r[0].response.data.Carrier,
                        "Buyer": r[0].response.data.Buyer,
                        "Stevedore": r[0].response.data.Stevedore,
                        "ActualPackingDate": r[0].response.data.ActualPackingDate,
                        "SAP_Description": r[0].response.data.SAP_Description,
                        "Location": r[0].response.data.Location,
                        "NetWeight": r[0].response.data.NetWeight,
                        "PRAStatus": r[0].response.data.PRAStatus,
                        "Slot": r[0].response.data.Slot,
                        "Status": r[0].response.data.Status,
                        "LoadingDate": r[0].response.data.LoadingDate,
                        "TrainID": r[0].response.data.TrainID,
                        "CheckPost": "Container has been excluded",
                        "ExcludedFlag": 1,
                        "Stevedorecode": r[0].response.data.Stevedorecode,
                        "LoadingPoint": r[0].response.data.LoadingPoint,
                        "DestLocation": r[0].response.data.DestLocation,
                        "VesselNumber": r[0].response.data.VesselNumber,
                        "WagonNet": r[0].response.data.WagonNet,
                        "GrossWeight": r[0].response.data.GrossWeight,
                        "Voyage": r[0].response.data.Voyage,
                        "PortOfDischargeCode": r[0].response.data.PortOfDischargeCode,
                        "PortOfDischargeName": r[0].response.data.PortOfDischargeName,
                        "ExclusionReason": reason
                    };

                    oPromiseUpsert = extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert", [],
                    oParameterUpsert);

                    oPromiseUpsert.then(function (r) {
                        sap.m.MessageToast.show("Container Excluded");
                        sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true);

                    });
                    oPromiseUpsert.catch(function (r) {
                        var E = jQuery.parseJSON(r[0].error.response.responseText);
                        sap.m.MessageBox.error(E.error.message.value);
                    });
                    
                });
                oPromiseGet.catch(function (r) {
                    var E = jQuery.parseJSON(r[0].error.response.responseText);
                    sap.m.MessageBox.error(E.error.message.value);
                });

                this._DialogGenerate.close();
                this._DialogGenerate.destroy();
                this.getView().removeDependent(this._DialogGenerate);
                this._DialogGenerate = null;
            }
        }

        // postTransfer: function(oEvent) {
        //     MessageToast.show("Transfer Posted");
        // },

    };
});

function updateCheck(wagon, SAP_UUID, check, extensionAPI) {
    var oPromiseGet;
    var oPromiseUpsert;
    var oParameterGet = {};
    var oParameterUpsert = {};
    console.log(extensionAPI)
    console.log("here")
    oParameterGet = {
        "SAP_UUID": SAP_UUID
    };

    oPromiseGet = extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTAction001", [], 
        oParameterGet);

    oPromiseGet.then(function (r) {
        //console.log(SAP_UUID)
        //console.log(wagon)
        //console.log(check)
        //console.log(r[0].response.data.ID)
        oParameterUpsert = {
            "ID": r[0].response.data.ID,
            "BSMNumber": r[0].response.data.BSMNumber,
            "SalesOrder": r[0].response.data.SalesOrder,
            "WagonNumber": r[0].response.data.WagonNumber,
            "ContainerLoadPad": r[0].response.data.ContainerLoadPad,
            "ContainerNumber": r[0].response.data.ContainerNumber,
            "SealNumber": r[0].response.data.SealNumber,
            "Carrier": r[0].response.data.Carrier,
            "Buyer": r[0].response.data.Buyer,
            "Stevedore": r[0].response.data.Stevedore,
            "ActualPackingDate": r[0].response.data.ActualPackingDate,
            "SAP_Description": r[0].response.data.SAP_Description,
            "Location": r[0].response.data.Location,
            "NetWeight": r[0].response.data.NetWeight,
            "PRAStatus": r[0].response.data.PRAStatus,
            "Slot": r[0].response.data.Slot,
            "Status": r[0].response.data.Status,
            "LoadingDate": r[0].response.data.LoadingDate,
            "TrainID": r[0].response.data.TrainID,
            "CheckPost": check,
            "ExcludedFlag": r[0].response.data.ExcludedFlag,
            "Stevedorecode": r[0].response.data.Stevedorecode,
            "LoadingPoint": r[0].response.data.LoadingPoint,
            "DestLocation": r[0].response.data.DestLocation,
            "VesselNumber": r[0].response.data.VesselNumber,
            "WagonNet": r[0].response.data.WagonNet,
            "GrossWeight": r[0].response.data.GrossWeight,
            "Voyage": r[0].response.data.Voyage,
            "PortOfDischargeCode": r[0].response.data.PortOfDischargeCode,
            "PortOfDischargeName": r[0].response.data.PortOfDischargeName,
            "ExclusionReason": r[0].response.data.ExclusionReason
        };

        oPromiseUpsert = extensionAPI.invokeActions("cds_zscm_containertransfer_def.ZSCM_C_ContainerTransfApp/ZZ1_TRAINPLANNINGREPORTSap_upsert", [],
        oParameterUpsert);

        oPromiseUpsert.then(function (r) {
            sap.m.MessageToast.show("Validation completed for the selected container");
            sap.ui.getCore().byId("ContainerTransfer.containertransferapp::sap.suite.ui.generic.template.ListReport.view.ListReport::ZSCM_C_ContainerTransfApp--listReport").getModel().refresh(true);

        });
        oPromiseUpsert.catch(function (r) {
            var E = jQuery.parseJSON(r[0].error.response.responseText);
            sap.m.MessageBox.error(E.error.message.value);
        });
        
    });
    oPromiseGet.catch(function (r) {
        var E = jQuery.parseJSON(r[0].error.response.responseText);
        sap.m.MessageBox.error(E.error.message.value);
    });
}
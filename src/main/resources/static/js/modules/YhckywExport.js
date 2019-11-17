/*
 * 银行存款业务表
 */
App.YhckywExport = function () {
    //日期格式化
    function formatDate(val) {
        return Ext.isDate(val) ? val.dateFormat('Y-m-d') : val;
    }

    return {
        //定义变量
        currentFormValues: {},
        //初始化
        render: function (id) {
            if (!this.store) {
                this.store = this.getStore();
            }
            this.createGrid(id);
        },

        //获取store
        getStore: function () {
            var store = new Ext.data.JsonStore({
                storeId: "yhckStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "bargainId"}, {name: "ptfId"}, {name: "depRecptId"}, {name: "startDt"}, {name: "endDt"},
                    {name: "depBizTypeCd"}, {name: "withInAdvInd"}, {name: "savingDepAcctId"}, {name: "regularDepAcctId"}, {name: "intDbAcctId"}, {name: "intCrAcctId"},
                    {name: "depAmt"}, {name: "depRetns"}, {name: "depBankName"}, {name: "depIntRate"}, {name: "withInAdvIntLossInd"}, {name: "accruedModeCd"},
                    {name: "fixDepCalIntModeCd"}, {name: "fixDepIntRateTypeCd"}, {name: "adjIntModeCd"}, {name: "payIntModeCd"}, {name: "withInAdvRemarks"}, {name: "branch"},
                    {name: "calIntDays"}, {name: "agrDepLmt"}, {name: "agrDepIntRate"}, {name: "fixppAmt"}, {name: "fixppIntRate"}, {name: "fixppDepAmtRelaCd"},
                    {name: "depNoticeDays"}, {name: "dueDtEnableInd"}, {name: "amtSplit"}, {name: "withdrawDt"}, {name: "hookType"}, {name: "calIntModeCd"},
                    {name: "depTypeCd"}, {name: "pndg"}, {name: "reserveIntRate"}, {name: "calIntBase"}, {name: "floatCalIntInd"}, {name: "bankAcctId"},
                    {name: "baseExRate"}, {name: "ptfExRate"}, {name: "hdlUserId"}, {name: "chkUsrId"}, {name: "chkStatCd"}
                ],
                // url: "rescourse/data/dbconfig.json",
                totalProperty: "total",
                root: "rows"
            });
            //store.load();
            return store;
        },

        //创建Grid
        createGrid: function (id) {
            var panel = Ext.getCmp(id);
            panel.body.dom.innerHTML = "";
            var sm = new Ext.grid.CheckboxSelectionModel();

            this.grid = new Ext.grid.EditorGridPanel({
                tbar: [
                    {
                        text: "日期："
                    }, {
                        id: 'yhckywdate',
                        xtype: 'datefield',
                        name: 'startDt',
                        format: 'Y-m-d',
                        value: new Date()
                    },
                    {
                        text: "查询",
                        iconCls: "x-btn-search",
                        scope: this,
                        handler: this.search
                    }, {
                        text: "修改",
                        iconCls: "x-btn-edit",
                        scope: this,
                        handler: this.edit,
                        style: {
                            position: 'absolute',
                            top: '4px',
                            right: '150px',
                        },
                    }, {
                        text: "删除",
                        iconCls: "x-btn-del",
                        scope: this,
                        handler: this.del,
                        style: {
                            position: 'absolute',
                            top: '4px',
                            right: '100px',
                        }
                    }, {
                        text: "导出",
                        iconCls: "x-btn-download",
                        scope: this,
                        handler: this.export,
                        style: {
                            position: 'absolute',
                            top: '4px',
                            right: '50px',
                        }
                    }],
                /*bbar: new Ext.PagingToolbar({
                    store: this.store,
                    pageSize: 20,
                    displayInfo: true
                }),*/

                store: this.store,
                sm: sm,
                columns: [sm, {
                    header: "编号",
                    width: 100,
                    sortable: true,
                    dataIndex: "id",
                    hidden: true
                }, {
                    header: "成交编号",
                    width: 120,
                    sortable: true,
                    dataIndex: "bargainId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'bargainId'
                    }
                }, {
                    header: "投资组合编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "ptfId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfId'
                    }
                }, {
                    header: "存单编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "depRecptId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'depRecptId'
                    }
                }, {
                    header: "起始日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "startDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'startDt'
                    },
                    renderer: formatDate
                }, {
                    header: "结束日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "endDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'endDt'
                    },
                    renderer: formatDate
                }, {
                    header: "定期存款账号",
                    width: 120,
                    sortable: false,
                    dataIndex: "regularDepAcctId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'regularDepAcctId'
                    }
                }, {
                    header: "利息借方账号",
                    width: 120,
                    sortable: false,
                    dataIndex: "intDbAcctId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'intDbAcctId'
                    }
                }, {
                    header: "存款金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "depAmt",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'depAmt'
                    }
                }, {
                    header: "存款收益",
                    width: 120,
                    sortable: false,
                    dataIndex: "depRetns",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'depRetns'
                    }
                }, {
                    header: "存款银行名称",
                    width: 120,
                    sortable: false,
                    dataIndex: "depBankName",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'depBankName'
                    }
                }, {
                    header: "存款利率",
                    width: 120,
                    sortable: false,
                    dataIndex: "depIntRate",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'depIntRate'
                    }
                }, {
                    header: "银行支行",
                    width: 120,
                    sortable: false,
                    dataIndex: "branch",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'branch'
                    }
                }, {
                    header: "计息天数",
                    width: 120,
                    sortable: false,
                    dataIndex: "calIntDays",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'calIntDays'
                    }
                }, {
                    header: "存款类型代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "depTypeCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'depTypeCd'
                    }
                }],
                border: false
            });
            panel.add(this.grid);
        },

        //查询
        search: function () {
            var self = this;
            self.store.clearData();
            var yhckywdate = Ext.getCmp("yhckywdate").getValue().format('Y-m-d');
            var bankDeposit = {startDt: yhckywdate};
            var pd = {fileType: 'T05_BANK_DEP_TXN', bankDepositReport: bankDeposit};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var yhckywRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "bargainId"}, {name: "ptfId"}, {name: "depRecptId"}, {name: "startDt"}, {name: "endDt"},
                        {name: "depBizTypeCd"}, {name: "withInAdvInd"}, {name: "savingDepAcctId"}, {name: "regularDepAcctId"}, {name: "intDbAcctId"}, {name: "intCrAcctId"},
                        {name: "depAmt"}, {name: "depRetns"}, {name: "depBankName"}, {name: "depIntRate"}, {name: "withInAdvIntLossInd"}, {name: "accruedModeCd"},
                        {name: "fixDepCalIntModeCd"}, {name: "fixDepIntRateTypeCd"}, {name: "adjIntModeCd"}, {name: "payIntModeCd"}, {name: "withInAdvRemarks"}, {name: "branch"},
                        {name: "calIntDays"}, {name: "agrDepLmt"}, {name: "agrDepIntRate"}, {name: "fixppAmt"}, {name: "fixppIntRate"}, {name: "fixppDepAmtRelaCd"},
                        {name: "depNoticeDays"}, {name: "dueDtEnableInd"}, {name: "amtSplit"}, {name: "withdrawDt"}, {name: "hookType"}, {name: "calIntModeCd"},
                        {name: "depTypeCd"}, {name: "pndg"}, {name: "reserveIntRate"}, {name: "calIntBase"}, {name: "floatCalIntInd"}, {name: "bankAcctId"},
                        {name: "baseExRate"}, {name: "ptfExRate"}, {name: "hdlUserId"}, {name: "chkUsrId"}, {name: "chkStatCd"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new yhckywRecord(obj[i], obj[i].id);
                        self.store.add(rec);
                    }
                }
            });
        },

        //编辑
        edit: function () {
            var self = this;
            var m = self.store.getModifiedRecords().slice(0);
            if (null != m && m.length == 0) {
                Ext.Msg.alert("提示", "请检查需要修改的内容");
            } else {
                var editDetails = [];
                Ext.each(m, function (item) {
                    if (typeof (item.data.startDt) === "object") {
                        item.data.startDt = item.data.startDt.format('Y-m-d');
                    }
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'T05_BANK_DEP_TXN', editDetails: JSON.stringify(editDetails)};
                Ext.Ajax.request({
                    method: 'post',
                    dataType: 'json',
                    headers: {'Content-Type': 'application/json'},
                    url: '/processData/updateProcessData',
                    jsonData: JSON.stringify(pd),
                    success: function (response) {
                        self.store.commitChanges();//防止加载上次修改数据
                        self.search();
                        Ext.Msg.alert("信息", "修改成功！");
                    }, failure: function () {
                        Ext.Msg.alert("错误", "加载数据失败！");
                    }
                });
            }
        },


        //删除
        del: function () {
            if (this.grid.getSelectionModel().hasSelection()) {
                var st = this.store;
                var recs = this.grid.getSelectionModel().getSelections();
                var ids = "";
                for (var i = 0; i < recs.length; i++) {
                    ids += recs[i].data.id + ",";
                }
                var pd = {fileType: 'T05_BANK_DEP_TXN', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的银行存款业务信息？", function (btn) {
                    if (btn == "yes") {
                        Ext.Ajax.request({
                            method: 'post',
                            dataType: 'json',
                            headers: {'Content-Type': 'application/json'},
                            url: '/processData/deleteProcessData',
                            jsonData: JSON.stringify(pd),
                            success: function (response) {
                                st.remove(recs); //前台删除
                                Ext.Msg.alert("信息", "删除成功！");
                            }, failure: function () {
                                Ext.Msg.alert("错误", "加载数据失败！");
                            }
                        });
                    }
                });
            } else {
                Ext.Msg.alert("信息", "请选择要删除的银行存款业务信息！");
            }
        },

        //导出
        export: function () {
            var self = this;
            var yhckywdate = Ext.getCmp('yhckywdate').getValue();
            if (null == yhckywdate || '' == yhckywdate || yhckywdate == undefined) {
                Ext.Msg.alert("提示", "请设置导出日期！");
            } else {
                var ywdate =yhckywdate.format("Y-m-d");
                var con = {queryDate: ywdate ,fileType:'T05_BANK_DEP_TXN'};
                Ext.Ajax.request({
                    method: 'post',
                    dataType: 'json',
                    headers: {'Content-Type': 'application/json'},
                    url: '/queryData/makeReport',
                    jsonData: JSON.stringify(con),
                    success: function (response) {
                        Ext.Msg.alert("提示", "数据导出成功！");
                    }, failure: function () {
                        Ext.Msg.alert("错误", "加载数据失败！");
                    }
                });
            }
        }
    }
}();

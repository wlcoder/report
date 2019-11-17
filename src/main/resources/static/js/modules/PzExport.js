/*
 * 凭证表
 */
App.PzExport = function () {
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
                storeId: "pzStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "billDt"}, {name: "vchNbr"}, {name: "vchEntriesNbr"}, {name: "ptfId"}, {name: "acctingPeroid"},
                    {name: "vchCatg"}, {name: "coaId"}, {name: "ccyCd"}, {name: "exRate"}, {name: "recncltInd"}, {name: "txnAmtOccy"},
                    {name: "txnAmtDccy"}, {name: "dbCrInd"}, {name: "txnQty"}, {name: "vchSrcCd"}, {name: "vchMemo"}, {name: "occurDt"},
                    {name: "billTm"}, {name: "accessoryQty"}, {name: "postingInd"}, {name: "secuTxnMode"}, {name: "srcPtfId"}, {name: "assistAcctingCd"},
                    {name: "vchAssocNbr"}, {name: "inMemoNbr"}, {name: "bizRefNbr"}, {name: "gmsVchNbr"}, {name: "remarks"}, {name: "reserve1"},
                    {name: "reserve2"}, {name: "bilingUsrId"}, {name: "chkUsrId"}, {name: "modUsrId"}, {name: "postingUsrId"}, {name: "cfmUsrId"},
                    {name: "bondCd"}, {name: "exchangeCd"}
                ],
                // url: "rescourse/data/dbconfig.json",
                totalProperty: "total",
                pruneModifiedRecords: true,
                root: "rows"
            });
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
                        id: 'pzdate',
                        xtype: 'datefield',
                        name: 'billDt',
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
                /* bbar: new Ext.PagingToolbar({
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
                    header: "记账日期",
                    width: 120,
                    sortable: true,
                    dataIndex: "billDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: "billDt",
                    },
                    renderer: formatDate
                }, {
                    header: "凭证号",
                    width: 120,
                    sortable: false,
                    dataIndex: "vchNbr",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'vchNbr'
                    }
                }, {
                    header: "凭证分录号",
                    width: 120,
                    sortable: false,
                    dataIndex: "vchEntriesNbr",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'vchEntriesNbr'
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
                    header: "凭证类别",
                    width: 120,
                    sortable: false,
                    dataIndex: "vchCatg",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'vchCatg'
                    }
                }, {
                    header: "科目编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "coaId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'coaId'
                    }
                }, {
                    header: "货币代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "ccyCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ccyCd'
                    }
                }, {
                    header: "汇率",
                    width: 120,
                    sortable: false,
                    dataIndex: "exRate",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'exRate'
                    }
                }, {
                    header: "交易金额原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "txnAmtOccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'txnAmtOccy'
                    }
                }, {
                    header: "交易金额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "txnAmtDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'txnAmtDccy'
                    }
                }, {
                    header: "借贷标志",
                    width: 120,
                    sortable: false,
                    dataIndex: "dbCrInd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'dbCrInd'
                    }
                }, {
                    header: "交易数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "txnQty",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'txnQty'
                    }
                }, {
                    header: "单价",
                    width: 120,
                    sortable: false,
                    dataIndex: "unitPrc",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'unitPrc'
                    }
                }, {
                    header: "凭证来源代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "vchSrcCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'vchSrcCd'
                    }
                }, {
                    header: "凭证摘要",
                    width: 200,
                    sortable: false,
                    dataIndex: "vchMemo",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'vchMemo'
                    }
                }],
                border: false
            });
            panel.add(this.grid);
        },

        //查询
        search: function () {
            var self = this;
            debugger;
            self.store.clearData();
            var pzdate = Ext.getCmp("pzdate").getValue().format('Y-m-d');
            Ext.Ajax.request({
                method: 'post',
                params: 'billDt=' + pzdate,
                url: '/t04FinVch/queryT04FinVch',
                success: function (response) {
                    var pzRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "billDt"}, {name: "vchNbr"}, {name: "vchEntriesNbr"}, {name: "ptfId"}, {name: "acctingPeroid"},
                        {name: "vchCatg"}, {name: "coaId"}, {name: "ccyCd"}, {name: "exRate"}, {name: "recncltInd"}, {name: "txnAmtOccy"},
                        {name: "txnAmtDccy"}, {name: "dbCrInd"}, {name: "txnQty"}, {name: "vchSrcCd"}, {name: "vchMemo"}, {name: "occurDt"},
                        {name: "billTm"}, {name: "accessoryQty"}, {name: "postingInd"}, {name: "secuTxnMode"}, {name: "srcPtfId"}, {name: "assistAcctingCd"},
                        {name: "vchAssocNbr"}, {name: "inMemoNbr"}, {name: "bizRefNbr"}, {name: "gmsVchNbr"}, {name: "remarks"}, {name: "reserve1"},
                        {name: "reserve2"}, {name: "bilingUsrId"}, {name: "chkUsrId"}, {name: "modUsrId"}, {name: "postingUsrId"}, {name: "cfmUsrId"},
                        {name: "bondCd"}, {name: "exchangeCd"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new pzRecord(obj[i], obj[i].id);
                        self.store.add(rec);
                    }
                }
            });
        },

        //编辑
        edit: function () {
            var self = this;
            var m = this.store.getModifiedRecords().slice(0);
            if (null != m && m.length == 0) {
                Ext.Msg.alert("提示", "请检查需要修改的内容");
            } else {
                var pzArray = [];
                Ext.each(m, function (item) {
                    if (typeof (item.data.billDt) === "object") {
                        item.data.billDt = item.data.billDt.format('Y-m-d');
                    }
                    pzArray.push(item.data);
                });
                Ext.Ajax.request({
                    method: 'post',
                    dataType: 'json',
                    headers: {'Content-Type': 'application/json'},
                    url: '/t04FinVch/updateT04FinVch',
                    jsonData: JSON.stringify(pzArray),
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
                var names = "";
                var ids = "";
                for (var i = 0; i < recs.length; i++) {
                    // names += recs[i].data.code1 + "<br />";
                    ids += recs[i].data.id + ",";
                }
                Ext.Msg.confirm("确认", "确认删除选中的凭证？", function (btn) {
                    if (btn == "yes") {
                        Ext.Ajax.request({
                            method: 'post',
                            url: '/t04FinVch/delT04FinVch',
                            params: 'ids=' + ids,
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
                Ext.Msg.alert("信息", "请选择要删除的凭证！");
            }
        },
        //导出
        export: function () {
            var self = this;
            var pzdate = Ext.getCmp('pzdate').getValue();
            if (null == pzdate || '' == pzdate || pzdate == undefined) {
                Ext.Msg.alert("提示", "请设置导出日期！");
            } else {
                var ywdate =pzdate.format("Y-m-d");
                var con = {queryDate: ywdate ,fileType:'T04_FIN_VCH'};
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


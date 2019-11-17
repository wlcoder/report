/*
 * 估值表
 */
App.GzExport = function () {
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
                storeId: "gzStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "evlDt"}, {name: "ptfId"}, {name: "coaId"}, {name: "ccyCd"}, {name: "coaName"},
                    {name: "secuCd"}, {name: "exchangeCd"}, {name: "secuQty"}, {name: "unitBuyCost"}, {name: "costOccy"}, {name: "costDccy"},
                    {name: "costNavRatioOccy"}, {name: "costNavRatioDccy"}, {name: "evlPrc"}, {name: "mktEvlMethodCd"}, {name: "mktValOccy"}, {name: "mktValDccy"},
                    {name: "mktNavRatioOccy"}, {name: "mktNavRatioDccy"}, {name: "evlAprctOccy"}, {name: "evlAprctDccy"}, {name: "evlAprctNavRatioOccy"}, {name: "evlAprctCoaId"},
                    {name: "baseExRate"}, {name: "ptfExRate"}, {name: "convertProfitLoss"}, {name: "rightsInfo"}, {name: "mktDesc"}, {name: "originSecuCd"}
                ],
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
                        id: 'gzdate',
                        xtype: 'datefield',
                        name: 'evlDt',
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
                /*  bbar: new Ext.PagingToolbar({
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
                    header: "估值日期",
                    width: 100,
                    sortable: true,
                    dataIndex: "evlDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: "evlDt"
                    },
                    renderer: formatDate
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
                },  {
                    header: "科目名称",
                    width: 120,
                    sortable: false,
                    dataIndex: "coaName",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'coaName'
                    }
                },{
                    header: "证券代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "secuCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'secuCd'
                    }
                }, {
                    header: "证券数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "secuQty",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'secuQty'
                    }
                }, {
                    header: "单位买入成本",
                    width: 120,
                    sortable: false,
                    dataIndex: "unitBuyCost",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'unitBuyCost'
                    }
                }, {
                    header: "成本原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "costOccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'costOccy'
                    }
                }, {
                    header: "成本本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "costDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'costDccy'
                    }
                }, {
                    header: "成本净值比原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "costNavRatioOccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'costNavRatioOccy'
                    }
                }, {
                    header: "成本净值比本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "costNavRatioDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'costNavRatioDccy'
                    }
                }, {
                    header: "估值价格",
                    width: 120,
                    sortable: false,
                    dataIndex: "evlPrc",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'evlPrc'
                    }
                }, {
                    header: "行情估值方法代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "mktEvlMethodCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'mktEvlMethodCd'
                    }
                }, {
                    header: "市值原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "mktValOccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'mktValOccy'
                    }
                }, {
                    header: "市值本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "mktValDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'mktValDccy'
                    }
                }, {
                    header: "市值净值比原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "mktNavRatioOccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'mktNavRatioOccy'
                    }
                }, {
                    header: "市值净值比本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "mktNavRatioDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'mktNavRatioDccy'
                    }
                }, {
                    header: "估值增值原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "evlAprctOccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'evlAprctOccy'
                    }
                }, {
                    header: "估值增值本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "evlAprctDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'evlAprctDccy'
                    }
                }, {
                    header: "估值增值净值比原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "evlAprctNavRatioOccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'evlAprctNavRatioOccy'
                    }
                }, {
                    header: "估值增值科目编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "evlAprctCoaId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'evlAprctCoaId'
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
            var gzdate = Ext.getCmp("gzdate").getValue().format('Y-m-d');
            var veal = {evlDt: gzdate};
            var pd = {fileType: 'T04_FIN_EVL', evalReport: veal};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var gzRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "evlDt"}, {name: "ptfId"}, {name: "coaId"}, {name: "ccyCd"}, {name: "coaName"},
                        {name: "secuCd"}, {name: "exchangeCd"}, {name: "secuQty"}, {name: "unitBuyCost"}, {name: "costOccy"}, {name: "costDccy"},
                        {name: "costNavRatioOccy"}, {name: "costNavRatioDccy"}, {name: "evlPrc"}, {name: "mktEvlMethodCd"}, {name: "mktValOccy"}, {name: "mktValDccy"},
                        {name: "mktNavRatioOccy"}, {name: "mktNavRatioDccy"}, {name: "evlAprctOccy"}, {name: "evlAprctDccy"}, {name: "evlAprctNavRatioOccy"}, {name: "evlAprctCoaId"},
                        {name: "baseExRate"}, {name: "ptfExRate"}, {name: "convertProfitLoss"}, {name: "rightsInfo"}, {name: "mktDesc"}, {name: "originSecuCd"}

                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new gzRecord(obj[i], obj[i].id);
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
                    if (typeof (item.data.evlDt) === "object") {
                        item.data.evlDt = item.data.evlDt.format('Y-m-d');
                    }
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'T04_FIN_EVL', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'T04_FIN_EVL', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的估值信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的估值信息！");
            }
        },

        //导出
        export: function () {
            var self = this;
            var gzdate = Ext.getCmp('gzdate').getValue();
            if (null == gzdate || '' == gzdate || gzdate == undefined) {
                Ext.Msg.alert("提示", "请设置导出日期！");
            } else {
                var ywdate = gzdate.format("Y-m-d");
                var con = {queryDate: ywdate, fileType: 'T04_FIN_EVL'};
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

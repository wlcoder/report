/*
 * 银行间回购信息
 */
App.YhjhgExport = function () {
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
                storeId: "yhjhgStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "hgcpdm"}, {name: "hgcjbh"}, {name: "hgcode"}, {name: "hgstrd"}, {name: "hgdate"},
                    {name: "hgendd"}, {name: "hgjxts"}, {name: "hghgfs"}, {name: "hghgfx"}, {name: "hgfkje"}, {name: "hgcjje"},
                    {name: "hghglv"}, {name: "hgfsxf"}, {name: "hgfghf"}, {name: "hgfyhf"}, {name: "hgzjzh"}, {name: "hgglfn"},
                    {name: "hgjusr"}, {name: "hgsusr"}, {name: "hgstat"}, {name: "hgjsjg"}
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
                        id: 'yhjhgdate',
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
                /*   bbar: new Ext.PagingToolbar({
                       store: this.store,
                       pageSize: 20,
                       displayInfo: true
                   }),
                */
                store: this.store,
                sm: sm,
                columns: [sm, {
                    header: "编号",
                    width: 100,
                    sortable: true,
                    dataIndex: "id",
                    hidden: true
                }, {
                    header: "投资组合编号",
                    width: 120,
                    sortable: true,
                    dataIndex: "hgcpdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgcpdm'
                    }
                }, {
                    header: "回购品种",
                    width: 120,
                    sortable: true,
                    dataIndex: "hgcode",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgcode'
                    }
                }, {
                    header: "成交编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgcjbh",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgcjbh'
                    }
                }, {
                    header: "成交日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgdate",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'hgdate'
                    },
                    renderer: formatDate
                }, {
                    header: "首期交割日",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgstrd",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'hgstrd'
                    },
                    renderer: formatDate
                }, {
                    header: "到期交割日",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgendd",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'hgendd'
                    },
                    renderer: formatDate
                }, {
                    header: "结算机构",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgjsjg",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgjsjg'
                    }
                }, {
                    header: "计息天数",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgjxts",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgjxts'
                    }
                }, {
                    header: "回购方式",
                    width: 120,
                    sortable: false,
                    dataIndex: "hghgfs",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hghgfs'
                    }
                }, {
                    header: "成交金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgcjje",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgcjje'
                    }
                }, {
                    header: "返款金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgfkje",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgfkje'
                    }
                }, {
                    header: "回购利率",
                    width: 120,
                    sortable: false,
                    dataIndex: "hghglv",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hghglv'
                    }
                }, {
                    header: "手续费",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgfsxf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgfsxf'
                    }
                }, {
                    header: "过户费",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgfghf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgfghf'
                    }
                }, {
                    header: "银行费用",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgfyhf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgfyhf'
                    }
                }, {
                    header: "资金账户",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgzjzh",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgzjzh'
                    }
                }, {
                    header: "关联交易方",
                    width: 120,
                    sortable: false,
                    dataIndex: "hgglfn",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hgglfn'
                    }
                }],
                border: false,
            });
            panel.add(this.grid);
        },

        //查询
        search: function () {
            var self = this;
            self.store.clearData();
            var yhjhgdate = Ext.getCmp("yhjhgdate").getValue().format('Y-m-d');
            var bankRepo = {hgdate: yhjhgdate};
            var pd = {fileType: 'YHJHG', bankRepoReport: bankRepo};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var yhjhgRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "hgcpdm"}, {name: "hgcjbh"}, {name: "hgcode"}, {name: "hgstrd"}, {name: "hgdate"},
                        {name: "hgendd"}, {name: "hgjxts"}, {name: "hghgfs"}, {name: "hghgfx"}, {name: "hgfkje"}, {name: "hgcjje"},
                        {name: "hghglv"}, {name: "hgfsxf"}, {name: "hgfghf"}, {name: "hgfyhf"}, {name: "hgzjzh"}, {name: "hgglfn"},
                        {name: "hgjusr"}, {name: "hgsusr"}, {name: "hgstat"}, {name: "hgjsjg"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new yhjhgRecord(obj[i], obj[i].id);
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
                    if (null != item.data.hgdate && typeof (item.data.hgdate) === "object") {
                        item.data.hgdate = item.data.hgdate.format('Y-m-d');
                    }
                    if (null != item.data.hgstrd && typeof (item.data.hgstrd) === "object") {
                        item.data.hgstrd = item.data.hgstrd.format('Y-m-d');
                    }
                    if (null != item.data.hgendd && typeof (item.data.hgendd) === "object") {
                        item.data.hgendd = item.data.hgendd.format('Y-m-d');
                    }
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'YHJHG', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'YHJHG', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的银行间回购信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的银行间回购信息！");
            }
        },
        //导出
        export: function () {
            var self = this;
            var yhjhgdate = Ext.getCmp('yhjhgdate').getValue();
            if (null == yhjhgdate || '' == yhjhgdate || yhjhgdate == undefined) {
                Ext.Msg.alert("提示", "请设置导出日期！");
            } else {
                var ywdate = yhjhgdate.format("Y-m-d");
                var con = {queryDate: ywdate, fileType: 'YHJHG'};
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

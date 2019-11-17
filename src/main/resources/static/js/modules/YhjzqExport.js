/*
 * 银行间债券信息
 */
App.YhjzqExport = function () {
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
                storeId: "yhjzqStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "yzcpdm"}, {name: "yzdate"}, {name: "yzjgrq"}, {name: "yzzqdm"}, {name: "yzzjzh"},
                    {name: "yzjylx"}, {name: "yzjjje"}, {name: "yzshlx"}, {name: "yzcjsl"}, {name: "yzfsxf"}, {name: "yzfghf"},
                    {name: "yzfyhf"}, {name: "yzglfn"}, {name: "yzjusr"}, {name: "yzsusr"}, {name: "yzstat"}, {name: "yzzqlb"},
                    {name: "yzlvlx"}, {name: "yzpmje"}, {name: "yzjsjg"}, {name: "yzjsfs"}
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
                        id: 'yhjzqdate',
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
                /*     bbar: new Ext.PagingToolbar({
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
                    header: "投资组合编号",
                    width: 120,
                    sortable: true,
                    dataIndex: "yzcpdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzcpdm'
                    }
                }, {
                    header: "成交编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzcjbh",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzcjbh'
                    }
                }, {
                    header: "成交日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzdate",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'yzdate'
                    },
                    renderer: formatDate
                }, {
                    header: "结算机构",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjsjg",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzjsjg'
                    }
                }, {
                    header: "交割日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjgrq",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'yzjgrq'
                    },
                    renderer: formatDate
                }, {
                    header: "债券代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzzqdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzzqdm'
                    }
                }, {
                    header: "债券类别",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzzqlb",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzzqlb'
                    }
                }, {
                    header: "利率类型",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzlvlx",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzlvlx'
                    }
                }, {
                    header: "票面金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzpmje",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzpmje'
                    }
                }, {
                    header: "本方资金账户",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzzjzh",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzzjzh'
                    }
                }, {
                    header: "交易类型",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjylx",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzjylx'
                    }
                }, {
                    header: "净价金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjjje",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzjjje'
                    }
                }, {
                    header: "所含利息",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzshlx",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzshlx'
                    }
                }, {
                    header: "成交数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzcjsl",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzcjsl'
                    }
                }, {
                    header: "手续费",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzfsxf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzfsxf'
                    }
                }, {
                    header: "结算过户费",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzfghf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzfghf'
                    }
                }, {
                    header: "银行费用",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzfyhf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzfyhf'
                    }
                }, {
                    header: "关联交易方",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzglfn",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'yzglfn'
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
            var yhjzqdate = Ext.getCmp("yhjzqdate").getValue().format('Y-m-d');
            var bankSecurity = {yzdate: yhjzqdate};
            var pd = {fileType: 'YHJZQ', bankSecurityReport: bankSecurity};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var yhjzqRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "yzcpdm"}, {name: "yzdate"}, {name: "yzjgrq"}, {name: "yzzqdm"}, {name: "yzzjzh"},
                        {name: "yzjylx"}, {name: "yzjjje"}, {name: "yzshlx"}, {name: "yzcjsl"}, {name: "yzfsxf"}, {name: "yzfghf"},
                        {name: "yzfyhf"}, {name: "yzglfn"}, {name: "yzjusr"}, {name: "yzsusr"}, {name: "yzstat"}, {name: "yzzqlb"},
                        {name: "yzlvlx"}, {name: "yzpmje"}, {name: "yzjsjg"}, {name: "yzjsfs"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new yhjzqRecord(obj[i], obj[i].id);
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
                    if (null  != item.data.yzdate &&typeof (item.data.yzdate) === "object") {
                        item.data.yzdate = item.data.yzdate.format('Y-m-d');
                    }
                    if (null  != item.data.yzjgrq && typeof (item.data.yzjgrq) === "object") {
                        item.data.yzjgrq = item.data.yzjgrq.format('Y-m-d');
                    }
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'YHJZQ', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'YHJZQ', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的银行间債券信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的银行间債券信息！");
            }
        },
        //导出
        export: function () {
            var self = this;
            var yhjzqdate = Ext.getCmp('yhjzqdate').getValue();
            if (null == yhjzqdate || '' == yhjzqdate || yhjzqdate == undefined) {
                Ext.Msg.alert("提示", "请设置导出日期！");
            } else {
                var ywdate =yhjzqdate.format("Y-m-d");
                var con = {queryDate: ywdate ,fileType:'YHJZQ'};
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

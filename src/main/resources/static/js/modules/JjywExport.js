/*
 * 基金业务表
 */
App.JjywExport = function () {
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
                storeId: "subiectStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "jjcjbh"}, {name: "jjdate"}, {name: "jjcpdm"}, {name: "jjywlb"}, {name: "jjjjdm"},
                    {name: "jjcjje"}, {name: "jjcjsl"}, {name: "jjjyfy"}, {name: "jjqjlx"}, {name: "jjzjzh"}, {name: "jjjzfs"},
                    {name: "jjreln"}, {name: "jjjusr"}, {name: "jjsusr"}, {name: "jjstat"}
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
                        id: 'jjywdate',
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
                    header: "成交编号",
                    width: 120,
                    sortable: true,
                    dataIndex: "jjcjbh",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjcjbh'
                    }
                }, {
                    header: "业务日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjdate",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'jjdate'
                    },
                    renderer: formatDate
                }, {
                    header: "投资组合编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjcpdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjcpdm'
                    }
                }, {
                    header: "业务类别",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjywlb",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjywlb'
                    }
                }, {
                    header: "基金代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjjjdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjjjdm'
                    }
                }, {
                    header: "金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjcjje",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjcjje'
                    }
                }, {
                    header: "数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjcjsl",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'jjcjsl'
                    }
                }, {
                    header: "交易费用",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjjyfy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjjyfy'
                    }
                }, {
                    header: "期间利息",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjqjlx",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjqjlx'
                    }
                }, {
                    header: "资金账户",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjzjzh",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjzjzh'
                    }
                }, {
                    header: "结转方式",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjjzfs",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjjzfs'
                    }
                }, {
                    header: "关联号",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjreln",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjreln'
                    }
                }, {
                    header: "经办用户",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjjusr",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjjusr'
                    }
                }, {
                    header: "审核用户",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjsusr",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjsusr'
                    }
                }, {
                    header: "状态",
                    width: 120,
                    sortable: false,
                    dataIndex: "jjstat",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'jjstat'
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
            var jjywdate = Ext.getCmp("jjywdate").getValue().format('Y-m-d');
            var fundBusiness = {jjdate: jjywdate};
            var pd = {fileType: 'EVLJJ', fundBusinessReport: fundBusiness};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var jjywRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "jjcjbh"}, {name: "jjdate"}, {name: "jjcpdm"}, {name: "jjywlb"}, {name: "jjjjdm"},
                        {name: "jjcjje"}, {name: "jjcjsl"}, {name: "jjjyfy"}, {name: "jjqjlx"}, {name: "jjzjzh"}, {name: "jjjzfs"},
                        {name: "jjreln"}, {name: "jjjusr"}, {name: "jjsusr"}, {name: "jjstat"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new jjywRecord(obj[i], obj[i].id);
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
                    if (typeof (item.data.jjdate) === "object") {
                        item.data.jjdate = item.data.jjdate.format('Y-m-d');
                    }
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'EVLJJ', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'EVLJJ', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的基金业务信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的基金业务信息！");
            }
        },
        //导出
        export: function () {
            var self = this;
            var jjywdate = Ext.getCmp('jjywdate').getValue();
            if (null == jjywdate || '' == jjywdate || jjywdate == undefined) {
                Ext.Msg.alert("提示", "请设置导出日期！");
            } else {
                var ywdate = jjywdate.format("Y-m-d");
                var con = {queryDate: ywdate, fileType: 'EVLJJ'};
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

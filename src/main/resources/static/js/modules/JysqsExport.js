/*
 * 交易所清算信息
 */
App.JysqsExport = function () {
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
                storeId: "jysqsStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "qsdate"}, {name: "qscrtd"}, {name: "qscpdm"}, {name: "qsywbz"}, {name: "qsmket"}, {name: "qsmmbz"},
                    {name: "qsgqdm"}, {name: "qsgqdm"}, {name: "qszqdm"}, {name: "qsxwdm"}, {name: "qscjsl"}, {name: "qscjje"},
                    {name: "qslxsy"}, {name: "qsfyhs"}, {name: "qsfjsf"}, {name: "qsfzgf"}, {name: "qsfghf"}, {name: "qsfstf"},
                    {name: "qsfsxf"}, {name: "qsffxj"}, {name: "qsfyjf"}, {name: "qsjyfs"}, {name: "qsseqn"}, {name: "qsstat"},
                    {name: "qsjusr"}, {name: "qssusr"}, {name: "qszhxx"}
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
                        id: 'jysqsdate',
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
                /*    bbar: new Ext.PagingToolbar({
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
                    header: "交易日期",
                    width: 120,
                    sortable: true,
                    dataIndex: "qsdate",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'qsdate'
                    },
                    renderer: formatDate
                }, {
                    header: "生成日期",
                    width: 120,
                    sortable: true,
                    dataIndex: "qscrtd",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'qscrtd'
                    },
                    renderer: formatDate
                }, {
                    header: "投资组合编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "qscpdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qscpdm'
                    }
                }, {
                    header: "业务标志",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsywbz",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsywbz'
                    }
                }, {
                    header: "证券代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsgqdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsgqdm'
                    }
                }, {
                    header: "市场",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsmket",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsmket'
                    }
                }, {
                    header: "原始证券代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "qszqdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qszqdm'
                    }
                }, {
                    header: "席位代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsxwdm",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsxwdm'
                    }
                }, {
                    header: "买卖标志",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsmmbz",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsmmbz'
                    }
                }, {
                    header: "成交数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "qscjsl",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qscjsl'
                    }
                }, {
                    header: "成交金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "qscjje",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qscjje'
                    }
                }, {
                    header: "利息或收益",
                    width: 120,
                    sortable: false,
                    dataIndex: "qslxsy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qslxsy'
                    }
                }, {
                    header: "印花说",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsfyhs",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsfyhs'
                    }
                }, {
                    header: "经手费",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsfjsf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsfjsf'
                    }
                }, {
                    header: "征管费",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsfzgf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsfzgf'
                    }
                }, {
                    header: "过户费",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsfghf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsfghf'
                    }
                }, {
                    header: "结算费",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsfstf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsfstf'
                    }
                }, {
                    header: "手续费",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsfsxf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsfsxf'
                    }
                }, {
                    header: "风险金",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsffxj",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsffxj'
                    }
                }, {
                    header: "佣金",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsfyjf",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsfyjf'
                    }
                }, {
                    header: "交易方式",
                    width: 120,
                    sortable: false,
                    dataIndex: "qsjyfs",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qsjyfs'
                    }
                }, {
                    header: "清算账户",
                    width: 120,
                    sortable: false,
                    dataIndex: "qszhxx",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'qszhxx'
                    }
                }],
                border: false,
                // viewConfig: {
                //     forceFit: true
                // },
            });
            panel.add(this.grid);
        },
        //查询
        search: function () {
            var self = this;
            self.store.clearData();
            var jysqsdate = Ext.getCmp("jysqsdate").getValue().format('Y-m-d');
            var exchangeClear = {qsdate: jysqsdate};
            var pd = {fileType: 'JYSQS', exchangeClearReport: exchangeClear};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var jysqsRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "qsdate"}, {name: "qscrtd"}, {name: "qscpdm"}, {name: "qsywbz"}, {name: "qsmket"}, {name: "qsmmbz"},
                        {name: "qsgqdm"}, {name: "qsgqdm"}, {name: "qszqdm"}, {name: "qsxwdm"}, {name: "qscjsl"}, {name: "qscjje"},
                        {name: "qslxsy"}, {name: "qsfyhs"}, {name: "qsfjsf"}, {name: "qsfzgf"}, {name: "qsfghf"}, {name: "qsfstf"},
                        {name: "qsfsxf"}, {name: "qsffxj"}, {name: "qsfyjf"}, {name: "qsjyfs"}, {name: "qsseqn"}, {name: "qsstat"},
                        {name: "qsjusr"}, {name: "qssusr"}, {name: "qszhxx"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new jysqsRecord(obj[i], obj[i].id);
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
                    if (null != item.data.qsdate && typeof (item.data.qsdate) === "object") {
                        item.data.qsdate = item.data.qsdate.format('Y-m-d');
                    }
                    if (null != item.data.qscrtd && typeof (item.data.qscrtd) === "object") {
                        item.data.qscrtd = item.data.qscrtd.format('Y-m-d');
                    }
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'JYSQS', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'JYSQS', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的交易所清算信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的交易所清算信息！");
            }
        },
        //导出
        export: function () {
            var self = this;
            var jysqsdate = Ext.getCmp('jysqsdate').getValue();
            if (null == jysqsdate || '' == jysqsdate || jysqsdate == undefined) {
                Ext.Msg.alert("提示", "请设置导出日期！");
            } else {
                var ywdate = jysqsdate.format("Y-m-d");
                var con = {queryDate: ywdate, fileType: 'JYSQS'};
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

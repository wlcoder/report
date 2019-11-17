/*
 * 非标定义信息
 */
App.FbdyExport = function () {
    return {
        //定义变量
        currentFormValues: {},
        //初始化
        render: function (id) {
            if (!this.store) {
                this.store = this.getStore();
            }
            if (!this.form) {
                this.form = this.getForm();
            }
            if (!this.win) {
                this.win = this.getWin();
            }
            this.createGrid(id);
        },

        //获取store
        getStore: function () {
            var store = new Ext.data.JsonStore({
                storeId: "subiectStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "zqmket"}, {name: "zqcode"}, {name: "zqname"}, {name: "zqcpdm"}, {name: "zqzqlb"}
                ],
                // url: "rescourse/data/dbconfig.json",
                totalProperty: "total",
                root: "rows"
            });
            //store.load();
            return store;
        },

        //创建表单
        getForm: function () {
            var form = new Ext.form.FormPanel({
                labelWidth: 70,
                buttonAlign: "center",
                bodyStyle: "padding:10px;",
                frame: true,
                defaultType: "textfield",
                defaults: {
                    allowBlank: false,
                    anchor: "98%",
                    enableKeyEvents: false
                },
                items: [{
                    xtype: "hidden",
                    name: "id",
                    value: ""
                }, {
                    name: "zqmket",
                    fieldLabel: "市场"
                }, {
                    name: "zqcode",
                    fieldLabel: "非标代码"
                }, {
                    name: "zqname",
                    fieldLabel: "非标名称"
                }, {
                    name: "zqcpdm",
                    fieldLabel: "投资组合编号"
                }],
                buttons: [{
                    text: "确定",
                    scope: this,
                    handler: function () {
                        this.submit();
                    }
                }, {
                    text: "重置",
                    scope: this,
                    handler: function () {
                        this.form.getForm().reset();
                        this.form.getForm().setValues(this.currentFormValues);
                        this.form.getForm().clearInvalid();
                    }
                }]
            });
            return form;
        },

        submit: function () {
            var fr = this.form.getForm();	//获取BasicForm对象
            if (fr.isValid()) {
                var id = fr.findField("id").getValue();
                var obj = fr.getValues();
                var self = this;
                if (id) {
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/exportData/test/update',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            Ext.Msg.alert("响应内容", response.responseText);
                            var subjectRecord = Ext.data.Record.create([
                                {name: "id"}, {name: "zqmket"}, {name: "zqcode"}, {name: "zqname"}, {name: "zqcpdm"}, {name: "zqzqlb"}
                            ]);
                            var obj = Ext.decode(response.responseText);
                            for (var i = 0; i < obj.length; i++) {
                                var rec = new subjectRecord(obj[i], obj[i].id);
                                self.store.commitChanges();	//提交修改数据
                            }
                        }, failure: function () {
                            Ext.Msg.alert("错误", "加载数据失败！");
                        }
                    });

                } else {
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/exportData/test/testExt',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            Ext.Msg.alert("响应内容", response.responseText);
                            var subjectRecord = Ext.data.Record.create([
                                {name: "id"}, {name: "zqmket"}, {name: "zqcode"}, {name: "zqname"}, {name: "zqcpdm"}, {name: "zqzqlb"}
                            ]);
                            var obj = Ext.decode(response.responseText);
                            for (var i = 0; i < obj.length; i++) {
                                var rec = new subjectRecord(obj[i], obj[i].id);
                                self.store.add(rec);
                            }
                        }, failure: function () {
                            Ext.Msg.alert("错误", "加载数据失败！");
                        }
                    });
                }
                this.win.hide();
            }
        },

        //创建窗口
        getWin: function () {
            var win = new Ext.Window({
                width: 400,
                height: 350,
                title: "",
                plain: true,
                resizable: false,
                frame: true,
                closeAction: "hide",
                border: false,
                modal: true,
                layout: "fit",
                items: [this.form],
                listeners: {
                    scope: this,
                    render: function (fp) {
                        this.form.form.waitMsgTarget = fp.getEl();
                    },
                    show: function () {
                        this.form.form.setValues(this.currentFormValues);
                        this.form.form.clearInvalid();
                    }
                }
            });
            return win;
        },

        //创建Grid
        createGrid: function (id) {
            var panel = Ext.getCmp(id);
            panel.body.dom.innerHTML = "";
            var sm = new Ext.grid.CheckboxSelectionModel();

            this.grid = new Ext.grid.GridPanel({
                tbar: [{
                    text: "查询",
                    iconCls: "x-btn-search",
                    scope: this,
                    handler: this.search
                }, "-", {
                    text: "新增",
                    iconCls: "x-btn-add",
                    scope: this,
                    handler: this.add
                }, "-", {
                    text: "修改",
                    iconCls: "x-btn-edit",
                    scope: this,
                    handler: this.edit
                }, "-", {
                    text: "删除",
                    iconCls: "x-btn-del",
                    scope: this,
                    handler: this.del
                }, "-", {
                    text: "导出",
                    iconCls: "x-btn-download",
                    scope: this,
                    handler: this.export
                }],
                bbar: new Ext.PagingToolbar({
                    store: this.store,
                    pageSize: 20,
                    displayInfo: true
                }),

                store: this.store,
                sm: sm,
                columns: [sm, {
                    header: "编号",
                    width: 100,
                    sortable: true,
                    dataIndex: "id"
                }, {
                    header: "市场",
                    width: 120,
                    sortable: true,
                    dataIndex: "zqmket"
                }, {
                    header: "非标代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "zqcode"
                }, {
                    header: "非标名称",
                    width: 120,
                    sortable: false,
                    dataIndex: "zqname"
                }, {
                    header: "投资组合编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "zqcpdm"
                }, {
                    header: "非标类别",
                    width: 120,
                    sortable: false,
                    dataIndex: "zqzqlb"
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
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/exportData/test/finddb',
                jsonData: '',
                success: function (response) {
                    //  Ext.Msg.alert("响应内容", response.responseText);
                    var subjectRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "zqmket"}, {name: "zqcode"}, {name: "zqname"}, {name: "zqcpdm"}, {name: "zqzqlb"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new dbconfigRecord(obj[i], obj[i].id);
                        self.store.add(rec);
                    }
                }
            });
        },

        //新增
        add: function () {
            this.win.setTitle("新增非标定义信息信息");
            Ext.apply(this.currentFormValues, {
                id: "",
                code1: "",
                code2: ""
            });
            this.win.show();
        },

        //编辑
        edit: function () {
            if (this.grid.getSelectionModel().hasSelection()) {
                this.win.setTitle("编辑非标定义信息信息");
                var rec = this.grid.getSelectionModel().getSelected();
                Ext.apply(this.currentFormValues, {
                    id: rec.data.id,
                    code1: rec.data.code1,
                    code2: rec.data.code2
                });
//				this.form.getForm().loadRecord(rec);
                this.win.show();
            } else {
                Ext.Msg.alert("信息", "请选择要编辑的非标定义信息信息！");
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
                    names += recs[i].data.code1 + "<br />";
                    ids += recs[i].data.id + ",";
                }
                debugger;
                Ext.Msg.confirm("确认", "确认删除以下非标定义信息信息？<br />" + names, function (btn) {
                    if (btn == "yes") {
                        //st.reload();
                        Ext.Ajax.request({
                            method: 'post',
                            //    dataType: 'json',
                            //   headers: {'Content-Type': 'application/json'},
                            url: '/exportData/test/deltest',
                            params: 'ids=' + ids,
                            success: function (response) {
                                st.remove(recs); //前台删除
                            }, failure: function () {
                                Ext.Msg.alert("错误", "加载数据失败！");
                            }
                        });
                    }
                });
            } else {
                Ext.Msg.alert("信息", "请选择要删除的非标定义信息信息！");
            }
        }
    }
}();


/*
 * 数据库配置
 */

App.Dbconfig = function () {
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
                storeId: "dbconfigStore",
                autoLoad: true,
                fields: [
                    {name: "id"},
                    {name: "ip"},
                    {name: "port"},
                    {name: "instanceName"},
                    {name: "userName"},
                    {name: "passWord"}
                ],
                // url: "rescourse/data/dbconfig.json",
                totalProperty: "total",
                root: "rows"
            });
            //store.load();
            // return store;


            var flagstore = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({url: '/database/queryDatabase',}),
                reader: new Ext.data.JsonReader({},
                    [{name: "id"},
                        {name: "ip"},
                        {name: "port"},
                        {name: "instanceName"},
                        {name: "userName"},
                        {name: "passWord"}])
            });
            return flagstore;
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
                    name: "ip",
                    fieldLabel: "ip"
                }, {
                    name: "port",
                    fieldLabel: "端口号"
                }, {
                    name: "instanceName",
                    fieldLabel: "实例名"
                }, {
                    name: "userName",
                    fieldLabel: "用户名"
                }, {
                    name: "passWord",
                    fieldLabel: "密码"
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
            var store = this.store;
            var self = this;
            if (fr.isValid()) {
                var id = fr.findField("id").getValue();
                var obj = fr.getValues();
                var self = this;
                if (id) {
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/database/updateDatabase',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            self.search();
                            Ext.Msg.alert("信息", "修改成功！");
                        }, failure: function () {
                            Ext.Msg.alert("错误", "加载数据失败！");
                        }
                    });
                } else {
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/database/saveDatabase',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            self.search();
                            Ext.Msg.alert("信息", response.responseText);
                        }, failure: function (data) {
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
                height: 250,
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
                }],
                /* bbar: new Ext.PagingToolbar({
                     store: this.store,
                     pageSize: 2,
                     displayInfo: true
                 }),*/

                store: this.store,
                sm: sm,
                columns: [sm, {
                    header: "ip",
                    width: 100,
                    sortable: true,
                    dataIndex: "ip"
                }, {
                    header: "端口号",
                    width: 200,
                    sortable: true,
                    dataIndex: "port"
                }, {
                    header: "实例名",
                    width: 200,
                    sortable: true,
                    dataIndex: "instanceName"
                }, {
                    header: "用户名",
                    width: 200,
                    sortable: false,
                    dataIndex: "userName"
                }, {
                    header: "密码",
                    width: 200,
                    sortable: false,
                    dataIndex: "passWord"
                }],

                border: false,
                viewConfig: {
                    forceFit: true
                },
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
                url: '/database/queryDatabase',
                jsonData: '',
                success: function (response) {
                    // Ext.Msg.alert("响应内容", response.responseText);
                    var dbconfigRecord = Ext.data.Record.create([
                        {name: "id"},
                        {name: "ip"},
                        {name: "port"},
                        {name: "instanceName"},
                        {name: "userName"},
                        {name: "passWord"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new dbconfigRecord(obj[i]);
                        self.store.add(rec);
                    }
                }, failure: function (data) {
                    Ext.Msg.alert("错误", "加载数据失败！");
                }
            });
        },

        //新增
        add: function () {
            this.win.setTitle("新增数据库");
            Ext.apply(this.currentFormValues, {
                id: "",
                ip: "",
                port: "",
                instanceName: "",
                userName: "",
                passWord: ""
            });
            this.win.show();
        },

        //编辑
        edit: function () {
            if (this.grid.getSelectionModel().hasSelection()) {
                this.win.setTitle("编辑数据库");
                var rec = this.grid.getSelectionModel().getSelected();
                Ext.apply(this.currentFormValues, {
                    id: rec.data.id,
                    ip: rec.data.ip,
                    port: rec.data.port,
                    instanceName: rec.data.instanceName,
                    userName: rec.data.userName,
                    passWord: rec.data.passWord
                });
//				this.form.getForm().loadRecord(rec);
                this.win.show();
            } else {
                Ext.Msg.alert("信息", "请选择要编辑的数据库！");
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
                    // names += recs[i].data.instanceName + "<br />";
                    ids += recs[i].data.id + ",";
                }
                Ext.Msg.confirm("确认", "确认删除选中数据库？", function (btn) {
                    if (btn == "yes") {
                        Ext.Ajax.request({
                            method: 'post',
                            url: '/database/delDatabase',
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
                Ext.Msg.alert("信息", "请选择要删除的数据库！");
            }
        }
    }
}();


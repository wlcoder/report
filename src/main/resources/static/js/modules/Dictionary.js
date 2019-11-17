/*
 * 数据字典
 */
App.Dictionary = function () {
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
                storeId: "dictionaryStore",
                autoLoad: true,
                fields: [
                    {name: "id"},
                    {name: "flag"},
                    {name: "flagName"},
                    {name: "sourceId"},
                    {name: "sourceVal"},
                    {name: "targetId"},
                    {name: "targetVal"}
                ],
                // url: "rescourse/data/dbconfig.json",
                totalProperty: "total",
                root: "rows"
            });
            return store;
        },

        //创建表单
        getForm: function () {
            var flagstore = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({url: '/dictionaryMapping/queryFlag',}),
                reader: new Ext.data.JsonReader({}, [{name: 'flag'}, {name: 'flagName'}]),
                autoLoad: true
            });
            var sourceStore = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({url: '/dictionaryMapping/queryDictionarystore?datasource=Src'}),
                reader: new Ext.data.JsonReader({}, [{name: 'dict'}]),
            });
            var targetStore = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({url: '/dictionaryMapping/queryDictionarystore?datasource=Trgt'}),
                reader: new Ext.data.JsonReader({}, [{name: 'dict'}]),
            });
            var self = this;

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
                    xtype: "combo",
                    id: 'flagcombo',
                    editable: true,
                    emptyText: "--请选择字典标识--",
                    mode: 'local',
                    store: flagstore,
                    triggerAction: 'all',
                    valueField: 'flag',
                    displayField: 'flagName',
                    fieldLabel: "字典标识",
                    name: "flag",
                    allowBlank: false,
                    listeners: {
                        'select': function (combo, record, index) {
                            sourceStore.baseParams.flag = record.data.flag;
                            Ext.getCmp('sourceCombo').setValue('');
                            sourceStore.removeAll();
                            sourceStore.load();
                            targetStore.baseParams.flag = record.data.flag;
                            Ext.getCmp('targetCombo').setValue('');
                            targetStore.removeAll();
                            targetStore.load();
                        }
                    }
                }, {
                    xtype: "combo",
                    id: 'sourceCombo',
                    editable: true,
                    emptyText: "--请选择源字典--",
                    mode: 'local',
                    name: "source",
                    fieldLabel: "源字典",
                    store: sourceStore,
                    triggerAction: 'all',
                    valueField: 'dict',
                    displayField: 'dict',
                    allowBlank: false
                }, {
                    xtype: "combo",
                    id: 'targetCombo',
                    editable: true,
                    emptyText: "--请选择目标字典--",
                    mode: 'local',
                    name: "target",
                    fieldLabel: "目标字典",
                    store: targetStore,
                    triggerAction: 'all',
                    valueField: 'dict',
                    displayField: 'dict',
                    allowBlank: false
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
            var fr = this.form.getForm();
            if (fr.isValid()) {
                var id = fr.findField("id").getValue();
                var obj = fr.getValues();
                obj.flag = fr.findField("flag").getValue();
                var self = this;
                if (id) {//修改
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/dictionaryMapping/updateDictionaryMapping',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            self.search();
                            Ext.Msg.alert("信息", "修改成功！");
                        }, failure: function () {
                            Ext.Msg.alert("错误", "加载数据失败！");
                        }
                    });
                } else {//新增
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/dictionaryMapping/saveDictionaryMapping',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            self.search();
                            Ext.Msg.alert("信息", "新增成功！");
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
                height: 200,
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
                    header: "字典标识",
                    width: 200,
                    sortable: true,
                    dataIndex: "flagName"
                }, {
                    header: "源字典代码",
                    width: 200,
                    sortable: true,
                    dataIndex: "sourceId"
                }, {
                    header: "源字典名称",
                    width: 200,
                    sortable: false,
                    dataIndex: "sourceVal"
                }, {
                    header: "目标字典代码",
                    width: 200,
                    sortable: true,
                    dataIndex: "targetId"
                }, {
                    header: "目标字典名称",
                    width: 200,
                    sortable: false,
                    dataIndex: "targetVal"
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
                url: '/dictionaryMapping/queryDictionaryMapping',
                jsonData: '',
                success: function (response) {
                    /*Ext.Msg.alert("响应内容", response.responseText, setTimeout(function () {
                        Ext.Msg.hide();
                    }, 3000));*/
                    var dictionaryRecord = Ext.data.Record.create([
                        {name: "id"},
                        {name: "flag"},
                        {name: "flagName"},
                        {name: "sourceId"},
                        {name: "sourceVal"},
                        {name: "targetId"},
                        {name: "targetVal"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new dictionaryRecord(obj[i], obj[i].id);
                        self.store.add(rec);
                    }
                }
            });
        },

        //新增
        add: function () {
            this.win.setTitle("新增字典映射");
            Ext.apply(this.currentFormValues, {
                id: "",
                flag: "",
                flagName: "",
                source: "",
                target: ""
            });
            this.win.show();
        },

        //编辑
        edit: function () {
            if (this.grid.getSelectionModel().hasSelection()) {
                this.win.setTitle("修改字典映射");
                var rec = this.grid.getSelectionModel().getSelected();
                Ext.apply(this.currentFormValues, {
                    id: rec.data.id,
                    flag: rec.data.flag,
                    source: rec.data.sourceId + '-' + rec.data.sourceVal,
                    target: rec.data.targetId + '-' + rec.data.targetVal
                });
                this.win.show();
            } else {
                Ext.Msg.alert("信息", "请选择要编辑的数据字典！");
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
                Ext.Msg.confirm("确认", "确认删除选中的字典映射？", function (btn) {
                    if (btn == "yes") {
                        //st.reload();
                        Ext.Ajax.request({
                            method: 'post',
                            url: '/dictionaryMapping/delDictionaryMapping',
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
                Ext.Msg.alert("信息", "请选择要删除的字典映射！");
            }
        }
    }
}();


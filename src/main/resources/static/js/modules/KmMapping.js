/*
 * 科目映射
 */
App.KmMapping = function () {
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
                storeId: "kmStore",
                autoLoad: true,
                fields: [
                    {name: "id"},
                    {name: "srcParentCode"},
                    {name: "srcCourseCode"},
                    {name: "srcCourseCodeName"},
                    {name: "targetParentCode"},
                    {name: "targetCourseCode"},
                    {name: "targetCourseCodeName"},
                    {name: "srcParentCodeName"},
                    {name: "targetParentCodeName"},
                    {name: "targetCourseAccountCode"},
                    {name: "targetCourseAccountCodeName"}
                ],
                totalProperty: "total",
                root: "rows"
            });
            //store.load();
            return store;
        },
        //创建表单
        getForm: function () {
            var sourceStore = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({url: '/kmMapping/queryCourseCode'}),
                reader: new Ext.data.JsonReader({}, [{name: 'source'}]),
                autoLoad: true
            });
            var targetStore = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({url: '/kmMapping/queryKm'}),
                reader: new Ext.data.JsonReader({}, [{name: 'target'}]),
                autoLoad: true
            });
            var accountStore = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({url: '/kmMapping/queryAccount'}),
                reader: new Ext.data.JsonReader({}, [{name: 'account'}]),
                autoLoad: true
            });
            var self = this;

            var form = new Ext.form.FormPanel({
                labelWidth: 90,
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
                    id: 'source',
                    editable: true,
                    emptyText: "--请选择源科目--",
                    mode: 'local',
                    store: sourceStore,
                    triggerAction: 'all',
                    valueField: 'source',
                    displayField: 'source',
                    fieldLabel: "科目(源)",
                    name: "source",
                    allowBlank: false,
                    listeners: {}
                }, {
                    xtype: "combo",
                    id: 'targetUp',
                    editable: true,
                    emptyText: "--请选择目标上级科目--",
                    mode: 'local',
                    name: "targetParent",
                    fieldLabel: "上级科目(目标)",
                    store: targetStore,
                    triggerAction: 'all',
                    valueField: 'target',
                    displayField: 'target',
                    allowBlank: false
                }, {
                    xtype: "combo",
                    id: 'target',
                    editable: true,
                    emptyText: "--请选择目标科目--",
                    mode: 'local',
                    name: "target",
                    fieldLabel: "科目(目标)",
                    store: targetStore,
                    triggerAction: 'all',
                    valueField: 'target',
                    displayField: 'target',
                    allowBlank: false
                }, {
                    xtype: "combo",
                    id: 'sourceUp',
                    editable: true,
                    emptyText: "--请选择账户--",
                    mode: 'local',
                    name: "sourceParent",
                    fieldLabel: "账户",
                    store: accountStore,
                    triggerAction: 'all',
                    valueField: 'account',
                    displayField: 'account',
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
                var self = this;
                if (id) {//修改
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/kmMapping/updateKmMapping',
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
                        url: '/kmMapping/saveKmMapping',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            self.search('add');
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
                width: 500,
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
                    header: "科目代码(源)",
                    width: 200,
                    sortable: true,
                    dataIndex: "srcCourseCode"
                }, {
                    header: "科目名称(源)",
                    width: 200,
                    sortable: true,
                    dataIndex: "srcCourseCodeName"
                }, {
                    header: "上级科目代码(目标)",
                    width: 200,
                    sortable: false,
                    dataIndex: "targetParentCode"
                }, {
                    header: "上级科目名称(目标)",
                    width: 200,
                    sortable: false,
                    dataIndex: "targetParentCodeName"
                }, {
                    header: "科目代码(目标)",
                    width: 200,
                    sortable: false,
                    dataIndex: "targetCourseCode"
                }, {
                    header: "目标科目名称(目标)",
                    width: 200,
                    sortable: false,
                    dataIndex: "targetCourseCodeName"
                }, {
                    header: "账户代码",
                    width: 200,
                    sortable: false,
                    dataIndex: "targetCourseAccountCode"
                }, {
                    header: "账户名称",
                    width: 200,
                    sortable: true,
                    dataIndex: "targetCourseAccountCodeName"
                }],
                border: false,
                viewConfig: {
                    forceFit: true
                },
            });
            panel.add(this.grid);
        },

        //查询
        search: function (flag) {
            var self = this;
            self.store.clearData();
            if (flag != 'add') {
                flag = 'query';
            }
            debugger;
            Ext.Ajax.request({
                method: 'post',
                // dataType: 'json',
                // headers: {'Content-Type': 'application/json'},
                url: '/kmMapping/queryKmMapping',
                // jsonData: '',
                params: 'flag=' + flag,
                success: function (response) {
                    var kmRecord = Ext.data.Record.create([
                        {name: "id"},
                        {name: "srcParentCode"},
                        {name: "srcCourseCode"},
                        {name: "srcCourseCodeName"},
                        {name: "targetParentCode"},
                        {name: "targetCourseCode"},
                        {name: "targetCourseCodeName"},
                        {name: "srcParentCodeName"},
                        {name: "targetParentCodeName"},
                        {name: "targetCourseAccountCode"},
                        {name: "targetCourseAccountCodeName"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new kmRecord(obj[i], obj[i].id);
                        self.store.add(rec);
                    }
                }
            });
        },

        //新增
        add: function () {
            this.win.setTitle("新增科目映射");
            Ext.apply(this.currentFormValues, {
                id: "",
                source: "",
                sourceUp: "",
                target: "",
                targetUp: ""
            });
            this.win.show();
        },

        //编辑
        edit: function () {
            debugger;
            if (this.grid.getSelectionModel().hasSelection()) {
                this.win.setTitle("修改科目映射");
                var rec = this.grid.getSelectionModel().getSelected();
                Ext.apply(this.currentFormValues, {
                    id: rec.data.id,
                    source: rec.data.srcCourseCode + '--' + rec.data.srcCourseCodeName,
                    sourceUp: rec.data.targetCourseAccountCode + '--' + rec.data.targetCourseAccountCodeName,
                    target: rec.data.targetCourseCode + '--' + rec.data.targetCourseCodeName,
                    targetUp: rec.data.targetParentCode + '--' + rec.data.targetParentCodeName
                });
                this.win.show();
            } else {
                Ext.Msg.alert("信息", "请选择要修改的科目映射！");
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
                Ext.Msg.confirm("确认", "确认删除选中的科目映射？", function (btn) {
                    if (btn == "yes") {
                        Ext.Ajax.request({
                            method: 'post',
                            url: '/kmMapping/delKmMapping',
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
                Ext.Msg.alert("信息", "请选择要删除的科目映射！");
            }
        }
    }
}();

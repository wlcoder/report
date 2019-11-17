/*
 * 导出路径配置
 */

App.ExportPath = function () {
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
                storeId: "",
                autoLoad: true,
                fields: [
                    {name: "id"},
                    {name: "url"}
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
            function browseFolder() {
                try {
                    var Message = '请选择文件夹'; // 选择框提示信息
                    var Shell = new ActiveXObject('Shell.Application');
                    var Folder = Shell.BrowseForFolder(0, Message, 0x0040, 0x11);
                    if (Folder != null) {
                        Folder = Folder.items(); // 返回 FolderItems 对象
                        Folder = Folder.item(); // 返回 Folderitem 对象
                        Folder = Folder.Path; // 返回路径
                        if (Folder.charAt(Folder.length - 1) != '\\') {
                            Folder = Folder + '\\';
                        }
                        document.all.path.value = Folder;
                        // this.text = Folder;
                        return Folder;
                    }
                } catch (e) {
                    alert(e.message);
                }
            };
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
                fileUpload: true,
                items: [{
                    xtype: "hidden",
                    name: "id",
                    value: ""
                }, {
                    xtype: "textfield",
                    name: "path",
                    fieldLabel: "导出路径",
                    //      inputType: 'file',
                    allowBlank: false
                }, {
                    xtype: "button",
                    text: "选择",
                    style: {
                        display: 'block',
                        width: '150px',
                        hight: '50px',
                        position: 'absolute',
                        top: '10px',
                        right: '-310px',
                        marginBottom: '10px'
                    },
                    listeners: {
                        'click': function () {
                            browseFolder();
                        }
                    }
                }
                ],
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
            var self = this;
            if (fr.isValid()) {
                var id = fr.findField("id").getValue();
                var obj = fr.getValues();
                var self = this;
                if (id) {//修改
                    Ext.Ajax.request({
                        method: 'post',
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json'},
                        url: '/exportPath/updatePath',
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
                        url: '/exportPath/savePath',
                        jsonData: JSON.stringify(obj),
                        success: function (response) {
                            self.search();
                            Ext.Msg.alert("信息", response.responseText);
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
                height: 130,
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
                    dataIndex: "id"
                }, {
                    header: "导出路径",
                    width: 300,
                    sortable: false,
                    dataIndex: "path"
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
                url: '/exportPath/queryPath',
                jsonData: '',
                success: function (response) {
                    var pathRecord = Ext.data.Record.create([
                        {name: "id"},
                        {name: "path"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj ==null || obj == ""){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    // for (var i = 0; i < obj.length; i++) {
                    var rec = new pathRecord(obj, obj.id);
                    self.store.add(rec);
                    // }
                }
            });
        },

        //新增
        add: function () {
            this.win.setTitle("新增导出路径");
            Ext.apply(this.currentFormValues, {
                id: "",
                path: ""
            });
            this.win.show();
        },

        //编辑
        edit: function () {
            if (this.grid.getSelectionModel().hasSelection()) {
                this.win.setTitle("编辑导出路径");
                var rec = this.grid.getSelectionModel().getSelected();
                Ext.apply(this.currentFormValues, {
                    id: rec.data.id,
                    path: rec.data.path
                });
//				this.form.getForm().loadRecord(rec);
                this.win.show();
            } else {
                Ext.Msg.alert("信息", "请选择要编辑的导出路径！");
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
                    //names += recs[i].data.path + "<br />";
                    ids += recs[i].data.id + ",";
                }
                Ext.Msg.confirm("确认", "确认删除选中的导出路径？", function (btn) {
                    if (btn == "yes") {
                        //st.reload();
                        Ext.Ajax.request({
                            method: 'post',
                            url: '/exportPath/delPath',
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
                Ext.Msg.alert("信息", "请选择要删除的导出路径！");
            }
        }
    }
}();


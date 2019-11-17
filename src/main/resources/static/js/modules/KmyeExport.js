/*
 * 科目余额余额余额表
 */
App.KmyeExport = function () {
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
                storeId: "kmyeStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "acctingPeroid"}, {name: "ptfId"}, {name: "coaId"}, {name: "ccyCd"}, {name: "initBalOccy"},
                    {name: "currTermDbOccurncOccy"}, {name: "currTermCrOccurncOccy"}, {name: "aggrDbOccurncOccy"}, {name: "aggrCrOccurncOccy"}, {name: "teminalBalOccy"}, {name: "initQty"},
                    {name: "curTermDbOccurQty"}, {name: "curTermCrOccurQty"}, {name: "aggrDbOccurQty"}, {name: "aggrCrOccurQty"}, {name: "teminalQty"}, {name: "initBalDccy"},
                    {name: "curTermDbOccurncDccy"}, {name: "curTermCrOccurncDccy"}, {name: "aggrDbOccurncDccy"}, {name: "aggrCrOccurncDccy"}, {name: "teminalBalDccy"}, {name: "assistAcctingCd"}
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
                    /* {
                         text: "日期："
                     }, {
                         id: 'kmyedate',
                         xtype: 'datefield',
                         name: 'billDt',
                         format: 'Y-m-d',
                         value: new Date()
                     },*/
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
                        /*style: {
                            position: 'absolute',
                            top: '4px',
                            right: '150px',
                        },*/
                    }, {
                        text: "删除",
                        iconCls: "x-btn-del",
                        scope: this,
                        handler: this.del,
                        /* style: {
                             position: 'absolute',
                             top: '4px',
                             right: '100px',
                         }*/
                    }, {
                        text: "导出",
                        iconCls: "x-btn-download",
                        scope: this,
                        handler: this.export,
                        /* style: {
                             position: 'absolute',
                             top: '4px',
                             right: '50px',
                         }*/
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
                    header: "会计期间",
                    width: 200,
                    sortable: true,
                    dataIndex: "acctingPeroid",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'acctingPeroid'
                    }
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
                    header: "科目余额编号",
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
                }, {
                    header: "期初余额原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "initBalOccy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'initBalOccy'
                    }
                }, {
                    header: "本期借方发生额原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "currTermDbOccurncOccy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'currTermDbOccurncOccy'
                    }
                }, {
                    header: "本期贷方发生额原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "currTermCrOccurncOccy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'currTermCrOccurncOccy'
                    }
                }, {
                    header: "累计借方发生额原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "aggrDbOccurncOccy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'aggrDbOccurncOccy'
                    }
                }, {
                    header: "累计贷方发生额原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "aggrCrOccurncOccy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'aggrCrOccurncOccy'
                    }
                }, {
                    header: "期末余额原币",
                    width: 120,
                    sortable: false,
                    dataIndex: "teminalBalOccy",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'teminalBalOccy'
                    }
                }, {
                    header: "期初数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "initQty",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'initQty'
                    }
                }, {
                    header: "本期借方发生数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "currTermDbOccurQty",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'currTermDbOccurQty'
                    }
                }, {
                    header: "本期贷方发生额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "currTermCrOccurncDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'currTermCrOccurncDccy'
                    }
                }, {
                    header: "累计借方发生额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "aggrDbOccurncDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'aggrDbOccurncDccy'
                    }
                }, {
                    header: "累计贷方发生额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "aggrCrOccurncDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'aggrCrOccurncDccy'
                    }
                }, {
                    header: "期末数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "teminalQty",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'teminalQty'
                    }
                }, {
                    header: "期初余额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "initBalDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'initBalDccy'
                    }
                }, {
                    header: "本期借方发生额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "currTermDbOccurncDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'currTermDbOccurncDccy'
                    }
                }, {
                    header: "本期贷方发生额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "currTermCrOccurncDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'currTermCrOccurncDccy'
                    }
                }, {
                    header: "累计借方发生额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "aggrDbOccurncDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'aggrDbOccurncDccy'
                    }
                }, {
                    header: "累计贷方发生额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "aggrCrOccurncDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'aggrCrOccurncDccy'
                    }
                }, {
                    header: "期末余额本币",
                    width: 120,
                    sortable: false,
                    dataIndex: "teminalBalDccy",
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: 'teminalBalDccy'
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
            var ptfId = {ptfId: 'Z00295'};
            var pd = {fileType: 'T04_COA_GL_BAL', courseBalance: ptfId};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var gzRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "acctingPeroid"}, {name: "ptfId"}, {name: "coaId"}, {name: "ccyCd"}, {name: "initBalOccy"},
                        {name: "currTermDbOccurncOccy"}, {name: "currTermCrOccurncOccy"}, {name: "aggrDbOccurncOccy"}, {name: "aggrCrOccurncOccy"}, {name: "teminalBalOccy"}, {name: "initQty"},
                        {name: "curTermDbOccurQty"}, {name: "curTermCrOccurQty"}, {name: "aggrDbOccurQty"}, {name: "aggrCrOccurQty"}, {name: "teminalQty"}, {name: "initBalDccy"},
                        {name: "curTermDbOccurncDccy"}, {name: "curTermCrOccurncDccy"}, {name: "aggrDbOccurncDccy"}, {name: "aggrCrOccurncDccy"}, {name: "teminalBalDccy"}, {name: "assistAcctingCd"}
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
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'T04_COA_GL_BAL', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'T04_COA_GL_BAL', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的科目余额信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的科目余额信息！");
            }
        },

        //导出
        export: function () {
            var self = this;
            var ywdate = (new Date()).format('Y-m-d');
            var con = {queryDate: ywdate, fileType: 'T04_COA_GL_BAL'};
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
}();

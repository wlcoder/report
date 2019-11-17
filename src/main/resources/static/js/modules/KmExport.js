/*
 * 科目表
 */
App.KmExport = function () {
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
                    {name: "id"}, {name: "PtfId"}, {name: "coaId"}, {name: "coaName"}, {name: "superCoaId"}, {name: "coaLvl"},
                    {name: "dtlCoaInd"}, {name: "coaCatgCd"}, {name: "coaAttr"}, {name: "coaDirCd"}, {name: "ccyCd"}, {name: "acctingQtyInd"},
                    {name: "sumQtyTfrInd"}, {name: "openDt"}, {name: "closingDt"}, {name: "usableInd"}, {name: "secuCd"}, {name: "exchangeCd"},
                    {name: "bondCd"}, {name: "seatCd"}, {name: "investClassCd"}, {name: "enName"}, {name: "investInd"}, {name: "assistAcctingCd"}
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
                         id: 'kmdate',
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
                        /*  style: {
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
                        /*style: {
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
                    header: "投资组合编号",
                    width: 100,
                    sortable: true,
                    dataIndex: "ptfId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfId'
                    }
                }, {
                    header: "科目编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "coaId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'coaId'
                    }
                }, {
                    header: "科目名称",
                    width: 120,
                    sortable: false,
                    dataIndex: "CoaName",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'coaName'
                    }
                }, {
                    header: "上级科目编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "superCoaId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'superCoaId'
                    }
                }, {
                    header: "科目级别",
                    width: 120,
                    sortable: false,
                    dataIndex: "coaLvl",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'coaLvl'
                    }
                }, {
                    header: "明细科目标志",
                    width: 120,
                    sortable: false,
                    dataIndex: "dtlCoaInd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'dtlCoaInd'
                    }
                }, {
                    header: "科目类别代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "coaCatgCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'coaCatgCd'
                    }
                }, {
                    header: "科目性质",
                    width: 120,
                    sortable: false,
                    dataIndex: "coaAttr",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'coaAttr'
                    }
                }, {
                    header: "开户日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "openDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: "openDt",
                    },
                    renderer: formatDate
                }, {
                    header: "关户日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "closeDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: "closeDt",
                    },
                    renderer: formatDate
                }],
                border: false
            });
            panel.add(this.grid);
        },

        //查询
        search: function () {
            var self = this;
            self.store.clearData();
            var ptfId = {ptfId: 'Z00295'};
            var pd = {fileType: 'T04_COA', courseCodeReport: ptfId};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var kmRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "PtfId"}, {name: "coaId"}, {name: "coaName"}, {name: "superCoaId"}, {name: "coaLvl"},
                        {name: "dtlCoaInd"}, {name: "coaCatgCd"}, {name: "coaAttr"}, {name: "coaDirCd"}, {name: "ccyCd"}, {name: "acctingQtyInd"},
                        {name: "sumQtyTfrInd"}, {name: "openDt"}, {name: "closingDt"}, {name: "usableInd"}, {name: "secuCd"}, {name: "exchangeCd"},
                        {name: "bondCd"}, {name: "seatCd"}, {name: "investClassCd"}, {name: "enName"}, {name: "investInd"}, {name: "assistAcctingCd"}
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

        //编辑
        edit: function () {
            var self = this;
            var m = self.store.getModifiedRecords().slice(0);
            if (null != m && m.length == 0) {
                Ext.Msg.alert("提示", "请检查需要修改的内容");
            } else {
                var editDetails = [];
                Ext.each(m, function (item) {
                    if (typeof (item.data.openDt) === "object") {
                        item.data.openDt = item.data.openDt.format('Y-m-d');
                    }
                    if (typeof (item.data.closeDt) === "object") {
                        item.data.closeDt = item.data.closeDt.format('Y-m-d');
                    }
                    editDetails.push(item.data);
                });
                var pd = {fileType: 'T04_COA', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'T04_COA', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的科目信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的科目信息！");
            }
        },

        //导出
        export: function () {
            debugger;
            var self = this;
            var ywdate = (new Date()).format('Y-m-d');
            var con = {queryDate: ywdate, fileType: 'T04_COA'};
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

/*
 * 投资组合信息
 */
App.TzzhExport = function () {
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
                storeId: "tzzhStore",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "ptfId"}, {name: "ptfShortName"}, {name: "ptfFullName"}, {name: "ptfOid"}, {name: "astCd"},
                    {name: "ccyCd"}, {name: "estabDt"}, {name: "dueDt"}, {name: "lqdtDt"}, {name: "astStatCd"}, {name: "acctingAlgorCd"},
                    {name: "acctingModeCd"}, {name: "taModeCd"}, {name: "inventoryI12nDt"}, {name: "astSrcCd"}, {name: "cstdAcctId"}, {name: "cstdAcctIdOpenBank"},
                    {name: "targetEtfAstCd"}, {name: "closedStartDt"}, {name: "closedEndDt"}, {name: "sumDtlPtfInd"}, {name: "mgrFeeRate"}, {name: "trusteeFeeRate"},
                    {name: "salerFeeRate"}, {name: "seatCommisnFeeRate"}, {name: "accruedFeesDays"}, {name: "initNav"}, {name: "preAllocVal"}, {name: "aggrAllocVal"},
                    {name: "entrusteeName"}, {name: "hdlUserId"}, {name: "chkUsrId"}, {name: "usableInd"}, {name: "enableDt"}, {name: "chkStatCd"},
                    {name: "ptfCatgCd"}, {name: "ptfTypeCd"}, {name: "annuityTypeCd"}, {name: "saleCd"}
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
                         id: 'tzzhdate',
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
                        /*  style: {
                              position: 'absolute',
                              top: '4px',
                              right: '100px',
                          }*/
                    }, {
                        text: "导出",
                        iconCls: "x-btn-download",
                        scope: this,
                        handler: this.export,
                        /*  style: {
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
                    width: 120,
                    sortable: true,
                    dataIndex: "ptfId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfId'
                    }
                }, {
                    header: "组合简称",
                    width: 120,
                    sortable: false,
                    dataIndex: "ptfShortName",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfShortName'
                    }
                }, {
                    header: "组合全称",
                    width: 120,
                    sortable: false,
                    dataIndex: "ptfFullName",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfFullName'
                    }
                }/*, {
                    header: "投资组合原始编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "ptfOid",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfOid'
                    }
                }, {
                    header: "资产代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "astCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'astCd'
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
                    header: "成立日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "estabDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'estabDt'
                    },
                    renderer: formatDate
                }, {
                    header: "到期日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "dueDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'dueDt'
                    },
                    renderer: formatDate
                }, {
                    header: "清算日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "lqdtDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'lqdtDt'
                    },
                    renderer: formatDate
                }, {
                    header: "资产状态代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "astStatCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'astStatCd'
                    }
                }, {
                    header: "核算算法代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "acctingAlgorCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'acctingAlgorCd'
                    }
                }, {
                    header: "核算模式代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "acctingModeCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'acctingModeCd'
                    }
                }, {
                    header: "TA模式代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "taModeCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'taModeCd'
                    }
                }, {
                    header: "库存初始化日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "inventoryI12nDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'inventoryI12nDt'
                    },
                    renderer: formatDate
                }, {
                    header: "资产来源代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "astSrcCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'astSrcCd'
                    }
                }, {
                    header: "托管账号",
                    width: 120,
                    sortable: false,
                    dataIndex: "cstdAcctId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'cstdAcctId'
                    }
                }, {
                    header: "托管账号开户行",
                    width: 120,
                    sortable: false,
                    dataIndex: "cstdAcctIdOpenBank",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'cstdAcctIdOpenBank'
                    }
                }, {
                    header: "目标ETF资产代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "targetEtfAstCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'targetEtfAstCd'
                    }
                }, {
                    header: "封闭起始日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "closedStartDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'closedStartDt'
                    },
                    renderer: formatDate
                }, {
                    header: "封闭结束日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "closedEndDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'closedEndDt'
                    },
                    renderer: formatDate
                }, {
                    header: "汇总明细组合标志",
                    width: 120,
                    sortable: false,
                    dataIndex: "sumDtlPtfInd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'sumDtlPtfInd'
                    }
                }, {
                    header: "管理人费率",
                    width: 120,
                    sortable: false,
                    dataIndex: "mgrFeeRate",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'mgrFeeRate'
                    }
                }, {
                    header: "托管人费率",
                    width: 120,
                    sortable: false,
                    dataIndex: "trusteeFeeRate",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'trusteeFeeRate'
                    }
                }, {
                    header: "销售商费率",
                    width: 120,
                    sortable: false,
                    dataIndex: "salerFeeRate",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'salerFeeRate'
                    }
                }, {
                    header: "席位佣金费率",
                    width: 120,
                    sortable: false,
                    dataIndex: "seatCommisnFeeRate",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'seatCommisnFeeRate'
                    }
                }, {
                    header: "计提两费天数",
                    width: 120,
                    sortable: false,
                    dataIndex: "accruedFeesDays",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'accruedFeesDays'
                    }
                }, {
                    header: "期初净值",
                    width: 120,
                    sortable: false,
                    dataIndex: "initNav",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'initNav'
                    }
                }, {
                    header: "拟分配值",
                    width: 120,
                    sortable: false,
                    dataIndex: "preAllocVal",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'preAllocVal'
                    }
                }, {
                    header: "累计分配值",
                    width: 120,
                    sortable: false,
                    dataIndex: "aggrAllocVal",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'aggrAllocVal'
                    }
                }, {
                    header: "委托人名称",
                    width: 120,
                    sortable: false,
                    dataIndex: "entrusteeName",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'entrusteeName'
                    }
                }, {
                    header: "经办用户编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "hdlUserId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'hdlUserId'
                    }
                }, {
                    header: "审核用户编号",
                    width: 120,
                    sortable: false,
                    dataIndex: "chkUsrId",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'chkUsrId'
                    }
                }, {
                    header: "可用标志",
                    width: 120,
                    sortable: false,
                    dataIndex: "usableInd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'usableInd'
                    }
                }, {
                    header: "启用日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "enableDt",
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        name: 'enableDt'
                    },
                    renderer: formatDate
                }, {
                    header: "审核状态代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "chkStatCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'chkStatCd'
                    }
                }, {
                    header: "组合类别代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "ptfCatgCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfCatgCd'
                    }
                }, {
                    header: "组合类型代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "ptfTypeCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'ptfTypeCd'
                    }
                }, {
                    header: "年金类型代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "annuityTypeCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'annuityTypeCd'
                    }
                }, {
                    header: "销售代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "saleCd",
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false,
                        name: 'saleCd'
                    }
                }*/],
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
            //  var tzzhdate = Ext.getCmp("tzzhdate").getValue().format('Y-m-d');
            // var invest = {estabDt: tzzhdate};
            var ptfId = {ptfId: 'Z00295'};
            var pd = {fileType: 'T02_PTF', investReportVO: ptfId};
            Ext.Ajax.request({
                method: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                url: '/processData/queryProcessData',
                jsonData: JSON.stringify(pd),
                success: function (response) {
                    var t02PtfRecord = Ext.data.Record.create([
                        {name: "id"}, {name: "ptfId"}, {name: "ptfShortName"}, {name: "ptfFullName"}, {name: "ptfOid"}, {name: "astCd"},
                        {name: "ccyCd"}, {name: "estabDt"}, {name: "dueDt"}, {name: "lqdtDt"}, {name: "astStatCd"}, {name: "acctingAlgorCd"},
                        {name: "acctingModeCd"}, {name: "taModeCd"}, {name: "inventoryI12nDt"}, {name: "astSrcCd"}, {name: "cstdAcctId"}, {name: "cstdAcctIdOpenBank"},
                        {name: "targetEtfAstCd"}, {name: "closedStartDt"}, {name: "closedEndDt"}, {name: "sumDtlPtfInd"}, {name: "mgrFeeRate"}, {name: "trusteeFeeRate"},
                        {name: "salerFeeRate"}, {name: "seatCommisnFeeRate"}, {name: "accruedFeesDays"}, {name: "initNav"}, {name: "preAllocVal"}, {name: "aggrAllocVal"},
                        {name: "entrusteeName"}, {name: "hdlUserId"}, {name: "chkUsrId"}, {name: "usableInd"}, {name: "enableDt"}, {name: "chkStatCd"},
                        {name: "ptfCatgCd"}, {name: "ptfTypeCd"}, {name: "annuityTypeCd"}, {name: "saleCd"}
                    ]);
                    var obj = Ext.decode(response.responseText);
                    if(obj.length == 0){
                        Ext.Msg.alert("信息", "查询数据为空！");
                    }
                    for (var i = 0; i < obj.length; i++) {
                        var rec = new t02PtfRecord(obj[i], obj[i].id);
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
                var pd = {fileType: 'T02_PTF', editDetails: JSON.stringify(editDetails)};
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
                var pd = {fileType: 'T02_PTF', ids: ids};
                Ext.Msg.confirm("确认", "确认删除选中的投資組合信息？", function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的投資組合信息！");
            }
        },
        //导出
        export: function () {
            var self = this;
            var ywdate = (new Date()).format('Y-m-d');
            var con = {queryDate: ywdate, fileType: 'T02_PTF'};
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
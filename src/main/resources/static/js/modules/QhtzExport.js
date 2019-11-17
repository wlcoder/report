/*
 * 期货台账信息
 */
App.QhtzExport = function () {
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
                storeId: "",
                autoLoad: true,
                fields: [
                    {name: "id"}, {name: "tzcpdm"}, {name: "tzdate"}, {name: "tzhydm"}, {name: "tzzqdm"},{name: "tzkhbm"}, {name: "tzjymd"},
                    {name: "tzmmbz"}, {name: "tzbzjl"}, {name: "tzrgrg"}, {name: "tzslsl"}, {name: "tzcbcb"},
                    {name: "tzgzgz"}, {name: "tzqqsk"}, {name: "tzfyfy"}, {name: "tzzqsl"}, {name: "tzzqcb"}, {name: "tzzqgz"}, {name: "tzgddm"}
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

            this.grid = new Ext.grid.GridPanel({
                tbar: [
                    {
                        text: "日期："
                    }, {
                        id: 'qhtzdate',
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
             /*   bbar: new Ext.PagingToolbar({
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
                    hidden :true
                }, {
                    header: "投资组合编号",
                    width: 120,
                    sortable: true,
                    dataIndex: "tzcpdm"
                }, {
                    header: "业务日期",
                    width: 120,
                    sortable: false,
                    dataIndex: "tzdate"
                }, {
                    header: "交易会员代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "tzjyhy"
                }, {
                    header: "合约代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "tzzqdm"
                }, {
                    header: "客户编码",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjgrq"
                }, {
                    header: "债券代码",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzzqdm"
                }, {
                    header: "债券类别",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzzqlb"
                }, {
                    header: "利率类型",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzlvlx"
                }, {
                    header: "票面金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzpmje"
                }, {
                    header: "本方资金账户",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzzjzh"
                }, {
                    header: "交易类型",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjylx"
                }, {
                    header: "净价金额",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjjje"
                }, {
                    header: "所含利息",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzshlx"
                }, {
                    header: "成交数量",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzcjsl"
                }, {
                    header: "手续费",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzfsxf"
                }, {
                    header: "结算过户费",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzfghf"
                }, {
                    header: "银行费用",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzfyhf"
                }, {
                    header: "关联交易方",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzglfn"
                }, {
                    header: "经办用户",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzjusr"
                }, {
                    header: "审核用户",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzsusr"
                }, {
                    header: "状态",
                    width: 120,
                    sortable: false,
                    dataIndex: "yzstat"
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
                        {name: "id"}, {name: "tzcpdm"}, {name: "tzdate"}, {name: "tzhydm"}, {name: "tzzqdm"}, {name: "tzmket"},
                        {name: "tzywbz"}, {name: "tzmmbz"}, {name: "tzbdbz"}, {name: "tzrgrg"}, {name: "tzslsl"}, {name: "tzcbcb"},
                        {name: "tzgzgz"}, {name: "tzqqsk"}, {name: "tzfyfy"}, {name: "tzzqsl"}, {name: "tzzqcb"}, {name: "tzzqgz"}, {name: "tzgddm"}
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
            this.win.setTitle("新增期货台账信息");
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
                this.win.setTitle("编辑期货台账信息");
                var rec = this.grid.getSelectionModel().getSelected();
                Ext.apply(this.currentFormValues, {
                    id: rec.data.id,
                    code1: rec.data.code1,
                    code2: rec.data.code2
                });
//				this.form.getForm().loadRecord(rec);
                this.win.show();
            } else {
                Ext.Msg.alert("信息", "请选择要编辑的期货台账信息！");
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
                Ext.Msg.confirm("确认", "确认删除以下期货台账信息？<br />" + names, function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的期货台账信息！");
            }
        }
    }
}();


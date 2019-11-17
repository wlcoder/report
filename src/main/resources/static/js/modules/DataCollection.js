/*
 * 数据采集
 */
App.DataCollection = function () {
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
            return store;
        },

        //创建Grid
        createGrid: function (id) {
            var panel = Ext.getCmp(id);
            panel.body.dom.innerHTML = "";
            var sm = new Ext.grid.CheckboxSelectionModel();

            this.grid = new Ext.grid.GridPanel({
                tbar: [{
                    xtype: '',
                    text: "采集日期："
                }, {
                    id: 'date_time',
                    xtype: 'datefield',
                    name: 'dateTime',
                    format: 'Y-m-d',
                    value: new Date()
                }, "-", {
                    text: "数据采集",
                    iconCls: "x-btn-add",
                    scope: this,
                    handler: this.add
                }, {
                    text: "数据校验",
                    iconCls: "x-btn-edit",
                    scope: this,
                    handler: this.check,
                    style: {
                        position: 'absolute',
                        top: '4px',
                        right: '180px',
                    },
                }, {
                    text: "数据导出",
                    iconCls: "x-btn-download",
                    scope: this,
                    handler: this.export,
                    style: {
                        position: 'absolute',
                        top: '4px',
                        right: '80px',
                    },
                }],

                store: this.store,
                sm: sm,
                columns: [{
                    header: "数据执行信息",
                    width: 100,
                    dataIndex: "msg",
                    // css:'height:27px; vertical-align:middle; font-size:12;color:red;'

                }],
                border: false,
                viewConfig: {
                    forceFit: true
                },
            });
            panel.add(this.grid);
        },


        //采集
        add: function () {
            var self = this;
            self.store.clearData();
            var dateTime = Ext.getCmp('date_time').getValue();
            if (null == dateTime || '' == dateTime || dateTime == undefined) {
                Ext.Msg.alert("提示", "请设置采集日期！");
            } else {
                var ywdate = dateTime.format("Y-m-d");
                Ext.MessageBox.wait('正在采集','请稍后...');
                Ext.Ajax.request({
                    method: 'post',
                    url: '/queryData/datapull',
                    params: 'ywdate=' + ywdate,
                    timeout: 5 * 60 * 1000,
                    success: function (response) {
                        Ext.MessageBox.hide();
                        //  Ext.Msg.alert("提示", "数据采集成功！" + response.responseText);
                        var dcRecord = Ext.data.Record.create([
                            {name: "msg"}
                        ]);
                        var obj = Ext.decode(response.responseText);
                        for (var i = 0; i < obj.length; i++) {
                            var rec = new dcRecord(obj[i]);
                            self.store.add(rec);
                        }
                        //设置grid 单元格样式
                        var view = self.grid.getView();
                        var rows = view.getRows();//获取所有的行
                        for (var i = 0; i < rows.length; i++) {
                            var cls = Ext.get(rows[i]);//获取ext中外层div对象
                            cls.removeClass("x-grid3-row");//去掉原来的样式
                            cls.addClass("my-x-grid3-row");//加上自己的样式
                        }
                    }, failure: function (data) {
                        Ext.MessageBox.hide();
                        var obj = Ext.decode(data.responseText);
                        for (var i = 0; i < obj.length; i++) {
                            var rec = new dcRecord(obj[i]);
                            self.store.add(rec);
                        }
                        Ext.Msg.alert("错误", "加载数据失败！");
                    }
                });
            }
        },

        //导出
        export: function () {
            var self = this;
            self.store.clearData();
            var dateTime = Ext.getCmp('date_time').getValue();
            if (null == dateTime || '' == dateTime || dateTime == undefined) {
                Ext.Msg.alert("提示", "请设置采集日期！");
            } else {
                var ywdate = dateTime.format("Y-m-d");
                var con = {queryDate: ywdate};
                Ext.MessageBox.wait('正在导出','请稍后...');
                Ext.Ajax.request({
                    method: 'post',
                    dataType: 'json',
                    headers: {'Content-Type': 'application/json'},
                    url: '/queryData/makeReport',
                    timeout: 3 * 60 * 1000,
                    jsonData: JSON.stringify(con),
                    success: function (response) {
                        Ext.MessageBox.hide();
                        // Ext.Msg.alert("提示", "数据导出成功！");
                        var dcRecord = Ext.data.Record.create([
                            {name: "msg"}
                        ]);
                        var obj = Ext.decode(response.responseText);
                        for (var i = 0; i < obj.length; i++) {
                            var rec = new dcRecord(obj[i]);
                            self.store.add(rec);
                        }
                        //设置grid 单元格样式
                        var view = self.grid.getView();
                        var rows = view.getRows();//获取所有的行
                        for (var i = 0; i < rows.length; i++) {
                            var cls = Ext.get(rows[i]);//获取ext中外层div对象
                            cls.removeClass("x-grid3-row");//去掉原来的样式
                            cls.addClass("my-x-grid3-row");//加上自己的样式
                        }
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
                var names = "";
                var ids = "";
                for (var i = 0; i < recs.length; i++) {
                    names += recs[i].data.code1 + "<br />";
                    ids += recs[i].data.id + ",";
                }
                Ext.Msg.confirm("确认", "确认删除以下数据库？<br />" + names, function (btn) {
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
                Ext.Msg.alert("信息", "请选择要删除的数据库！");
            }
        }
    }
}();


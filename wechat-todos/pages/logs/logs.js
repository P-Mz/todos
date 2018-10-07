// pages/log/log.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logs: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        // 获取本地存储
        let Storagelogs = wx.getStorageSync('LOGS');
        let logs = [];
        if (Storagelogs) {
            logs = JSON.parse(Storagelogs).reverse();
            this.setData({ logs });
        }
    }
})
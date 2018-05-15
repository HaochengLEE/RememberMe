/*
* @Author: lihaocheng
* @Date:   2018-04-30 10:38:43
* @Last Modified by:   lihaocheng
* @Last Modified time: 2018-05-12 21:59:24
*/
'use strict';

require('./index.css');
require('page/common/nav-side/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        productId : _mm.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId, 自动跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
    // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情的数据
    // loadDetail : function(){
    //     var _this       = this,
    //         html        = '',
    //         $pageWrap   = $('#page-wrap');
    //     // loading
    //     $pageWrap.html('<div class="loading"></div>');
    //     // 请求detail信息
    //     _product.getProductDetail(this.data.productId, function(res){
    //         _this.filter(res);
    //     // 缓存住detail的数据
    //         _this.data.detailInfo = res;
    //     // render
    //         html = _mm.renderHtml(templateIndex, res);
    //         $pageWrap.html(html);
    //      }, function(errMsg){
    //         $pageWrap.html('<p class="err-tip">找不到该课程</p>');
    //     });
    // },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};

$(document).ready(function(){
    $("#after").click(function(){
        
        alert("上一个");


    });
    $("#next").click(function(){
         alert("下一个");
    });

});
$(function(){
    page.init();
})
<template>
    <div class="bottom">
        <div class="content">
            <div class="left">
                备案号：xxxxxxxxxxx 电话挂号：xxx-xxxxxx
            </div>
            <div class="right">
                <span>联系我</span>
                <span>合作伙伴</span>
                <span>用户协议</span>
                <span>隐私协议</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.bottom{
    width: 100%;
    height: 50px;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    .content{
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        align-items: center;
        .right{
            span{
                margin: 0 5px;
            }
        }
    }
}

</style>
<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul>
                <li class="active">全部</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li>昌平区</li>
                <li v-for="i in 10" :key="i">昌平区</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts" name="Region">

</script>

<style scoped lang="scss">
.region {
    color: #7f7f7f;
    margin-top: 10px;

    .content {
        display: flex;

        .left {
            margin-right: 10px;
            width: 65px;
        }

        ul {
            display: flex;
            flex-wrap: wrap;
            white-space: nowrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                cursor: pointer;
                &.active{
                    color: #55a6fe;
                }
            }
            li:hover{
                color: #55a6fe;
            }
        }
    }
}
</style>
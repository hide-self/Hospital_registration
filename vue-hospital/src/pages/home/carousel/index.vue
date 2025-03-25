<template>
    <el-carousel height="350px">
        <el-carousel-item v-for="item in 4" :key="item">
            <img src="" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script setup lang="ts" name="Carousel">

</script>

<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item:nth-child(4n+1) {
    background-image: url('@/assets/images/web-banner-1.png');
    background-size: contain;
}

.el-carousel__item:nth-child(4n+2) {
    background-image: url('@/assets/images/web-banner-1.png');
    background-size: contain;
}

.el-carousel__item:nth-child(4n+3) {
    background-image: url('@/assets/images/web-banner-1.png');
    background-size: contain;
}

.el-carousel__item:nth-child(4n) {
    background-image: url('@/assets/images/web-banner-1.png');
    background-size: contain;
}

</style>
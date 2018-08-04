<template>
  <div class="dashboard-container">
    这是首页，欢迎光临
  </div>
</template>

<script>

export default {
    name: 'dashboard',
    components: {},
    data() {
        return {
            currentRole: 'adminDashboard'
        }
    },
    computed: {
    },
    created() {
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  padding: 15px;
}
</style>


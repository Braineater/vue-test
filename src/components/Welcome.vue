<template>
    <div>
        <h2>Welcome!</h2>
        <h3>You <router-link to="/reddit">can see reddit news here</router-link>.</h3>
    </div>
</template>

<script>
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Welcome extends Vue {

    }
</script>

<style scoped>

</style>
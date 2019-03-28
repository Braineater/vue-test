<template>
    <div class="post">
        <blockquote class="reddit-card"><a :href="'https://www.reddit.com' + post.data.permalink">{{post.data.title}}</a> from <a :href="'https://www.reddit.com/' + post.data.subreddit_name_prefixed">{{post.data.subreddit_name_prefixed}}</a></blockquote>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class RedditPost extends Vue{
        @Prop() private post: object;
    }
</script>

<style scoped>
    .post {
        width: 600px;
        margin-bottom: 16px;
    }
</style>
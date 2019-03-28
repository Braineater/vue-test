<template>
  <div>
    <h1>{{ msg }}</h1>
    <transition name="fade">
      <div v-show="this.visible">
        <div class="posts" v-for="post in posts" >
          <RedditPost :post="post"></RedditPost>
        </div>
      </div>
    </transition>
    <div class="navigation">
      <div class="navbutton" v-if="this.count > 0" v-on:click="GoHome">Home</div>
      <div class="navbutton" v-if="this.count != this.itemsPerPage" v-on:click="PreviousClick">{{this.BackButttonLabel}}</div>
      <div class="navbutton" v-on:click="NextClick">Next {{this.itemsPerPage}} ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from "axios"
import RedditPost from "@/components/reddit-entry/RedditPost.vue";

@Component ({
  components: { RedditPost }
})
export default class Reddit extends Vue {
  @Prop() private msg!: string;
  @Prop({default: 10}) private itemsPerPage!: number;

  visible: boolean = false;
  posts = [];
  before: string;
  after: string;
  count: number = 0;

  constructor() {
    super();
    this.FetchData("", 0);
  }

  FetchData(requestParams: string = "", delay: number = 1000): void {
    this.visible = false;
    let context = this;
    if (delay > 0) {
      setTimeout(function(){
        context.FetchDataDeferred(requestParams);
      }, delay);
    } else {
      this.FetchDataDeferred(requestParams);
    }
  }

  FetchDataDeferred(data: string = ""): void {
    this.posts = [];
    let uri = 'https://www.reddit.com/new.json' + data + ((data === '') ? '?' : '&') + 'limit=' + this.itemsPerPage;
    axios
            .get(uri)
            .then(response => (this.OnDataReceived(response.data)))
            .catch(error => console.log(error))
  }

  OnDataReceived(data: any) {
    this.before = data.data.before;
    this.after = data.data.after;
    this.posts = this.posts.concat(data.data.children);

    let context = this;
    setTimeout(function(){
      context.visible = true;
    }, 1000);
  }

  GoHome() {
    this.count = 0;

    history.pushState({"before": this.before, "count": this.count}, "Home", "?home");

    this.FetchData("");
  }

  PreviousClick() {
    let data:string = "";
    this.count -= this.itemsPerPage;
    if (this.count < 0)
      this.count = 0;

    if (this.before != null && this.count > 0)
      data = "?before=" + this.before + "&count=" + this.count;

    history.pushState({"before": this.before, "count": this.count},
            "Page " + (this.count / this.itemsPerPage), data === "" ? data : "?home");

    this.FetchData(data);
  }

  NextClick() {
    this.count += this.itemsPerPage;
    let data = "?after=" + this.after + "&count=" + this.count;

    history.pushState({"after": this.after, "count": this.count},
            "Page " + (this.count / this.itemsPerPage), data);

    this.FetchData(data);
  }

  get BackButttonLabel(): string {
    if (this.count > this.itemsPerPage)
      return "< Previous " + this.itemsPerPage;

    return "Refresh";
  }
}
</script>

<style scoped>
  .posts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .navigation {
    display: flex;
    height: 3rem;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .navbutton {
    width: 150px;
    height: 3rem;
    background-color: aliceblue;
    border-radius: 0.5rem;
    margin: 0 10px;
    text-align: center;
    vertical-align: center;
    line-height: 3rem;
    cursor: pointer;
  }

  h3 {
    margin: 40px 0 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

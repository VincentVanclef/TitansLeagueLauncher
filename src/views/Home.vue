<template>
  <div class="home">
    <div class="home-header">News</div>
    <div class="news" v-if="serverNews">
      <div class="news-section" v-for="news in serverNews" :key="news.id">
        <div class="news-section-title">
          <h5 v-html="news.title"></h5>
          <div class="news-section-author">
            <i class="fa fa-user"></i> {{ news.authorName }}
          </div>
          <div class="news-section-date">{{ GetDate(news.date) }}</div>
        </div>
        <article class="news-section-content" v-html="news.content"></article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NewsApi } from "@/services/api/api.news";
import { INews } from "@/models/news/news.model";
import moment from "moment";

@Component({
  components: {}
})
export default class HomeView extends Vue {
  serverNews: INews[] = [];

  async GetNews() {
    const news = await NewsApi.GetNews();
    this.serverNews = news;
  }

  GetDate(date: Date) {
    return moment(date).format("MMMM Do YYYY, HH:mm:ss");
  }

  created() {
    this.GetNews();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.home {
  @include pageBackground;
}

.home-header {
  display: flex;
  justify-content: center;
  font-size: 1.4em;
  padding-bottom: 10px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.95);
  user-select: none;
}

.news {
  position: relative;
  max-height: calc(#{$maxPageHeight} - 42px);
  overflow: auto;
}

.news-section {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  margin: 1em;
  box-shadow: 0px 0px 3px 0px white;
}

.news-section-title {
  margin-top: 25px;
  box-shadow: 0px 0px 3px 2px black;
  padding: 10px 0px 1px 15px;
}

.news-section-date {
  position: absolute;
  top: 5px;
  right: 15px;
}

.news-section-author {
  position: absolute;
  top: 5px;
  left: 15px;
  text-transform: capitalize;
}

.news-section-content {
  margin-top: 20px;
  box-shadow: 0px 0px 3px 2px black;
  padding: 15px;
}
</style>

<template>
  <div>
    <div class="phone">
      <md-bottom-bar md-sync-route>
        <md-bottom-bar-item
          to="/components/bottom-bar"
          exact
          md-label="Home"
          md-icon="home"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          to="/components/bottom-bar/posts"
          md-label="Posts"
          md-icon="/assets/icon-whatshot.svg"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          to="/components/bottom-bar/favorites"
          md-label="Favorites"
          md-icon="favorite"
        ></md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

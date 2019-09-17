<template>
  <div class="home">
    <h1>Edit Oil field </h1>
    <div>
      <router-link :to="{name: 'home'}">Back</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>

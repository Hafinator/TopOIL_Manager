<template>
  <div class="home">
    <h1>All Oil fields</h1>
    <div>
      <router-link :to="{name: 'create'}">Add</router-link>
      <table class="table">
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>NumOfEmployees</th>
          <th>Production</th>
          <th>NumOfPumpjacks</th>
          <th>Location</th>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{item}}</td>
            <td>{{item}}</td>
            <td>{{item}}</td>
            <td>{{item}}</td>
            <td>{{item}}</td>
            <td>{{item}}</td>
            <router-link class="btn" :to="{name: 'edit', params: {id: id}}">Edit</router-link>
           <button @click="remove(item.id)">Delete</button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';

@Component({
  components: {
  },
})
export default class Index extends Vue {
  items: any[] = [];

  mounted() {

  }

  getItems() {
    Axios.get
  }

  remove(id: number) {
    if (confirm('Do you really wish to delete this item?')) {
      // TODO: DELETE
    }
  }
}
</script>


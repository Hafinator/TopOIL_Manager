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
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.numOfEmployees}}</td>
            <td>{{item.production}}</td>
            <td>{{item.numOfPumpjacks}}</td>
            <td>{{item.location}}</td>
            <router-link class="btn" :to="{name: 'edit', params: {id: item.id}}">Edit</router-link>
            <button style="margin-left: 5px" @click="remove(item.id)">Delete</button>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
// And yes everything here could be done with stores, 
// but id didn't see the point since there's only one type of module and I thought you prioritize speed for your candidate testing...
@Component({
  components: {
  },
})
export default class Index extends Vue {
  items: any[] = [];

  mounted() {
    this.getItems();
  }

  getItems() {
    return Axios.get('http://localhost:5000/api/OilField')
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  remove(id: number) {
    if (confirm('Do you really wish to delete this item?')) {
      return Axios.delete(`http://localhost:5000/api/OilField/${id}`)
        .then((response) => {
          alert('Success!');
          this.getItems();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>


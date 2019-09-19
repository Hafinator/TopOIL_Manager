<template>
  <div class="col-8">
    <h1>All Oil fields</h1>
    <div v-if="items">
      <router-link class="btn btn-primary" :to="{name: 'create'}">Add</router-link>
      <br />
      <div>
        <label for="search">
          <input type="text" v-model="searchQuery" @keyup="refresQuery">
        </label>
        <button @click="getItems(1, searchQuery)">SEARCH</button>
      </div>
      <table class="table" >
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>NumOfEmployees</th>
          <th>Production</th>
          <th>NumOfPumpjacks</th>
          <th>Location</th>
        </thead>
        <tbody>
          <tr v-for="item in items.item1" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.numOfEmployees}}</td>
            <td>{{item.production}}</td>
            <td>{{item.numOfPumpjacks}}</td>
            <td>{{item.location}}</td>
            <router-link class="btn  btn-primary" :to="{name: 'edit', params: {id: item.id}}">Edit</router-link>
            <button style="margin-left: 5px" @click="remove(item.id)">Delete</button>
          </tr>
        </tbody>
      </table>
      <hr />
      <v-pagination  class="btn-group" v-model="items.item3" :page-count="items.item2"></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Axios from 'axios';
import vPagination from 'vue-plain-pagination'
// And yes everything here could be done with stores, 
// but id didn't see the point since there's only one type of module and I thought you prioritize speed for your candidate testing...
@Component({
  components: {
    vPagination
  },
})
export default class Index extends Vue {
  items: any = null;
  watchSkip: boolean = true;
  searchQuery: string | null = null;

  @Watch('items.item3')
    pageChange() { // This is needed because on mounted the Watch will trigger initial call a second time
      if (this.watchSkip) {
        this.watchSkip = false;
      } else {
        this.getItems(this.items.item3, null);
      }
    }
  /**
   * Called at the after the initial render
   */
  mounted() {
    this.getItems(1, null);
  }

 /**
  * Refreshes the query and grabs data on the first page 
  */
  refresQuery() {
    if (this.searchQuery === '') {
      this.searchQuery = null;
      this.getItems(1, null);
    }
  
  }

  /**
   * Generates the query to be appended at the end of the get request
   */
  getRequestQuery(page: number, query: string | null = null) {
    if (query) {
      return `?page=1&search=${query}`;
    } else {
      return`?page=${page}`;
    }
  }

  /**
   * Gets the data list on the specified page and with a specified search query
   */
  getItems(page: number, query: string | null = null) {
    return Axios.get(`http://localhost:5000/api/OilField${this.getRequestQuery(page, query)}`)
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Removes the specified element
   */
  remove(id: number) {
    if (confirm('Do you really wish to delete this item?')) {
      return Axios.delete(`http://localhost:5000/api/OilField/${id}`)
        .then((response) => {
          alert('Success!');
          this.getItems(this.items.item3, null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>


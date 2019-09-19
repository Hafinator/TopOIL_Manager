<template>
  <div class="home">
    <h1>Edit Oil field </h1>
    <div>
      <router-link class="btn btn-primary" :to="{name: 'home'}">Back</router-link>
      <div v-if="newItem">
        <div>
          <label for="name">Name</label>
          <input name="name" id="name" type="text" v-model="newItem.name" />
        </div>
        <div>
          <label for="numOfEmployees">Number of employees</label>
          <input name="numOfEmployees" id="firnumOfEmployeesstname" min="0" max="99999999" type="number" v-model="newItem.numOfEmployees" />
        </div>
        <div>
          <label for="production">Production</label>
          <input name="production" id="production" min="0" max="1999999999" type="number" v-model="newItem.production" />
        </div>
        <div>
          <label for="numOfPumpjacks">Number of pumpjacks</label>
          <input name="numOfPumpjacks" id="numOfPumpjacks" min="0" max="1999999999" type="number" v-model="newItem.numOfPumpjacks" />
        </div>
        <div>
          <label for="location">Location</label>
          <input name="location" id="location" type="text" v-model="newItem.location" />
        </div>
      </div>
      <hr />
      <button @click="saveAndGo">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';

@Component({
  components: {},
})
export default class Home extends Vue {
  newItem: any = null;
  mounted() {
    this.getItem();
  }

  /**
   * Gets the specified item
   */
  getItem() {
    return Axios.get(`http://localhost:5000/api/OilField/${this.$route.params.id}`)
      .then((response) => {
        this.newItem = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  /**
   * Saves the item and pushes us to the index page
   */
  saveAndGo() {
    return Axios.put(`http://localhost:5000/api/OilField/${this.$route.params.id}`, this.newItem)
    .then((response) => {
      alert('Success!');
      this.$router.push({name: 'home'});
    })
    .catch((error) => {
      console.log(error);
    });
  }

}
</script>

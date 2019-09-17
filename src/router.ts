import Create from "./views/Create.vue";
import Edit from "./views/Edit.vue";
import Index from "./views/Index.vue";
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
    },
  ],
});

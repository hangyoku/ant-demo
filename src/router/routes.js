
import  home from '@/pages';
import  fixedTable from '@/pages/fixedTable.vue';
import  distribution from '@/pages/distribution.vue';
import  demo from '@/pages/demo.vue';

export default [
    {
      path: "/index",
      name: "index",
      component: home
    },
    {
      path: "/fixedTable",
      name: "fixedTable",
      component: fixedTable
    },
    {
      path: "/distribution",
      name: "distribution",
      component: distribution
    },
    {
      path: "/demo",
      name: "demo",
      component: demo
    }
  ]

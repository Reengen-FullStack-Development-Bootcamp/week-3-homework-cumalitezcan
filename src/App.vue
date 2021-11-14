<template>
<div class="container">
  <Navbar />
  <hr>
  <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import { mapActions } from 'vuex';

export default {
  name:"App",
  components: {
    Navbar,

  },
   methods:{
    ...mapActions(['getPathMoves']) // vuex path change method
  },

   watch:{
    $route(to,from){
 
      let date = new Date()
      let moves = {
        "date:": `${date}`,
        "to:":`${to.path}`,
        "from:":`${from.path}`
        }
      
      // send path changes to vuex
      this.getPathMoves(moves)
    }
  }
}
</script>
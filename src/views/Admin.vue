<template>
  <v-app>
    <v-container>
      <v-row>
        <v-treeview hoverable color="warning" :items="items"></v-treeview>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
       items: [
        {
          id: 1,
          name: "Log records",
          children: [],
        },
        {
          id: 2,
          name: "Unauthorized logs",
          children: [],
        },
      ],
    }
  },
  mounted(){

      for (let index = 0; index < this.pathMoves.length; index++) {
        if (this.pathMoves[index]['to:'] == "/error") {
          this.items[1].children.push({
            id:index,
            name:`${this.pathMoves[index]['date:'].slice(0,25)}`,
            children:[
              {id:index, name:`to: ${this.pathMoves[index]['to:']}`},
              {id:index, name:`from: ${this.pathMoves[index]['from:']}`}
            ]
            })
        }
      }

      for (let index = 0; index < this.pathMoves.length; index++) {
        if (this.pathMoves[index]['to:'] !== "/error") {
          this.items[0].children.push({
            id:index,
            name:`${this.pathMoves[index]['date:'].slice(0,25)}`,
            children:[
              {id:index, name:`to: ${this.pathMoves[index]['to:']}`},
              {id:index, name:`from: ${this.pathMoves[index]['from:']}`}
            ]
            })
        }
      }
  },
   computed: {
    ...mapState(["pathMoves"]),
    },
};

</script>

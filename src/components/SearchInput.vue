<template>
  <div class="container">
    <div class="row">
      <v-text-field
        label="Enter company name or symbol"
        v-model="searchValue"
        :rules="rules"
        hide-details="auto"
        @keydown.enter="goSend"
      ></v-text-field>
    </div>

    <div v-if="clicked" class="row text-center mt-4">
      <div class="offset-2 col-md-6">
        <select
          v-model="selectedItem"
          class="form-select"
          aria-label="Default select example"
        >
          <option 
            v-for="(company, index) in companyNameAndSymbol"
            :key="index"
            :value="company.symbol"
          >
            <pre>
              <h2>Company Name: </h2>{{ company.name }}
            </pre>
            <pre>
              Symbol Name  {{ company.symbol }}
            </pre>
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <!-- <router-link :to="`/symbol/${selectedItem}/daily`">
          <button class="btn btn-success">Get to chart</button>
        </router-link> -->
         <button @click="goChart" class="btn btn-success">Get to chart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      searchValue: "",
      selectedItem: "",
      clicked: false,
      rules: [
        (searchValue) => !!searchValue || "Required.",
        (searchValue) =>
          (searchValue && searchValue.length >= 3) || "Min 3 characters",
      ],
    };
  },

  methods: {
    ...mapMutations(["SET_SEARCH_RESULT"]),
    ...mapActions(["searchFromValue"]),

    goSend() {
      this.searchFromValue(this.searchValue)
      this.clicked = !this.clicked;
    },

    goChart(){
      console.log("geldi")
       this.$router.push({ path:`/symbol/${this.selectedItem}/daily` })
          
    }
  
  },
  computed: {
    ...mapState(["search"]),
    ...mapGetters(["companyNameAndSymbol"]),
  },
};
</script>

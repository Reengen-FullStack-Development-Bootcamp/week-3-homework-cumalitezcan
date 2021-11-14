import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiURL: "https://alpha-vantage.p.rapidapi.com/query",
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "83b6a8d056msh586464f5c969161p114268jsnd0bb370711c6",
    },
    search: [],
    dailyValues: [],
    weeklyValues: [],
    monthlyValues: [],
    pathMoves:[]

  },

  mutations: {
    SET_SEARCH_RESULT(state, payload) {
      state.search = payload;
    },
    SET_DAILY_RESULTS(state, payload) {
      console.log(payload)
      state.dailyValues = payload;
    },
    SET_WEEKLY_RESULTS(state, payload) {
      state.weeklyValues = payload;
    },
    SET_MONTHLY_RESULTS(state, payload) {
      state.monthlyValues = payload;
    },
    SET_PATH_MOVES(state,payload){
      state.pathMoves.push(payload)
    }
  },

  actions: {
    searchFromValue({ state, commit },payload) {
      return axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: { keywords: payload, function: "SYMBOL_SEARCH" },
        })
        .then((res) => {
         
          commit("SET_SEARCH_RESULT", res.data.bestMatches);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDailyValues({ state, commit }, payload) {
      console.log(payload)
      axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: { symbol: payload, function: "TIME_SERIES_DAILY"},
        })
        .then((res) => {
          console.log(res.data["Time Series (Daily)"])
          commit("SET_DAILY_RESULTS", res.data["Time Series (Daily)"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWeeklyValues({ state, commit }, payload) {
      axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: { symbol: payload, function: "TIME_SERIES_WEEKLY" },
        })
        .then((res) => {
          console.log(res.data["Weekly Time Series"]);
          commit("SET_WEEKLY_RESULTS", res.data["Weekly Time Series"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMonthlyValues({ state, commit }, payload) {
      axios
        .get(`${state.apiURL}`, {
          headers: { ...state.headers },
          params: { symbol: payload, function: "TIME_SERIES_MONTHLY" },
        })
        .then((res) => {
          console.log(res.data["Monthly Time Series"]);
          commit("SET_MONTHLY_RESULTS", res.data["Monthly Time Series"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPathMoves({commit},payload){
      return commit('SET_PATH_MOVES',payload)
    },
  },
  getters: {
    companyNameAndSymbol: (state) => {
      return state.search.map((company) => {
        return {
          symbol: company["1. symbol"],
          name: company["2. name"],
        };
      });
      // return JSON.parse(state.searchResults)
    },


    //33 keys for each time zone
    getDailyResultsKeys(state){
      console.log(state.dailyValues)
      return Object.keys(state.dailyValues).slice(0,33);
    },
    getWeeklyResultsKeys(state){
      return Object.keys(state.weeklyValues).slice(0,33);
    },
    getMonthlyResultsKeys(state){
      return Object.keys(state.monthlyValues).slice(0,33);
    },


     //33 values for each time zone
     getDailyResultsValues(state){
      return Object.values(state.dailyValues).slice(0,33);
    },
     getWeeklyResultsValues(state){
      return Object.values(state.weeklyValues).slice(0,33);
    },
     getMonthlyResultsValues(state){
      return Object.values(state.monthlyValues).slice(0,33);
    },


  },
  modules: {},
});

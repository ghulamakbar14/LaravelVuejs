/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(axios, VueAxios);

Vue.component('todo-component', require('./components/Todo.vue').default);

const app = new Vue({
    el: '#app',
});

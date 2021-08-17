<template>
  <div id="header">
    <h1>Home</h1>
    <SelectLanguage />
    <span>{{ user?.first_name }}</span>
    <LogoutButton />
  </div>
  <div id="content">
    <button @click.prevent="test">REQUEST</button>
    <br>
    <br>
    <button @click.prevent="test2">LOCALES</button>
    <br>
    <br>
    <button @click.prevent="test3">RELOAD</button>
    <br>
    <br>
    <input type="text" v-model="entity.first_name">
    <button @click="add">Add</button>
    <li v-for="entity in entities" :key="entity.id">
      {{ entity.first_name }}
    </li>
  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton'
import SelectLanguage from '@/components/SelectLanguage'
import { mapGetters, mapActions } from 'vuex'
import User from '@/store/models/User'

export default {
  name: 'Home',
  mounted() {
    this.getUser(3)
  },
  data() {
    return {
      entity: {
        first_name: ''
      }
    }
  },
  components: {
    LogoutButton,
    SelectLanguage
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    entities() {
      return User.all();
    }
  },
  methods: {
    ...mapActions({
      'getAllUsers': 'users/getAllUsers',
      'getUser': 'users/getUser',
    }),
    test() {
      window.axios.get('http://localhost:8040/api/test').then(response => {
        console.log(response);
      });
    },
    test2() {
      window.axios.get('http://localhost:8040/api/locales').then(response => {
        console.log(response);
      });
    },
    test3() {
      location.reload();
    },
    add() {
      User.insert({ data: this.entity })
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#content {
  flex-grow: 1;
  text-align: center;
  padding: 20px;
}
</style>

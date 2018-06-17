<template>
  <div class="playlist">
    <button class="btn btn-primary mt-4" @click="toggleAdd" v-if="!showAdd">New Playlist</button>
    <div class="mt-4" v-if="showAdd">
      <form v-on:submit.prevent="addPlaylist">
        <input type="text" style="background: black; color: white; opacity: 0.8;" v-model="list.title">
        <button class="btn btn-primary" type="submit">Add Playlist</button>
      </form>
    </div>
    <div class="row justify-content-center">
      <div class="card col-md-8 songs-box" v-for="playlist in playlists">
        <router-link :to="{ name: 'listDetails', params: { id: playlist._id }}">
          <h3>{{playlist.title}}</h3>
        </router-link>
        <h4>songs: {{playlist.songs.length}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router'
  export default {
    name: 'Playlists',
    mounted() {
      if (!this.$store.state.user) {
        router.push({ name: 'Auth' })
      }
      this.$store.dispatch('getPlaylists')
    },
    data() {
      return {
        showAdd: false,
        list: {
          title: '',
          userId: ''
        }
      }
    },
    computed: {
      playlists() {
        return this.$store.state.playlists
      }
    },
    methods: {
      toggleAdd() {
        this.showAdd = !this.showAdd
      },
      addPlaylist() {
        this.$store.dispatch('createPlaylist', this.list)
        this.showAdd = !this.showAdd
      }
    }
  }

</script>

<style>
  .songs-box {
    margin: 3vh;
    background: #333399;
    color: white;
    border: #14143b solid;
    padding: 2vh;
  }
</style>
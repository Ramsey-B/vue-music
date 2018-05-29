<template>
  <div class="playlist">
    <button @click="toggleAdd" v-if="!showAdd">New Playlist</button>
    <div v-if="showAdd">
      <form v-on:submit.prevent="addPlaylist">
        <input type="text" v-model="list.title">
        <button type="submit">Add Playlist</button>
      </form>
    </div>
    <div v-for="playlist in playlists">
      <router-link :to="{ name: 'listDetails', params: { id: playlist._id }}">
        <h3>{{playlist.title}}</h3>
      </router-link>
      <h4>songs: {{playlist.songs.length}}</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Playlists',
    mounted() {
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
</style>
<template>
  <div class="home">
    <div class="search">
      <form v-on:submit.prevent="search">
        <input type="text" v-model="query">
        <button type="submit">SEARCH</button>
      </form>
    </div>
    <div class="results row">
      <div class="card col-md-3 col-xs-12 song-box" v-for="song in songs">
        <a @click="playSong(song)">
          <h4>{{song.trackName}}</h4>
        </a>
        <h5>{{song.artistName}}</h5>
        <a @click="playSong(song)">
          <img class="play-img" :src="song.artworkUrl100">
        </a>
        <h6>Price: {{song.trackPrice}}</h6>
        <div>
          <a :href="song.trackViewUrl" target="_blank" class="btn btn-outline-success mt-2">Purchase</a>
          <div v-if="user" class="form-group">
            <select name="Playlists" class="form-control" id="" v-model="activeList">
              <option disabled>Select a Playlist</option>
              <option v-for="playlist in playlists" :value="playlist">{{playlist.title}}</option>
            </select>
            <button v-if="activeList" @click="addSong(song)">Add Song</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import howler from 'vue-howler'
  import router from '../router'
  export default {
    name: 'Home',
    mounted() {
      if (!this.$store.state.user._id) {
        router.push({ name: 'Auth' })
      }
      this.$store.dispatch('getPlaylists')
    },
    data() {
      return {
        query: '',
        newList: {
          title: ''
        },
        activeList: {},
        player: null,
        isPlaying: {}
      }
    },
    computed: {
      songs() {
        return this.$store.state.songs
      },
      playlists() {
        return this.$store.state.playlists
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      search() {
        this.$store.dispatch('getSongs', this.query)
      },
      createPlaylist() {
        this.$store.dispatch('createPlaylist', this.newList)
        this.showAdd = !this.showAdd
      },
      addSong(song) {
        var index = this.activeList.songs.findIndex(item => {
          return item.trackId == song.trackId
        })
        if (index == -1) {
          this.activeList.songs.push(song)
          this.$store.dispatch('editList', this.activeList)
        }
      },
      initPlayer(song) {
        this.player = null
        this.player = new Howl({
          src: song.previewUrl,
          autoplay: true,
          volume: 0.5,
          html5: true
        });
      },
      playSong(song) {
        if (this.isPlaying == song) {
          this.player.pause()
          this.isPlaying = {}
        } else if (this.player) {
          this.player.pause()
          this.isPlaying = song
          this.initPlayer(song)
        } else {
          this.isPlaying = song
          this.initPlayer(song)
        }
      }
    }
  }
</script>

<style>
  .song-box {
    background-color: #333399;
    margin: 3vh;
    color: gray;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px #14143b;
  }
</style>
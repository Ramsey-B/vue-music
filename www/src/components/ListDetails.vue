<template>
  <div class="listDetails">
    <h2>{{activeList.title}}</h2>
    <div class="results row" v-if="activeSong">
      <div class="card col-md-4 col-xs-12 songs-box">
        <a @click="togglePlay">
          <h4>{{activeSong.trackName}}</h4>
        </a>
        <h5>{{activeSong.artistName}}</h5>
        <a @click="togglePlay">
          <img class="play-img" :src="activeSong.artworkUrl100">
        </a>
      </div>
    </div>
    <div class="row">
      <draggable v-model="songs">
        <div class="col-12 d-flex justify-content-row" :key="song._id" v-for="song in songs">
          <button @click="playSong(song)" v-if="song._id != activeSong._id">Play</button>
          <button @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == true">Pause</button>
          <button @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == false">Play</button>
          <h4>{{song.trackName}}-{{song.artistName}}</h4>
          <button @click="removeSong(song)">Remove</button>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'listDetails',
    mounted() {
      this.$store.dispatch('getPlaylist', this.$route.params.id)
    },
    components: {
      draggable
    },
    data() {
      return {
        activeSong: {},
        isPlaying: false,
        player: null,
        songsIndex: 0
      }
    },
    computed: {
      activeList() {
        return this.$store.state.activeList
      },
      songs: {
        get: function() {
          return this.$store.state.activeList.songs
        },
        set: function(songs) {
          this.editList(songs)
        }
      }
    },
    methods: {
      initPlayer() {
        this.player = new Howl({
          src: this.songs[this.songsIndex].previewUrl,
          autoplay: true,
          volume: 0.5,
          html5: true,
          onend: function () {
            this.changeSong()
            this.initPlayer()
          }
        });
      },
      playSong(song) {
        if(this.player) {
          this.player.pause()
        }
        this.isPlaying = true
        this.activeSong = song
        this.songsIndex = this.songs.findIndex(item => {return item._id == song._id})
        this.initPlayer()
      },
      editList(songs) {
        this.activeList.songs = songs
        this.$store.dispatch('editList', this.activeList)
      },
      togglePlay() {
        if (this.isPlaying == false) {
          this.isPlaying = !this.isPlaying
          this.player.play()
        } else {
          this.isPlaying = !this.isPlaying
          this.player.pause()
        }
      },
      changeSong() {
        if (this.songsIndex < this.songs.length - 1) {
          this.songsIndex++
          this.activeSong = this.songs[this.songsIndex]
        }
      },
      removeSong(song) {
        var index = this.activeList.songs.findIndex(item => {
          return item.trackId == song.trackId
        })
        this.activeList.songs.splice(index, 1)
        this.songs = this.activeList.songs
        this.$store.dispatch('editList', this.activeList)
      }
    }
  }
</script>

<style>
</style>
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
        <div class="col-12 d-flex justify-content-row text-center" :key="song._id" v-for="song in songs">
          <a @click="playSong(song)" v-if="song._id != activeSong._id"><i class="fas fa-play"></i></a>
          <a @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == true"><i class="fas fa-pause"></i></a>
          <a @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == false"><i class="fas fa-play"></i></a>
          <h4>{{song.trackName}}-{{song.artistName}}</h4>
          <a class="btn remove" @click="removeSong(song)"><i class="fas fa-trash-alt"></i></a>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import router from '../router'
  export default {
    name: 'listDetails',
    mounted() {
      if(!this.$store.state.user){
        router.push({name: 'Auth'})
      }
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
      initPlayer(songs, index, cb) {
        this.player = new Howl({
          src: songs[index].previewUrl,
          autoplay: true,
          volume: 0.5,
          html5: true,
          onend: function () {
            if (index < songs.length - 1) {
                index++
                var song = songs[index]
                cb(song)
              }
            else {
              var song = songs[0]
                cb(song)
            }
          }
        });
      },
      playSong(song) {
        if(this.player) {
          this.player.stop()
        }
        this.isPlaying = true
        this.activeSong = song
        this.songsIndex = this.songs.findIndex(item => {return item._id == song._id})
        this.initPlayer(this.songs, this.songsIndex, this.playSong)
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
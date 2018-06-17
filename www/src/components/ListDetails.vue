<template>
  <div class="listDetails">
    <div class="title">
      <h2 style="color: white;">{{activeList.title}}</h2>
    </div>
    <div class="results row mt-4 d-flex justify-content-center" v-if="activeSong">
      <div class="card col-md-4 col-xs-12 songs-box">
        <a @click="togglePlay">
          <h4>{{activeSong.trackName}}</h4>
        </a>
        <h5>{{activeSong.artistName}}</h5>
        <a @click="togglePlay">
          <div :style="activeSong.artworkUrl100" class="songImg" :id="activeSong._id">
            <img class="playImg" v-if="!isPlaying" src="../assets/play.png">
            <img class="playImg" v-if="isPlaying" src="../assets/pause.png">
          </div>
        </a>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-4">
      <draggable v-model="songs">
        <div class="col-12 d-flex justify-content-row justify-content-center songs-box" :key="song._id" v-for="song in songs">
          <a class="play" @click="playSong(song)" v-if="song._id != activeSong._id">
            <i class="fas fa-play"></i>
          </a>
          <a class="play" @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == true">
            <i class="fas fa-pause"></i>
          </a>
          <a class="play" @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == false">
            <i class="fas fa-play"></i>
          </a>
          <a @click="playSong(song)" v-if="song._id != activeSong._id">
            <h4 class="songs">{{song.trackName}} - {{song.artistName}}</h4>
          </a>
          <a @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == true">
            <h4 class="songs">{{song.trackName}} - {{song.artistName}}</h4>
          </a>
          <a @click="togglePlay" v-if="song._id == activeSong._id && isPlaying == false">
            <h4 class="songs">{{song.trackName}} - {{song.artistName}}</h4>
          </a>
          <a class="btn remove play" @click="removeSong(song)">
            <i class="fas fa-trash-alt"></i>
          </a>
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
      if (!this.$store.state.user._id) {
        router.push({ name: 'Auth' })
      }
      this.$store.dispatch('getPlaylist', this.$route.params.id)
      this.player = null;
      this.isPlaying = {};
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
        get: function () {
          this.activeSong = this.$store.state.activeList.songs[0]
          return this.$store.state.activeList.songs
        },
        set: function (songs) {
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
        if (this.player) {
          this.player.stop()
        }
        this.isPlaying = true
        this.activeSong = song
        this.songsIndex = this.songs.findIndex(item => { return item._id == song._id })
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
  .songs {
    margin: 0 2vh;
  }

  .songs-box {
    background-color: #333399;
    margin: 3vh;
    color: white;
    border: 1px solid;
    padding: 10px;
    box-shadow: 5px 10px #14143b;
  }

  .title {
    background-color: black;
    opacity: 0.8;
    display: inline-block;
    padding: 1vh 10vh;
    margin-top: 5vh;
  }

  .songImg {
    height: 25vh;
    width: 25vh;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: auto;
  }

  .playImg {
    width: 100%;
    margin: auto;
    opacity: 0.4;
  }

  .songImg:hover .playImg {
    opacity: 0.9;
  }
</style>
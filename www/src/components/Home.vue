<template>
  <div class="home">
    <div class="search mt-2">
      <form v-on:submit.prevent="search">
        <input type="text" style="background: black; color: white; opacity: 0.8;" v-model="query">
        <button type="submit" class="btn btn-primary">SEARCH</button>
      </form>
    </div>
    <div class="results row d-flex justify-content-center">
      <div class="card col-md-3 col-xs-12 songs-box" v-for="song in songs">
        <a @click="playSong(song)">
          <h4>{{song.trackName}}</h4>
        </a>
        <h5>{{song.artistName}}</h5>
        <a @click="playSong(song)">
          <div :style="song.artworkUrl100" class="songImg" :id="song._id">
            <img class="playImg" v-if="song.trackId != isPlaying.trackId" src="../assets/play.png">
            <img class="playImg" v-if="song.trackId == isPlaying.trackId" src="../assets/pause.png" >
          </div>
        </a>
        <h6 class="mt-2">Price: {{song.trackPrice}}</h6>
        <div>
          <a :href="song.trackViewUrl" target="_blank" class="btn btn-outline-success mt-2">Purchase</a>
          <div v-if="user" class="form-group">
            <div class="popup">
              <span class="popuptext" :id="song.trackId">{{alert}}</span>
            </div>
            <div class="d-flex flex-row justify-content-center">
              <select name="Playlists" class="form-control" style="background: #14143b; color: white; max-width: 30vh;" v-model="activeList">
                <option disabled>Select a Playlist</option>
                <option v-for="playlist in playlists" :value="playlist">{{playlist.title}}</option>
              </select>
              <button class="btn btn-primary" v-if="activeList" @click="addSong(song)">Add Song</button>
            </div>
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
      this.player = null;
      this.isPlaying = {};
    },
    data() {
      return {
        query: '',
        newList: {
          title: ''
        },
        activeList: {},
        player: null,
        isPlaying: {},
        alert: '',
        style: ''
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
        if (this.activeList._id) {
          var index = this.activeList.songs.findIndex(item => {
            return item.trackId == song.trackId
          })
          if (index == -1) {
            this.activeList.songs.push(song)
            this.alert = "Successfully added to Playlist!"
            this.style = "#4BB543"
            this.$store.dispatch('editList', this.activeList)
          }
          else if (index >= 0) {
            this.style = "#ff0505"
            this.alert = "Song is already on Playlist!"
          }
        } else {
          this.style = "#ff0505"
          this.alert = "Please select a Playlist!"
        }
        var popup = document.getElementById(song.trackId);
        popup.style.color = this.style
        popup.classList.toggle("show");
        setTimeout(() => { popup.classList.toggle("show"); }, 3000);
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
  .songs-box {
    margin: 3vh;
    background: #333399;
    color: white;
    border: #14143b solid;
    padding: 2vh;
  }

  .songImg {
    height: 25vh;
    width: 25vh;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: auto;
  }

  .popup {
    position: relative;
    display: inline-block;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* The actual popup */

  .popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -80px;
  }

  .popup {
    opacity: 0.8
  }

  /* Popup arrow */

  .popup .popuptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  /* Toggle this class - hide and show the popup */

  .popup .show {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }

  /* Add animation (fade in the popup) */

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .playImg {
    width: 100%;
    margin: auto;
    opacity: 0.2;
  }

  .songImg:hover .playImg {
    opacity: 0.8;
  }
</style>
webpackJsonp([1],{"+fgC":function(t,s){},"6Gd4":function(t,s){},"GkM+":function(t,s,e){t.exports=e.p+"static/img/pause.cc90ab2.png"},KBZJ:function(t,s,e){t.exports=e.p+"static/img/play.1b688d4.png"},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("7+uW"),a=e("bOdI"),n={name:"App",computed:{user:function(){return console.log(this.$store.state.user,"app user"),this.$store.state.user}},mounted:function(){this.$store.state.user._id||this.$router.push({name:"Auth"})},created:function(){var t=this;window.addEventListener("beforeunload",function(){"demo@demo.com"==t.$store.state.user.email&&t.$store.dispatch("endDemo")})},methods:e.n(a)()({getPosts:function(){this.$store.dispatch("getPlaylists"),this.$router.push("playlists")},login:function(){this.$router.push("login")},signOut:function(){this.$store.dispatch("signOut")},getFavs:function(){this.$router.push("favs"),this.$store.dispatch("getFavs")},home:function(){this.$router.push("/")}},"signOut",function(){this.$store.dispatch("signOut")})},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"app"}},[e("nav",{staticClass:"navbar navbar-light top-header",staticStyle:{background:"#333399",color:"white"}},[e("div",[e("a",{staticClass:"navbar-brand",on:{click:t.home}},[t._v("Home")]),t._v(" "),t.user._id?e("router-link",{staticClass:"navbar-brand",staticStyle:{color:"white"},attrs:{to:{name:"Playlists"}},on:{click:t.getPosts}},[t._v("\n        Playlists\n      ")]):t._e()],1),t._v(" "),t._m(0),t._v(" "),e("div",[t.user._id?t._e():e("a",{staticClass:"navbar-brand",on:{click:t.login}},[t._v("Sign up/Login")]),t._v(" "),t.user._id?e("div",{staticClass:"d-flex flex-column"},[e("a",{staticClass:"navbar-brand"},[t._v("User: "+t._s(t.user.displayName))]),t._v(" "),e("a",{staticClass:"navbar-brand",on:{click:t.signOut}},[t._v("Sign out")])]):t._e()])]),t._v(" "),e("router-view")],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"page-title"},[s("h1",[this._v("PlayTunes")])])}]};var l=e("VU/8")(n,o,!1,function(t){e("h7//")},null,null).exports,r=e("/ocq"),c=(e("cZhM"),{name:"Home",mounted:function(){this.$store.state.user._id||P.push({name:"Auth"}),this.$store.dispatch("getPlaylists"),this.player=null,this.isPlaying={}},data:function(){return{query:"",newList:{title:""},activeList:{},player:null,isPlaying:{},alert:"",style:""}},computed:{songs:function(){return this.$store.state.songs},playlists:function(){return this.$store.state.playlists},user:function(){return this.$store.state.user}},methods:{search:function(){this.$store.dispatch("getSongs",this.query)},createPlaylist:function(){this.$store.dispatch("createPlaylist",this.newList),this.showAdd=!this.showAdd},addSong:function(t){if(this.activeList._id){var s=this.activeList.songs.findIndex(function(s){return s.trackId==t.trackId});-1==s?(this.activeList.songs.push(t),this.alert="Successfully added to Playlist!",this.style="#4BB543",this.$store.dispatch("editList",this.activeList)):s>=0&&(this.style="#ff0505",this.alert="Song is already on Playlist!")}else this.style="#ff0505",this.alert="Please select a Playlist!";var e=document.getElementById(t.trackId);e.style.color=this.style,e.classList.toggle("show"),setTimeout(function(){e.classList.toggle("show")},3e3)},initPlayer:function(t){this.player=null,this.player=new Howl({src:t.previewUrl,autoplay:!0,volume:.5,html5:!0})},playSong:function(t){this.isPlaying==t?(this.player.pause(),this.isPlaying={}):this.player?(this.player.pause(),this.isPlaying=t,this.initPlayer(t)):(this.isPlaying=t,this.initPlayer(t))}}}),u={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"home"},[i("div",{staticClass:"search mt-2"},[i("form",{on:{submit:function(s){return s.preventDefault(),t.search(s)}}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticStyle:{background:"black",color:"white",opacity:"0.8"},attrs:{type:"text"},domProps:{value:t.query},on:{input:function(s){s.target.composing||(t.query=s.target.value)}}}),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("SEARCH")])])]),t._v(" "),i("div",{staticClass:"results row d-flex justify-content-center"},t._l(t.songs,function(s){return i("div",{staticClass:"card col-md-3 col-xs-12 songs-box"},[i("a",{on:{click:function(e){t.playSong(s)}}},[i("h4",[t._v(t._s(s.trackName))])]),t._v(" "),i("h5",[t._v(t._s(s.artistName))]),t._v(" "),i("a",{on:{click:function(e){t.playSong(s)}}},[i("div",{staticClass:"songImg",style:s.artworkUrl100,attrs:{id:s._id}},[s.trackId!=t.isPlaying.trackId?i("img",{staticClass:"playImg",attrs:{src:e("KBZJ")}}):t._e(),t._v(" "),s.trackId==t.isPlaying.trackId?i("img",{staticClass:"playImg",attrs:{src:e("GkM+")}}):t._e()])]),t._v(" "),i("h6",{staticClass:"mt-2"},[t._v("Price: "+t._s(s.trackPrice))]),t._v(" "),i("div",[i("a",{staticClass:"btn btn-outline-success mt-2",attrs:{href:s.trackViewUrl,target:"_blank"}},[t._v("Purchase")]),t._v(" "),t.user?i("div",{staticClass:"form-group"},[i("div",{staticClass:"popup"},[i("span",{staticClass:"popuptext",attrs:{id:s.trackId}},[t._v(t._s(t.alert))])]),t._v(" "),i("div",{staticClass:"d-flex flex-row justify-content-center"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.activeList,expression:"activeList"}],staticClass:"form-control",staticStyle:{background:"#14143b",color:"white","max-width":"30vh"},attrs:{name:"Playlists"},on:{change:function(s){var e=Array.prototype.filter.call(s.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.activeList=s.target.multiple?e:e[0]}}},[i("option",{attrs:{disabled:""}},[t._v("Select a Playlist")]),t._v(" "),t._l(t.playlists,function(s){return i("option",{domProps:{value:s}},[t._v(t._s(s.title))])})],2),t._v(" "),t.activeList?i("button",{staticClass:"btn btn-primary",on:{click:function(e){t.addSong(s)}}},[t._v("Add Song")]):t._e()])]):t._e()])])}))])},staticRenderFns:[]};var d=e("VU/8")(c,u,!1,function(t){e("UJmt")},null,null).exports,p={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"auth"},[t.showLogin?e("div",{staticClass:"login"},[e("h1",[t._v("Login")]),t._v(" "),e("form",{staticClass:"form",on:{submit:function(s){return s.preventDefault(),t.login(s)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"input",attrs:{type:"email",name:"email",placeholder:" email",id:"email"},domProps:{value:t.user.email},on:{input:function(s){s.target.composing||t.$set(t.user,"email",s.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"input",attrs:{type:"password",name:"password",placeholder:" password",id:"name"},domProps:{value:t.user.password},on:{input:function(s){s.target.composing||t.$set(t.user,"password",s.target.value)}}}),t._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Login")])]),t._v(" "),e("p",{staticClass:"user"},[t._v("Not a user ?\n      "),e("em",{on:{click:t.toggle}},[t._v("Register")])])]):t._e(),t._v(" "),t.showLogin?t._e():e("div",{staticClass:"register"},[e("h1",[t._v("Register")]),t._v(" "),e("form",{on:{submit:function(s){return s.preventDefault(),t.register(s)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"input",attrs:{type:"email",name:"email",placeholder:" email",id:"email"},domProps:{value:t.user.email},on:{input:function(s){s.target.composing||t.$set(t.user,"email",s.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.user.displayName,expression:"user.displayName"}],staticClass:"input",attrs:{type:"text",name:"name",placeholder:" Name",id:"name"},domProps:{value:t.user.displayName},on:{input:function(s){s.target.composing||t.$set(t.user,"displayName",s.target.value)}}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"input",attrs:{type:"password",name:"password",placeholder:" password",id:"name"},domProps:{value:t.user.password},on:{input:function(s){s.target.composing||t.$set(t.user,"password",s.target.value)}}}),t._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Register")])]),t._v(" "),e("p",[t._v("Already a user?\n      "),e("em",{on:{click:t.toggle}},[t._v("Login")])])]),t._v(" "),e("p",[t._v("Or start a "),e("button",{staticClass:"btn btn-success",on:{click:t.demo}},[t._v("Demo")])])])},staticRenderFns:[]};var h=e("VU/8")({name:"Auth",mounted:function(){this.$store.dispatch("authenticate")},data:function(){return{user:{email:"",displayName:"",password:""},showLogin:!0}},computed:{},methods:{login:function(){this.$store.dispatch("login",this.user)},register:function(){this.$store.dispatch("register",this.user)},toggle:function(){this.showLogin=!this.showLogin},demo:function(){this.$store.dispatch("startDemo")}}},p,!1,function(t){e("+fgC")},null,null).exports,m={name:"Playlists",mounted:function(){this.$store.state.user||P.push({name:"Auth"}),this.$store.dispatch("getPlaylists")},data:function(){return{showAdd:!1,list:{title:"",userId:""}}},computed:{playlists:function(){return this.$store.state.playlists}},methods:{toggleAdd:function(){this.showAdd=!this.showAdd},addPlaylist:function(){this.$store.dispatch("createPlaylist",this.list),this.showAdd=!this.showAdd}}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"playlist"},[t.showAdd?t._e():e("button",{staticClass:"btn btn-primary mt-4",on:{click:t.toggleAdd}},[t._v("New Playlist")]),t._v(" "),t.showAdd?e("div",{staticClass:"mt-4"},[e("form",{on:{submit:function(s){return s.preventDefault(),t.addPlaylist(s)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.list.title,expression:"list.title"}],staticStyle:{background:"black",color:"white",opacity:"0.8"},attrs:{type:"text"},domProps:{value:t.list.title},on:{input:function(s){s.target.composing||t.$set(t.list,"title",s.target.value)}}}),t._v(" "),e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Add Playlist")])])]):t._e(),t._v(" "),e("div",{staticClass:"row justify-content-center"},t._l(t.playlists,function(s){return e("div",{staticClass:"card col-md-8 songs-box"},[e("router-link",{attrs:{to:{name:"listDetails",params:{id:s._id}}}},[e("h3",[t._v(t._s(s.title))])]),t._v(" "),e("h4",[t._v("songs: "+t._s(s.songs.length))])],1)}))])},staticRenderFns:[]};var g=e("VU/8")(m,v,!1,function(t){e("6Gd4")},null,null).exports,f=e("DAYN"),y={name:"listDetails",mounted:function(){this.$store.state.user._id||P.push({name:"Auth"}),this.$store.dispatch("getPlaylist",this.$route.params.id),this.player=null,this.isPlaying={}},components:{draggable:e.n(f).a},data:function(){return{activeSong:{},isPlaying:!1,player:null,songsIndex:0}},computed:{activeList:function(){return this.$store.state.activeList},songs:{get:function(){return this.$store.state.activeList.songs},set:function(t){this.editList(t)}}},methods:{initPlayer:function(t,s,e){this.player=new Howl({src:t[s].previewUrl,autoplay:!0,volume:.5,html5:!0,onend:function(){if(s<t.length-1){var i=t[++s];e(i)}else{i=t[0];e(i)}}})},playSong:function(t){this.player&&this.player.stop(),this.isPlaying=!0,this.activeSong=t,this.songsIndex=this.songs.findIndex(function(s){return s._id==t._id}),this.initPlayer(this.songs,this.songsIndex,this.playSong)},editList:function(t){this.activeList.songs=t,this.$store.dispatch("editList",this.activeList)},togglePlay:function(){0==this.isPlaying?(this.isPlaying=!this.isPlaying,this.player.play()):(this.isPlaying=!this.isPlaying,this.player.pause())},removeSong:function(t){var s=this.activeList.songs.findIndex(function(s){return s.trackId==t.trackId});this.activeList.songs.splice(s,1),this.songs=this.activeList.songs,this.$store.dispatch("editList",this.activeList)}}},_={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"listDetails"},[i("div",{staticClass:"title"},[i("h2",{staticStyle:{color:"white"}},[t._v(t._s(t.activeList.title))])]),t._v(" "),t.activeSong?i("div",{staticClass:"results row mt-4 d-flex justify-content-center"},[i("div",{staticClass:"card col-md-4 col-xs-12 songs-box"},[i("a",{on:{click:t.togglePlay}},[i("h4",[t._v(t._s(t.activeSong.trackName))])]),t._v(" "),i("h5",[t._v(t._s(t.activeSong.artistName))]),t._v(" "),i("a",{on:{click:t.togglePlay}},[i("div",{staticClass:"songImg",style:t.activeSong.artworkUrl100,attrs:{id:t.activeSong._id}},[t.isPlaying?t._e():i("img",{staticClass:"playImg",attrs:{src:e("KBZJ")}}),t._v(" "),t.isPlaying?i("img",{staticClass:"playImg",attrs:{src:e("GkM+")}}):t._e()])])])]):t._e(),t._v(" "),i("div",{staticClass:"row d-flex justify-content-center mt-4"},[i("draggable",{model:{value:t.songs,callback:function(s){t.songs=s},expression:"songs"}},t._l(t.songs,function(s){return i("div",{key:s._id,staticClass:"col-12 d-flex justify-content-row justify-content-center songs-box"},[s._id!=t.activeSong._id?i("a",{staticClass:"play",on:{click:function(e){t.playSong(s)}}},[i("i",{staticClass:"fas fa-play"})]):t._e(),t._v(" "),s._id==t.activeSong._id&&1==t.isPlaying?i("a",{staticClass:"play",on:{click:t.togglePlay}},[i("i",{staticClass:"fas fa-pause"})]):t._e(),t._v(" "),s._id==t.activeSong._id&&0==t.isPlaying?i("a",{staticClass:"play",on:{click:t.togglePlay}},[i("i",{staticClass:"fas fa-play"})]):t._e(),t._v(" "),s._id!=t.activeSong._id?i("a",{on:{click:function(e){t.playSong(s)}}},[i("h4",{staticClass:"songs"},[t._v(t._s(s.trackName)+"-"+t._s(s.artistName))])]):t._e(),t._v(" "),s._id==t.activeSong._id&&1==t.isPlaying?i("a",{on:{click:t.togglePlay}},[i("h4",{staticClass:"songs"},[t._v(t._s(s.trackName)+"-"+t._s(s.artistName))])]):t._e(),t._v(" "),s._id==t.activeSong._id&&0==t.isPlaying?i("a",{on:{click:t.togglePlay}},[i("h4",{staticClass:"songs"},[t._v(t._s(s.trackName)+"-"+t._s(s.artistName))])]):t._e(),t._v(" "),i("a",{staticClass:"btn remove play",on:{click:function(e){t.removeSong(s)}}},[i("i",{staticClass:"fas fa-trash-alt"})])])}))],1)])},staticRenderFns:[]};var w=e("VU/8")(y,_,!1,function(t){e("Pzyf")},null,null).exports;i.a.use(r.a);var P=new r.a({routes:[{path:"/",name:"Home",component:d},{path:"/login",name:"Auth",component:h},{path:"/playlists",name:"Playlists",component:g},{path:"/playlist/:id",name:"listDetails",component:w}]}),b=e("NYxO"),C=e("mtWM"),k=e.n(C),$=!window.location.host.includes("localhost")?"//ramsey-playtunes.herokuapp.com/":"//localhost:3000/";i.a.use(b.a);var L=k.a.create({baseURL:$,timeout:3e3,withCredentials:!0}),x=k.a.create({baseURL:"https://itunes.apple.com/search?term=",timeout:3e3}),S=new b.a.Store({state:{user:{},songs:[],playlists:[],activeList:{}},mutations:{setUser:function(t,s){t.user=s},setSongs:function(t,s){t.songs=s},setPlaylists:function(t,s){t.playlists=s},setActiveList:function(t,s){t.activeList=s}},actions:{login:function(t,s){t.dispatch;var e=t.commit;L.post("/login",s).then(function(t){console.log(t.data.data),e("setUser",t.data.data),P.push("/")}).catch(function(t){console.error(t)})},register:function(t,s){t.dispatch;var e=t.commit;L.post("/register",s).then(function(t){e("setUser",t.data),P.push("/")}).catch(function(t){console.error(t)})},getSongs:function(t,s){t.dispatch;var e=t.commit;x.get(""+s).then(function(t){t.data.results.forEach(function(t){t.artworkUrl100="background-image: url("+t.artworkUrl100+");"}),e("setSongs",t.data.results)})},getPlaylists:function(t){t.dispatch;var s=t.commit;t.state;L.get("/playlists/").then(function(t){var e=t.data.sort(function(t,s){return s.songs.length-t.songs.length});s("setPlaylists",e)})},createPlaylist:function(t,s){var e=t.dispatch;t.commit,t.state;L.post("/new-playlist",s).then(function(t){e("getPlaylists")})},editList:function(t,s){t.dispatch;var e=t.commit;L.put("/playlist/"+s._id,s).then(function(t){console.log(t.data),e("setActiveList",t.data)}).catch(function(t){console.log(t)})},getPlaylist:function(t,s){t.dispatch;var e=t.commit;L.get("/playlist/"+s).then(function(t){e("setActiveList",t.data)})},signOut:function(t){t.dispatch;var s=t.commit;t.state;L.delete("/logout").then(function(t){s("setUser",{}),P.push("/")})},authenticate:function(t){var s=t.commit;t.dispatch;L.get("/authenticate").then(function(t){s("setUser",t.data.data),P.push({name:"Home"})}).catch(function(t){console.log(t.data)})},startDemo:function(t){var s=t.dispatch;t.commit;s("login",{email:"demo@demo.com",password:"demo"})},endDemo:function(t){t.dispatch,t.commit;var s=t.state;L.delete("/end-demo/"+s.user._id).then(function(t){console.log(t)}).catch(function(t){console.log(t)})}}});i.a.config.productionTip=!1,new i.a({el:"#app",router:P,store:S,components:{App:l},template:"<App/>"})},Pzyf:function(t,s){},UJmt:function(t,s){},"h7//":function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.4ea3a965a2a344cfc144.js.map
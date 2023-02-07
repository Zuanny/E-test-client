<script >
import {useRoute, useRouter} from 'vue-router'
import {userStore} from '../stores/userStore'
import {getVideoRoom, getPlaylist, createPlaylist} from '../services/VideoRoomService'
let UserStorage = userStore()

export default {
    data (){
        return {
            router : useRouter(),
            videosRoom : [],
            VideoRoom: {},
            linKVideo: 'https://www.youtube.com/watch?v=bnVUHWCynig',
            listVideos: [],
            linkAtual:'',
            async addVideo(){
            let playlist = {
                video_rooms_id: this.VideoRoom.videoRoom_id,
                user_id:    UserStorage.user.id ,
                link: this.linkAtual
            }
       
             await createPlaylist(playlist)
             this.switchVideo(this.linkAtual)   
            },
            
            switchVideo(link){
                this.linKVideo = link
                window.location.reload(false)
            },

            redicetHome(){
                this.router.push({name: "home"})
            }
        }
    },
  async  created() { 
        let route = useRoute()
        this.VideoRoom = await getVideoRoom(route.params.id)
                        .then(response => this.VideoRoom = response.find(el => el.videoRoom_id == route.params.id ) )
        
        this.listVideos = await getPlaylist(this.VideoRoom.videoRoom_id)
                          .then(response => this.listVideos = response )
                         
        if(this.listVideos[0].link != null){
            this.linKVideo = this.listVideos[0].link
        }
    },
    methods () {   
    },
    mounted () {
        this.$refs.plyr.player.on('event', () => console.log('event fired'))
    }

}  

</script>
<template>
    <div class="videoroom">
        <div class="container-fluid text-center divider">
            <div class="row divider">
                <div class="col videoroom-data">
                    <h4 v-on:click="redicetHome()">HOME</h4>
                   <p>Sala: <h4>{{ VideoRoom.videoRoom_name }}</h4></p>
                   <p>Criado por: <h4>{{ VideoRoom.user_name }}</h4></p>
                </div>
                <div class="col-6 input-link text-center">
                    <div class="">
              
                        <input 
                        type="text"  
                        class="form-control" 
                        id="inputPassword2" 
                        placeholder="Link Youtube Video"
                        v-model="linkAtual">
                        <div class="div-butao">
                            <button v-on:click="addVideo" type="submit" class="btn  mb-3 ">Play</button>
                        </div>
                    </div>
                </div>
                <div class="col">
            
                </div>
            </div>


            <div class="row">
                <div class="col">
               
                </div>
                <div class="col-6">
                    <div  class="video-layout">
              
                        <vue-plyr ref="plyr">
                            <div class="plyr__video-embed">
                                <iframe
                                :src="linKVideo"
                                allowfullscreen
                                allowtransparency
                                allow="autoplay"
                                ></iframe>
                            </div>
                        </vue-plyr>
                    </div>
                </div>
                <div class="col">
                    <div class="">
              
            
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>



<style>
.divider{
    margin-bottom: 60px;
}
.videoroom{
    padding: 50px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(65, 65, 65);

}
.video-layout{
    box-shadow: 0 19px 38px black, 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 25px;
}
.videoroom-data{
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: #fff;
    box-shadow: 0 19px 38px black, 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 25px;
    margin: 0 50px;
}
.input-link {
    display: inline-block;
    
    align-items: center;
    
    
}
.input-link input{
    width: 70%;
    box-shadow: 0 19px 38px black, 0 15px 12px rgba(0,0,0,0.22);
    border-radius: 25px;
    
}
.div-butao{
    
   

    position: absolute;
    left: 31rem;
    top: 0;
    display: block  ;
    width: 20%;
    background-color: #ffffff00;
    
}
</style>

<template>
  <div class="home bg-secondary-subtle ">
    <div class="container-fluid" >
      <div class="row">
        <div class=" col col-lg-2 text-center rooms-list">
          <h2 ></h2>
         
            <table class="table table-dark table-borderless">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Sala</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="room in this.listVideoRooms">
                  <td v-on:click="redicetRoom(room.videoRoom_id)">{{room.videoRoom_id}}</td>
                  <td v-on:click="redicetRoom(room.videoRoom_id)">{{room.videoRoom_name}}</td>
                </tr>
              </tbody>

            </table>

        </div>

        <div class="col form-room ">
          <div>
            <form @submit.prevent="createRoom" class="row g-3 text-center">
              <div class="col">
                <h3>Criar Sala</h3>
              </div>
              <div class="col">
              
                <input 
                type="text"  
                class="form-control" 
                id="inputPassword2" 
                placeholder="Nome Sala"
                v-model="this.VideoRoom.name">
              </div>
              <div class="col">
                <button type="submit" class="btn btn-secondary mb-3 ">Criar Sala</button>
              </div>
            </form>
          </div>
        </div>

        <div class="col col-lg-2">

        </div>
      </div>
    </div>  


  </div>


</template>

<script >
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import {createVideoRoom} from "../services/VideoRoomService"
import {getVideoRoom} from "../services/VideoRoomService"
let User = JSON.parse(localStorage.getItem("user"))


export default {
  data(){
    return {
      listVideoRooms: [],
      VideoRoom: {
        name: ""
      },
      router:useRouter(),
      user: User,
      async  createRoom(){
        try {
          let response  = await createVideoRoom(this.VideoRoom)
          this.router.push({name: 'videoroom', params : {id: response.videoObj.id}})

        } catch (error) {
          console.log(error)
        }
      },
      redicetRoom(idRoom){
        this.router.push({name:'videoroom', params: {id: idRoom}})
      }

    }
  },
  async created(){
    this.VideoRoom = reactive({
      name: '',
      user_id: this.user.id
    })
    let allVideoRooms = await getVideoRoom(this.user.id)
    allVideoRooms.sort((a , b) => {a.videoRoom_id - b.videoRoom_id})
    this.listVideoRooms = allVideoRooms.filter(el => el.user_id == this.user.id)
    console.log(this.listVideoRooms);
  },
  

}


</script>

<style scoped>

.home{
  padding: 100px;
  position: fixed;
  top: 0;
  left: 0;
 
  width: 100vw;
  height: 100vh;
  background-color: #888888;
}
.list-group{
  padding: 30px;
  background-color: #bebebe;
  
  
  box-shadow: 0 19px 38px black, 0 15px 12px rgba(0,0,0,0.22);
  border-radius: 25px;

}
.list-group-item{
  background-color: #bebebe;

}

.list-room{

 width: 400px;
}
.form-room{
  height: 100px;
  padding-top: 25px;

 
  background-color: #bebebe;
  margin: 0px 50px 250px 50px;;
  
  box-shadow: 0 19px 38px black, 0 15px 12px rgba(0,0,0,0.22);
  border-radius: 25px;
}
h3{
  font-size: 24px;
}
</style>

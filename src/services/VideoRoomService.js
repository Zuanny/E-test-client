import http from '../services/http'

export  async function createVideoRoom(VideoRoom){
    try {
  
        let {data: videoObj} = await http.post('/videos_room', VideoRoom)
        
        let playlist = {
          video_rooms_id: videoObj.id,
          user_id: videoObj.user_id
        }

        let dataPlaylist = await createPlaylistVideoRoom(playlist)
        await createRelationUserVideoRoom(playlist)

        return {
          videoObj,
          dataPlaylist
        }
    } catch (error) {
        console.log(error?.response?.data);
    }  
  }
  
  async function createPlaylistVideoRoom(playlist){
    try {
      let {data} = await http.post('/playlist',playlist )
        
      return data
    } catch (error) {
        console.log(error?.response?.data);
    }  }

  async function createRelationUserVideoRoom(user_videos_room){
    try {
      let {data} = await http.post('/user_videos_room',user_videos_room )
      return data
    } catch (error) {
      console.log(error?.response?.data);
    }
  }


 export async function getVideoRoom(id){
    try {
    return  fetch('http://localhost:3000/api/v1/videos_room/'+ id,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response =>  response.json()).
      then(response => {
         return response;}
        )
    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  export async function getPlaylist(id){
    try {
    return  fetch('http://localhost:3000/api/v1/playlist/'+ id,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response =>  response.json()).
      then(response => {
         return response;}
        )
    } catch (error) {
      console.log(error?.response?.data);
    }
  }

  export async function createPlaylist(playlist){
    try {
    return  fetch('http://localhost:3000/api/v1/playlist/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)})
        .then(response =>  response.json())
        .then(response => {
         return response;}
        )
    } catch (error) {
      console.log(error?.response?.data);
    }
  }



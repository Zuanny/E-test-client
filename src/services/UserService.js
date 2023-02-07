import http from '../services/http'

export  async function getRoomsAcess(user_id){
    try {
          let {data} = await http.get('/user_videos_room/'+user_id)
        return data
    } catch (error) {
        console.log(error?.response?.data);
    }  
  }
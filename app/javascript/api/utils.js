import axios from "axios";

export async function getUserInfo() {
  try {
    const response = await axios.get("/userinfo");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createRoom(roomData) {
  if (roomData.room_type === "public") {
    try {
      const response = await axios.post("/room/create", {
        room: roomData,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    // Create Private room
    try {
      const response = await axios.post("/room/create", {
        room: {
          title: "Test Room",
          host: "Test Host",
          room_id: "niceone123",
          room_type: "priv",
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}


export async function getRoom(roomId){
  const response = await axios.get(`/room/info/${roomId}`)
  return response.data
}

export async function getAllRooms(){
  const response = await axios.get('/room/get_current_user_rooms')
  return response.data
}
import axios from "axios";

export async function getUserInfo() {
  try {
    const response = await axios.get("/userinfo");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createRoom(type, roomId) {
  if (type === "public") {
    try {
      const response = await axios.post("/room/create", {
        room: {
          title: "Test Room",
          host: "Test Host",
          room_id: roomId,
          room_type: type,
        },
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
          room_type: type,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

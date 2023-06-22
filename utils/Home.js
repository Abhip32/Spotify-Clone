import axios from "axios"

export const getTopitemsM = async () => {
    const type="tracks"
    console.log( JSON.parse(localStorage.getItem("spotify-data")).token)
    const {data} = await axios.get(`https://api.spotify.com/v1/me/top/${type}?limit=100`, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
          "Content-Type": "application/json",
        },
    })
    return await data.items;
  }


export const getTopPlaylistsM = async () => {
      const id=JSON.parse(localStorage.getItem("spotify-data")).userId
      const {data} = await axios.get(`https://api.spotify.com/v1/users/${id}/playlists`, {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
          },
      })
      console.log(data)
  }


export const getFeaturedPlaylists = async () => {

      const {data} = await axios.get("https://api.spotify.com/v1/browse/featured-playlists", {
          headers: {
            Authorization: "Bearer " +  JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
          },
      })
      return await data;
      
   
  }

  export const getTopArtistsM = async () => {
    const type="artists"
    const {data} = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
          "Content-Type": "application/json",
        },
    })
    return await data;
  }


export const setPlayingItem=async (name,artist,duration,url,img) =>{
  const existingData = localStorage.getItem('spotify-data');
const parsedData = existingData ? JSON.parse(existingData) : {};

const newData = {
  name: name,
  artist: artist,
  duration: duration,
  url: url,
  img:img
};

const mergedData = { ...parsedData, songData:{...newData }};

const newDataString = JSON.stringify(mergedData);

localStorage.setItem('spotify-data', newDataString);
window.dispatchEvent(new Event("storage"));
}


export const getPlayingItem = async()=>{
  return JSON.parse(localStorage.getItem('spotify-data')).songData;
  l
}
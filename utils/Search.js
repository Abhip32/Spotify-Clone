import axios from "axios"



export const searchArtists = async (searchKey) => {

    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
        },
        params: {
            q: searchKey,
            type: "artist"

        }
    })

    return await (data)
  }


  export const browseNew =async ()=>{
    const {data} = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
        }
    })

    return await (data)
  }

  
  
  

export const searchAlbums = async (searchKey) => {

    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
        },
        params: {
            q: searchKey,
            type: "album"
        }
    })
      return await (data.albums)
  }

  export  const searchShows = async (searchKey) => {

    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
        },
        params: {
            q: searchKey,
            type: "show"
        }
    })
      return await data.shows
  }

  export const searchEpisodes = async (searchKey) => {
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
        },
        params: {
            q: searchKey,
            type: "episode"
        }
    })
      return await data.episodes
  }

  export   const searchPlaylists = async (searchKey) => {
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("spotify-data")).token,
            "Content-Type": "application/json",
        },
        params: {
            q: searchKey,
            type: "playlist"
        }
    })
    return await (data.playlists)
  }

  export const searchTracks = async (id,type) => {
    const {data} = await axios.get(`https://api.spotify.com/v1/${type}s/${id}/tracks`, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem('spotify-data')).token,
        "Content-Type": "application/json",
      },
    })
    console.log(data);
    return await data.items;
  }


  export const getPlaylistInfo= async (id,type) => {
    const {data} = await axios.get(`https://api.spotify.com/v1/${type}s/${id}`, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem('spotify-data')).token,
        "Content-Type": "application/json",
      },
    })
    return await data;
  }
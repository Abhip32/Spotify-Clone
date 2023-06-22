import axios from 'axios'

export const extractAccessToken = async(passedUrl)=> {
    const url = passedUrl
    const params = new URLSearchParams(url.split('#')[1]);
  
    return params.get('access_token');
  }
  

export const getUserInfo = async (pass) => {
    const token=await extractAccessToken(pass);
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
   
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name:  data.display_name,
        token: token,
        
      };
      const objectString = JSON.stringify(userInfo);
      localStorage.removeItem('spotify-data');
      localStorage.setItem("spotify-data",objectString)
      
      return userInfo;
 

  };


 
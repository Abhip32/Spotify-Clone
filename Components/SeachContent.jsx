"use client";
import { browseNew, search, searchArtists, searchPlaylists, searchShows, searchEpisodes } from '@/utils/Search';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineUser, AiFillPlayCircle } from 'react-icons/ai';
import Link from 'next/link';
import ChannelReel from './Reel';
import { useRouter } from 'next/navigation';

const SearchContent = () => {
  const router=useRouter()
  const [browseItems, setBrowseItems] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [shows, setShows] = useState([]);
  const [artists, setArtists] = useState([]);

  const handlePlayClick = (id, type) => {
    router.push('/tracks/'+type+'/' + id)
    
  };

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      // Perform your desired action here
      console.log('User has finished typing:', searchQuery);
      if(searchQuery != "")
      {
        searchArtists(searchQuery).then(async (data) => {
          let response = await data;
          setArtists(response.artists.items);
        });

        searchPlaylists(searchQuery).then(async (data)=>{
        let response = await data;
        setPlaylists(response.items);
        console.log(playlists)
      })

      searchShows(searchQuery).then(async (data)=>{
        let response = await data;
        setShows(response.items);
      })

      searchEpisodes(searchQuery).then(async (data)=>{
        let response = await data;
        setEpisodes(response.items);

      })

      
        
      }

    }, 1000); // Adjust the delay according to your needs

    return () => {
      clearTimeout(typingTimer);
    };
  }, [searchQuery]);

  useEffect(() => {
    browseNew().then((data) => {
      let items = data.albums.items;
      setBrowseItems(items);
    });
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setIsTyping(true);
  };

  return (
    <div style={
      {
        backgroundImage: "linear-gradient(145deg, #B03A2E, #383838)",
        minHeight:"100vh",
      }
    }>
      <div className="p-5 gap-2vw">
        <div className='flex bg-white rounded-xl p-3 gap-10px'>
          <AiOutlineSearch size={25} color={"black"} />
          <input className='border-none w-full outline-none text-black' type="text" placeholder="Artists, Songs and Podcasts" onChange={(e) => handleInputChange(e)} />
        </div>
      </div>
      {!browseItems.length>0 &&searchQuery ==="" && <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
      <div className={searchQuery === ""  && browseItems.length >0? 'p-5' : 'hidden'}>
        <div className='flex justify-between'>
          <div className='font-bold text-2xl'>
            <h1>New Release</h1>
            <br />
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:p-0 border-none">
          {browseItems.map((playlist) => (
              <div className="bg-black text-white border-none shadow p-3 h-full rounded-lg hover:bg-zinc-700 hover:text-black">
                <img className="rounded-lg" src={playlist.images.length ? playlist.images[0].url : '/images/unknown.png'} alt="" />
                <div className="p-5">
                  <h5 className="mb-2 font-xl font-bold tracking-tight text-gray-900 dark:text-white sm:font-sm">{playlist.name}</h5>
                  <button onClick={()=>handlePlayClick(playlist.id,playlist.type)} className='height-none '>
            <AiFillPlayCircle size={50} className='text-green-500'/>
        </button>

                </div>
                
              </div>
          ))}
        </div>

      </div>
      {!artists[0] &&searchQuery !=="" && <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
      <div className={searchQuery !== "" && artists[0] ? 'p-5' : 'hidden'}>
       
        <div className='grid sm:grid-cols-2 md:cols-1 bg-black gap-4 p-3 sm:p-0 border-none rounded-xl' >
        <div className="bg-transparent border-none shadow dark:bg-transparent hover:bg-black p-3 flex flex-col gap-10 justify-center">
          <h4  className='font-bold text-xl p-1' style={{float:"left"}}>Top Result</h4>
          <div class="flex justify-center items-center">
  <img class="rounded-lg h-52 max-w-full" src={artists[0]?.images.length ? artists[0]?.images[0].url : '/images/unknown.png'} alt="" />
</div>

        <h5 className="font-bold text-xl p-1">{artists[0]?.name}</h5>
</div>
          <div className='overflow-y-auto rounded-xl m-2'>
          <div className='font-bold text-2xl p-3 h-[50vh]' style={{overflowX:"hidden"}}>
                          <h1>Playlists</h1><br/>
            
            {
              playlists.map((item)=>(
                <div key={item.id} className="flex p-2 shadow border-t border-black items-center justify-between bg-zinc-800">
                <div className='flex  items-center gap-10'>
                  <img src={item.images.length > 0 ? item.images[0].url : '/images/unknown.png'} alt={item.name} className="w-[60px] h-auto mb-4" />
                    <div style={{width:"20vw",marginRight:"1vw"}} className='text-ellipsis overflow-hidden'>
                        <h6 style={{fontSize:"2vh"}} className="font-semibold">{item.name}</h6>
                        
                    </div>
                    <button onClick={()=>handlePlayClick(item.id,item.type)} className='height-none '>
            <AiFillPlayCircle size={50} className='text-green-500'/>
        </button>
                  </div>
     
 
              </div>
              ))
            }
            </div>
          </div>
        </div>

        <div className='p-5'>
            <div className='font-bold text-2xl p-3'>
                          <h1> Artists</h1>
            </div>

            <div>
              <ChannelReel items={artists} type="round"/>
            </div>
          </div>

          <div className='p-3'>
            <div className='font-bold text-2xl p-5'>
                          <h1> Episodes</h1>
            
            </div>

            <div>
              <ChannelReel items={episodes} type="card"/>
            </div>
          </div>

          <div className='p-3'>
            <div className='font-bold text-2xl p-3'>
                          <h1> Shows</h1>
            </div>

            <div>
              <ChannelReel items={shows} type="card"/>
            </div>
          </div>
        </div>
        
        </div>
  );
};

export default SearchContent;

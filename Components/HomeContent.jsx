"use client" 
import { greet } from '@/utils/Greetings'
import {extractAccessToken, getFeaturedPlaylists, getTopArtistsM} from '@/utils/Home'
import { getUserInfo } from '@/utils/UserInfo'
import React, {useEffect, useState} from 'react'
import SideImgCard from './SideImgCard'
import {AiFillPlayCircle, AiOutlineUser} from 'react-icons/ai'
import Link from 'next/link'
import unknown from '../assets/unknown.png'
import Liked from '../assets/liked.png'
import { useRouter } from 'next/navigation'

const HomeContent = () => {
    const router=useRouter();
    const [showAllFeatured, setShowAllFeatured] = useState(false);
    const [showAllArtists, setShowAllArtists] = useState(false);

    const toggleShowAllFeatured = () => {
        setShowAllFeatured(!showAllFeatured);
    };

    const toggleShowAllArtists= () => {
        setShowAllArtists(!showAllArtists);
    };

    const handlePlayClick = (id, type) => {
        router.push('/tracks/' +type+'/'+ id)
        
      };

    const [featuredplaylists, setFeaturedPlaylists] = useState([])
    const [topArtists, setTopArtists] = useState([])
    useEffect(() => {

        if(!localStorage.getItem('spotify-data'))
        {     
            getUserInfo(window.location.href).then(async(data)=>{
                window.location.reload();
     
        })
        }
       setUserData(JSON.parse(localStorage.getItem('spotify-data')))
        greet().then(async(data)=>{
            setMessage(data)
        })

        getFeaturedPlaylists().then(async(data)=>{
            const response=data;
            console.log(response);
            setFeaturedPlaylists(response.playlists.items)
        })

        getTopArtistsM().then(async(data)=>{
            const response=data;
            setTopArtists(response.items)
        })

    }, [])

        let [userName, setUserName] = useState()
    let [userData, setUserData] = useState({})
    var [message, setMessage] = useState()
    const displayedPlaylists = showAllFeatured ? featuredplaylists : featuredplaylists.slice(0, 4);
    const displayedArtists = showAllArtists ? topArtists : topArtists.slice(0, 4);


    return (
        <div style={
            {
                backgroundImage: "linear-gradient(145deg, #29555d,black)",minHeight:"100vh"
            }
        }>
            <div className='flex justify-between'>
                <div className='p-5 font-bold text-2xl sm:font-md'>
                    <span>{message}</span>
                </div>

                <div className='p-5 font-bold text-md'>
                    <span style={
                        {
                            backgroundColor: "white",
                            color: "black",
                            padding: "0.7vw",
                            borderRadius: "2vw",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }
                    }><AiOutlineUser/> {userData?.name
                        
                    } </span>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-4 p-5 sm:font-sm'>
                <div class="..."><SideImgCard heading={"Liked Songs"}
                        url={Liked}
                        navi={"/LikedSongs"}/></div>
            </div>

            <div className='p-5'>
                <div className='flex justify-between'>
                    <div className='font-bold text-2xl'>
                        <h1>Featured Playlists</h1>
                        <br/>
                    </div>
                    <div>
                        <button className="text-white font-bold text-sm hover:text-green-500"
                            onClick={toggleShowAllFeatured}>
                               {showAllFeatured ? "Hide" : "Show All"}
                        </button>
                    </div>
                </div>
                {!displayedPlaylists.length>0 && <div className="flex justify-center items-center h-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-0 border-none">
  {displayedPlaylists.map((playlist) => (
    <div className="bg-transparent border-none shadow dark:bg-transparent hover:bg-black p-3 h-min">
      <img className="rounded-lg h-1/4" src={playlist.images.length ? playlist.images[0].url : unknown.src} alt="" />
      <div className="p-5">
        <h5 className="mb-2 font-xl font-bold tracking-tight text-gray-900 dark:text-white sm:font-sm">{playlist.name}</h5>
        <button onClick={()=>handlePlayClick(playlist.id,'playlist')} className='height-none '>
            <AiFillPlayCircle size={50} className='text-green-500'/>
        </button>
      </div>
    </div>
  ))}
</div>


            </div>

            <div className='p-5'>
                <div className='flex justify-between'>
                    <div className='font-bold text-2xl'>
                        <h1>Top Artists</h1>
                        <br/>
                    </div>
                    
                    <div>
                        <button className="text-white font-bold text-sm hover:text-green-500"
                            onClick={toggleShowAllArtists}>
                            {showAllArtists ? "Hide" : "Show All"}
                        </button>
                    </div>
                </div>
                {!displayedArtists.length>0 && <div className="flex justify-center items-center h-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {
                    displayedArtists.map((artist) => (
                        <Link href={
                            artist.external_urls.spotify
                        }>

                            <img style={{borderRadius:"100vw",width:"200px",height:"200px"}}
                                src={
                                    artist.images.length ? artist.images[0].url : unknown.src
                                }
                                alt=""/>
                            <div className="p-5">
                                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:font-sm">
                                    {
                                    artist.name
                                }</h5>
                            </div>
                        </Link>
            
                    ))
                } </div>


            </div>
        
        </div>

        
    )
}

export default HomeContent

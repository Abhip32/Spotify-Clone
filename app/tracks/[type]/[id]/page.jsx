"use client"
import Sidebar from '@/Components/Sidebar'
import { getTopitemsM } from '@/utils/UserInfo'
import React, { useEffect, useState } from 'react'
import { AiFillHeart,AiFillPlayCircle } from 'react-icons/ai'
import moment from 'moment'
import { getPlaylistInfo, searchTracks } from '@/utils/Search'
import { useParams, useRouter } from 'next/navigation';
import { setPlayingItem } from '@/utils/Home'
const Tracks = () => {
  if (typeof window !== "undefined") {
  const router = useParams();
  console.log(router)
  const [tracks,setTracks]= useState([])
  const [playlistData,setPlaylistData]= useState({})
    useEffect(()=>{
      if(tracks.length === 0||playlist==={}) {
        searchTracks(router.id,router.type).then(async(data)=>{
          const response=await data;
          setTracks(response)
          console.log(tracks)})

        getPlaylistInfo(router.id,router.type).then(async (data)=>{
          const response=await data;
          console.log(response);
          setPlaylistData(response)
        })

      }
    },[])

    const handlePlay=((name,artist,duration,url,img)=>{
      setPlayingItem(name,artist,duration,url,img)
    })

  return (
        <Sidebar>
            <div className="w-full b" style={{ backgroundImage: "linear-gradient(to bottom, #0047AB, black)",minHeight:"100vh"}}>
            <div className='flex p-10 gap-10 items-center'> 
                <img className="Icon w-1/4" src={playlistData.images?.length >0 ? playlistData.images[0].url:'/images/unknown.png'}  style={{boxShadow:"1px 1px 20px black",padding:"30px",backgroundImage:"linear-gradient(145deg, #b24592, black])"}}/>
        
                    <div className="info">
            <h2 className='text-xl font-semibold' style={{fontSize:"2vh"}}>{router.type}</h2>
            <h1 className='font-semibold' style={{fontSize:"3vw"}}>{playlistData.name}</h1>
            <h3> <a  className='text-xl font-semibold' style={{fontSize:"2vh"}} href={JSON.parse(localStorage.getItem('spotify-data'))?.userUrl}>
                    <span> {playlistData.description} &nbsp; | &nbsp; Followers {playlistData.followers?.total}</span>
            </a></h3>
        </div>
      </div>

    
             <div className="grid grid-cols-1 backdrop-filter backdrop-blur-lg backdrop-brightness-75 backdrop-saturate-150">

             <div key="1" className="flex p-4 shadow border-b border-black items-center justify-between ">
            <div className='flex gap-5 items-center'>
            <div className='mr-[10vw]' style={{fontSize:"2vh"}}>
                    <p>#</p>
                </div>
                <div className='mr-[20vw]' style={{fontSize:"2vh"}}>
                    <p>Title</p>
                </div>


                <div className='mr-[9vw]' style={{fontSize:"2vh"}}>
                    <h3>Album</h3>
                </div>
            </div>
            <div>
            </div>
          </div>
          {!tracks.length>0 && <div className="flex justify-center items-center h-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
        {router.type == "playlist" && tracks.map((item) => (
          <div key={item.id} className="flex p-4 shadow border-t border-black items-center justify-between bg-zinc-800">
            <div className='flex gap-5 items-center'>
                <h6>{tracks.indexOf(item)+1}</h6>
              <img src={item.track.album.images.length > 0 ? item.track.album.images[0].url : '/images/unknown.png'} alt={item.name} className="w-[40px] h-auto mb-4" />
                <div style={{width:"20vw",marginRight:"1vw"}} className='text-ellipsis overflow-hidden'>
                    <h6 style={{fontSize:"2vh"}} className="font-semibold">{item.track.name}</h6>
                </div>
                <div style={{width:"18vw"}}>
                <p style={{fontSize:"2vh"}}>{item.track.album.name}</p>
                </div>
            </div>
            <div style={{width:"4vw"}}>
            <button onClick={()=>handlePlay(item.track.name,item.track.album.name,item.track.duration_ms,item.track.preview_url,item.track.album.images[0].url )} className='height-none '>
              <AiFillPlayCircle size={50} className='text-green-500'/>
            </button>
            </div>
          </div>
        ))}


{router.type == "album" && tracks.map((item) => (
          <div key={item.id} className="flex p-4 shadow border-t border-black items-center justify-between bg-zinc-800">
            <div className='flex gap-5 items-center'>
                <h6>{tracks.indexOf(item)+1}</h6>
              <img src={playlistData.images?.length >0 ? playlistData.images[0].url:'/images/unknown.png'} alt={item.name} className="w-[40px] h-auto mb-4" />
                <div style={{width:"20vw",marginRight:"1vw"}} className='text-ellipsis overflow-hidden'>
                    <h6 style={{fontSize:"2vh"}} className="font-semibold">{item.name}</h6>
                </div>
                <div style={{width:"18vw"}}>
                <p style={{fontSize:"2vh"}}>{playlistData.name}</p>
                </div>
            </div>
            <div style={{width:"4vw"}}>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-black hover:underline mt-2 block text-white hover:text-green-500">
                <AiFillPlayCircle size={30} color='white'/>
            </a>
            </div>
          </div>
        ))}
      </div>
            </div>
        </Sidebar>
  )}
  else
  {
    return (
      <h1>Loading</h1>
    )
  }
}

export default Tracks
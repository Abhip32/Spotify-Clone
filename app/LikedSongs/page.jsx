"use client"
import Sidebar from '@/Components/Sidebar'
import { getTopitemsM, setPlayingItem } from '@/utils/Home'
import React, { useEffect, useState } from 'react'
import { AiFillHeart,AiFillPlayCircle } from 'react-icons/ai'
import moment from 'moment'

const LikedSongs = (props) => {
  if (typeof window !== "undefined") {
    const [topItems,setTopitems] = useState([])
    useEffect(()=>{
        getTopitemsM().then((items) =>{
            let fetchedItems = items
            setTopitems(fetchedItems)
        })
    },[])

    const handlePlay=((name,artist,duration,url,img)=>{
      setPlayingItem(name,artist,duration,url,img)
    })
  return (
        <Sidebar>
            <div className="w-full b" style={{ backgroundImage: "linear-gradient(to bottom, #b24592, black)",minHeight:"100vh"}}>
            <div className='flex p-10 gap-10 items-center'> 
                <AiFillHeart className="Icon" size={150} style={{boxShadow:"1px 1px 20px black",padding:"30px",backgroundImage:"linear-gradient(145deg, #b24592, black])"}}/>
        
                    <div className="info">
            <h2 className='text-xl font-semibold' style={{fontSize:"2vh"}}>Playlist</h2>
            <h1 className='font-semibold' style={{fontSize:"5vw"}}>Liked Songs</h1>
            <h3> <a  className='text-xl font-semibold' style={{fontSize:"2vh"}} href={JSON.parse(localStorage.getItem('spotify-data'))?.userUrl}>
                    <span> {JSON.parse(localStorage.getItem('spotify-data'))?.name} &nbsp;.&nbsp; {topItems.length} Songs</span>
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


                <div className='mr-[7vw]' style={{fontSize:"2vh"}}>
                    <h3>Album</h3>
                </div>

                
                <div className='mr-[4vw]' style={{fontSize:"2vh"}}>
                    <h3>Date Added</h3>
                </div>
            </div>
            <div>
            </div>
          </div>
          {!topItems.length>0 && <div className="flex justify-center items-center h-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>}
        {topItems.map((item) => (
          <div key={item.id} className="flex p-4 shadow border-t border-black items-center justify-between bg-zinc-800">
            <div className='flex gap-5 items-center'>
                <h6>{topItems.indexOf(item)+1}</h6>
              <img src={item.album.images.length > 0 ? item.album.images[0].url : '/images/unknown.png'} alt={item.name} className="w-[40px] h-auto mb-4" />
                <div style={{width:"20vw",marginRight:"1vw"}} className='text-ellipsis overflow-hidden'>
                    <h6 style={{fontSize:"2vh"}} className="font-semibold">{item.name}</h6>
                    <h6 style={{fontSize:"2vh"}} className="text-gray mt-2">{item.artists[0].name}</h6>
                </div>
                <div style={{width:"18vw"}}>
                <p style={{fontSize:"2vh"}}>{item.album.name}</p>
                </div>
                <div style={{width:"6vw"}}>
                <p style={{fontSize:"2vh"}}>{moment(item.album.release_date).fromNow()}</p>
            </div>

            </div>
            <div style={{width:"4vw"}}>
            <button onClick={()=>handlePlay(item.name,item.artists[0].name,item.duration_ms,item.preview_url,item.album.images[0].url )} className='height-none '>
              <AiFillPlayCircle size={50} className='text-green-500'/>
            </button>
            </div>
          </div>
        ))}
      </div>
            </div>
        </Sidebar>
  )}
  else
  {
    return(<h1>Loading</h1>)
  }
}

export default LikedSongs
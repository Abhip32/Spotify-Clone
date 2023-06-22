'use client'
import { getPlayingItem } from '@/utils/Home';
import { data } from 'autoprefixer';
import React,{useEffect, useState} from 'react';
import AudioPlayer from './AudioPlayer';

const Player = (props) => {
    if (typeof window !== "undefined") {
       
        const [songData,setSongData]=useState(JSON.parse(localStorage.getItem('spotify-data'))?.songData)
        useEffect(() => {
            const handleStorageChange = () => {
                getPlayingItem().then(async(data)=>{
                    let resposne=await data
                    console.log(resposne)
                    setSongData(resposne)
                })
            };
        
            window.addEventListener('storage', handleStorageChange);
          }, []);
        return (
            <>
                        
            <div className='player flex bg-zinc-900 h-full'>
                <div className='info' style={{width:"25vw",display:"flex",alignItems:"center"}}>
                {props.type !="mobile" && <img src={songData?.img ? songData.img : '/images/unknown.png'} style={{height:"10vh",width:"10vh",padding:"5px"}}/>}
                {props.type =="mobile" && <img src={songData?.img ? songData.img : '/images/unknown.png'} style={{height:"5vh",width:"5vh",padding:"5px"}}/>}
                    <div className='text-white font-semibold'>
                     {props.type !="mobile" &&    <span  style={{height:"50%", textOverflow:"ellipsis",fontSize:"2vh"}}>{songData?.name}</span>}
                     {props.type !="mobile" &&    <span  style={{height:"50%", textOverflow:"ellipsis",fontSize:"2vh"}}>{songData?.artist}</span>}
                    </div>
                </div>
                <AudioPlayer src={songData?.url} />
            </div>
            </>
        );
      }
      else
      return(
        <div>Loading</div>
      )

   
}

export default Player;





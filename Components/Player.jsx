'use client'
import { getPlayingItem } from '@/utils/Home';
import { data } from 'autoprefixer';
import React,{useEffect, useState} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import "./Player.css"

const Player = (props) => {
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
        <div className='player' style={{overflow:"hidden"}}>
            <div className='info'>
                <img src={songData?.img ? songData.img : '/images/unknown.png'} style={{height:"10vh",width:"10vh",padding:"10px"}}/>
                <div>
                 {props.type !="mobile" &&    <span className='font-semibold' style={{height:"50%", textOverflow:"ellipsis",fontSize:"2vh"}}>{songData?.name}</span>}
                </div>
            </div>
            <AudioPlayer autoPlay={false} src={songData?.url}/>
        </div>
    );
}

export default Player;





"use client"
import React from "react";

export default function Login() {
  const loginRedirect= async () => {
    const client_id = "f9a983b53ef148f9926dea5b4209cded";
    const api_uri = "https://accounts.spotify.com/authorize";
    const redirect_uri = "https://spotify-clone-abhip32.vercel.app/home"
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="flex flex-col p-18 items-center justify-center" style={{backgroundColor:"#1db954",minHeight:"100vh"}}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
        className="p-5"
      />
      <button className="bg-black p-5 m-5 text-white font-bold rounded-3xl w-1/2" onClick={loginRedirect}>Connect Spotify</button>
    </div>
  );
}


import * as React from 'react';
import { useState } from "react";
import './FavoritesList.css';

function FavoritesList(props){
    return (
        <div className='Favorites'>
            {Object.keys(props.favs).map((album_id, i) => (
                <AlbumCard
                    songs={props.favs[album_id]}
                    album_id = {album_id}
                    album_art = {props.albums[album_id].album_art}
                    songDict = {props.songs}
                    albumDict = {props.albums}
                />
            ))}
        </div>
    );
}

function AlbumCard(props) {
    if (props.songs.length > 0) {
        return (
            <div className="AlbumCard" key={props.album_id}>
                <div className='AlbumHeader' id={props.albumDict[props.album_id]['album']}>
                    <img src = {props.album_art}/>
                    <div className="Text">
                        <div className="AlbumTitle">
                            {props.albumDict[props.album_id]['album']}
                        </div>
                        <div className="AlbumArtist">
                            {props.albumDict[props.album_id]['artist']}
                        </div>
                    </div>
                </div>
                {props.songs.map((song_id, j) => 
                    <div className="AlbumSongCard">
                        {props.songDict[song_id]['name']}
                    </div>
                )}
            </div>
        )
    }
}


export default FavoritesList
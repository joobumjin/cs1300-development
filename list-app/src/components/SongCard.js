import * as React from 'react';
import { useState } from "react";
import './SongCard.css';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteButton from './FavButton';


function SongCard(props) {
    const [faved, setFaved] = useState(false);
    return (
        <div className="SongCard">
            <div className="album_pic">
                <img src = {props.img}/>
            </div>
            <div className="song_desc">
                <div className="name">
                    <p>{props.name}</p>
                </div>
                <div className="details">
                    <div className="artist">
                        <p>{props.artist}</p>
                    </div>
                    <CircleIcon />
                    <div className="album">
                        <p>{props.album}</p>
                    </div>
                </div>
                <div className="length">
                    {props.len} seconds
                </div>
            </div>
            <div className = "fav_button">
            <FavoriteButton 
                faved={faved} 
                setFaved={setFaved}
                favButton={props.favButton}
                unFavorite={props.unFav} 
                song_id = {props.song_id}
                cur_favs = {props.cur_favs} 
                album_id = {props.album_id}
            />
            </div>
        </div>
    );
}

export default SongCard;

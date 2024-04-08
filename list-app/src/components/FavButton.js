import * as React from 'react';
import { useState } from "react";
import IconButton from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function FavoriteButton(props) {
    const cur_album_favs = props.cur_favs[props.album_id] || [];
    
    if (cur_album_favs.includes(props.song_id)) {
        return (
            <IconButton 
                aria-label="unfavorite"
                onClick={() => {props.unFavorite(props.song_id, props.setFaved)}}
            >
                <FavoriteIcon />
            </IconButton>
        );
    } else {
        return (
            <IconButton 
                aria-label="favorite"
                onClick={() => {props.favButton(props.song_id, props.setFaved)}}
            >
                <FavoriteBorderIcon />
            </IconButton>
        )
    }
}

export default FavoriteButton;
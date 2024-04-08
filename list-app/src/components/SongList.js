import * as React from 'react';
import { useState } from "react";
import SongCard from './SongCard.js';
import CircleIcon from '@mui/icons-material/Circle';
import FavoriteButton from './FavButton';
import Grid from '@mui/material/Unstable_Grid2';


function SongList(props) {
    return (
    <Grid 
        container 
        rowSpacing={1}
        sx={{
            '--Grid-borderWidth': '1px',
            borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
            },
        }}    
        >

        {props.songList.map((item, index) => ( 
            <Grid item xs={12}>
            <SongCard 
                img={item.album_art} 
                name={item.name} 
                artist={item.artist} 
                album={item.album}
                album_id={item.album_id}
                song_id={item.song_id}
                len={item.length}
                cur_favs = {props.favs}
                favButton={props.add_new_fav}
                unFav={props.remove_fav}
                key={item.song_id}
            />
            </Grid>
        ))}
    </Grid>
    );
}

export default SongList;

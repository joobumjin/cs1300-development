import './App.css';
import { useState } from "react";
import './components/SongCard.css';
import songData from './assets/songs.json'
import albumData from './assets/albums.json'
import SongCard from './components/SongCard.js';
import SongList from './components/SongList.js';
import SortArtistButton from './components/SortArtistButton.js';
import ResetFavsButton from './components/ResetFavsButton.js';
import FavoritesList from './components/FavoritesList.js';
import Grid from '@mui/material/Unstable_Grid2';
import Slider from '@mui/material/Slider';

songData.forEach((item) => {
  item.album_art = process.env.PUBLIC_URL + "/" + item.album_art;
  console.log("item.album_art", item.album_art)
});

albumData.forEach((item) => {
  item.album_art = process.env.PUBLIC_URL + "/" + item.album_art;
});

const songDict = {};
songData.forEach((item) => {
  songDict[item.song_id] = item;
});

const albumDict = {};
albumData.forEach((item) => {
  albumDict[item.album_id] = item;
});

function App() {
  const [origSongs, setOrig] = useState(songData);
  const [songList, setSongs] = useState(songData);
  const [songCards, setCards] = useState(
    <Grid container rowSpacing={1}>
      {songList.map((item, index) => ( 
        <Grid item xs={12}>
          <SongCard img={item.album_art} name={item.name} artist={item.artist} album={item.album}></SongCard>
        </Grid>
      ))}
    </Grid>
  );
  const [sorting, setSorting] = useState(false);

  const sort_click = () => {
    // setOrig(origSongs.sort(function(a,b){return (a.artist< b.artist) ? -1 : (a.artist > b.artist) ? 1 : 0;}));
    // setSongs(origSongs);
    setSorting(true);
    console.log("sorting")
    update_cards(true);
  };
  const reset_cards = () => {
    // setOrig(origSongs.sort(function(a,b){return (a.song_id - b.song_id)}));
    // setSongs(origSongs);
    setSorting(false)
    console.log("reverting")
    update_cards(false);
  };

  const [len, setLen] = useState(273);

  const handleLenChange = (event, newValue) => {
    setLen(newValue);
    // console.log("filtering length to", newValue)
    // setSongs(origSongs.filter((song_item) => song_item.length < len));
    update_cards(sorting);
  };


  const update_cards = (sorting) =>  {
    console.log("Sorting Status", sorting)
    if (sorting) {
      console.log("doing the sorting")
      setOrig(origSongs.sort(function(a,b){return (a.artist< b.artist) ? -1 : (a.artist > b.artist) ? 1 : 0;}));
      setSongs(origSongs);
      setSongs(origSongs.filter((song_item) => song_item.length <= len));
    } else {
      console.log("not doing the sorting")
      setOrig(origSongs.sort(function(a,b){return (a.song_id - b.song_id)}));
      setSongs(origSongs);
      setSongs(origSongs.filter((song_item) => song_item.length <= len));
    }
  }

  const [favs, setFav] = useState({});

  const add_new_fav = (song_id, setFaved) => {
    const prev_favs = {...favs};
    const album_id = songDict[song_id].album_id;
    const album_songs = prev_favs[album_id] || [];
    var new_album_songs = {};
    new_album_songs[album_id] = album_songs.concat(song_id);

    delete prev_favs[album_id]

    setFav(
      {
        ... prev_favs,
        ... new_album_songs
      }
    )
    
    setFaved(true);
  } 

  const remove_fav = (song_id, setFaved) => {
    const prev_favs = {...favs};
    const album_id = songDict[song_id].album_id;
    var album_songs = prev_favs[album_id] || [];
    const ind_in_alb = album_songs.indexOf(song_id);
    album_songs.splice(ind_in_alb, 1);
    var new_album_songs = {};
    new_album_songs[album_id] = album_songs

    delete prev_favs[album_id]

    setFav(
      {
        ... prev_favs,
        ... new_album_songs
      }
    )
    setFaved(false);
  } 

  const clear_favs = () => {
    setFav({})
  }

  return (
    <div className="App">
      <div className = "mainBody">
        <div className = "fullList">
          <h1>
            Listen Now
          </h1>

          <div className="ArtistSort">
            <SortArtistButton
              sorted={sorting} 
              sort_click={sort_click} 
              reset_cards={reset_cards}
            />
          </div>

          <div className="Filters">
            <div className="LenFilter">
              Max Length: {len}
              <Slider aria-label="Length" value={len} min={134} max={273} onChange={handleLenChange} />
            </div>
          </div>

          <SongList
            songList = {songList}
            songData = {songData}
            favs = {favs}
            add_new_fav = {add_new_fav}
            remove_fav = {remove_fav}
          />
        </div>
        <div className = "favorites">
          <h1>
            Your Favorites
          </h1>

          <div className = "FavoriteReset">
            <ResetFavsButton 
              faved={Object.keys(favs).reduce(
                (accumulator, fav_album_key) => accumulator + favs[fav_album_key].length,
                0,) > 0} 
              clear={clear_favs}
            />
          </div>

          <div className = "FavList">
            <FavoritesList 
              favs={favs} 
              songs = {songDict}
              albums={albumDict}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

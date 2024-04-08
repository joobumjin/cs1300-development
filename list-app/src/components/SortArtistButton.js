import * as React from 'react';
import { useState } from "react";
import { Button} from '@mui/material';

function SortArtistButton(props) {
    const click_sort = () => {
        props.sort_click();
    };
    const click_reset = () => {
        props.reset_cards();
    };
    if (props.sorted) {
        return <div><Button onClick={() => click_reset()}>Reset Sort By Artist</Button></div>;
    } else {
        return <div><Button onClick={() => click_sort()}>Sort by Artist</Button></div>;
    }
}

export default SortArtistButton;


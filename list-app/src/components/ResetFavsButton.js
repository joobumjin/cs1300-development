import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

function ResetFavsButton(props) {
    if (props.faved) {
        return (
            <Button 
                aria-label="clear favorites"
                onClick={props.clear}
            >
                Clear Favorites<ClearIcon />
            </Button>
        );
    } else {
        return (
            <div/>
        )
    }
}

export default ResetFavsButton;
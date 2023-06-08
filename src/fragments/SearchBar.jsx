import { SearchField } from "../components/FormComponents";
import { Grid } from "@mui/material";
import {Typography} from "@mui/material";
import React, { useState, useEffect } from 'react';

const SearchBar = ({query, setQuery}) => {
    return (
        <Grid container justifyContent="center" >
            <Grid item container justifyContent="center" xs={12} style={{margin: "10 0 0 5"}}>
                <Grid item xs={6}>
                    <SearchField  query = {query} setQuery =  {setQuery} />
                </Grid>
            </Grid>
            <Grid item container justifyContent="center" xs={12} style={{margin: "5 0 0 5"}}>
                <Grid item xs={6}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        results shown for: {query}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}


const UnsafeSearchBar = ({query, setQuery}) => {

    return(
        <Grid container justifyContent="center" >
            <Grid item container justifyContent="center" xs={12} style={{margin: "10 0 0 5"}}>
                <Grid item xs={6}>
                    <SearchField  query = {query} setQuery =  {setQuery}/>
                </Grid>
            </Grid>
            <Grid item container justifyContent="center" xs={12} style={{margin: "5 0 0 5"}}>
                <Grid item xs={6}>
                    <div color="text.secondary" dangerouslySetInnerHTML={{__html: 'results shown for: ' + query}}/>
                </Grid>
            </Grid>
        </Grid>
    );

}

export {SearchBar, UnsafeSearchBar};
import { SearchField } from "../components/FormComponents";
import { Grid } from "@mui/material";
import {Typography} from "@mui/material";

const SearchBar = ({query, setQuery}) => {

    return(
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

export default SearchBar;
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Paper,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../Header';
import { Search, SearchIconWrapper, StyledInputBase, Item } from '../Styled';
import List from './List';
import { FavoriteList } from '../Favorites';
import { IRootState } from '../../store';
import { useGetRandomCocktails } from '../Hooks/useGetRandomCocktails';

const Home = () => {
  const { drinks, selectRandomSet, onSearchChange, isLoading } =
    useGetRandomCocktails();
  const favorites = useSelector((state: IRootState) => state.favorites);

  return (
    <Fragment>
      <Header />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12}>
          <div></div>
        </Grid>{' '}
        <Grid
          container
          item
          spacing={3}
          md={8}
          sx={{ position: 'relative', alignItems: 'start' }}
        >
          <Grid item xs={12}>
            <Item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={onSearchChange}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Grid
              item
              xs={4}
              container
              direction="row"
              justifyContent="left"
              alignItems="center"
            >
              <Button
                onClick={() => selectRandomSet()}
                variant="contained"
                data-testid="refresh"
              >
                <SyncIcon /> Refresh
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          {drinks.length > 0 ? (
            <Fragment>
              <List drinks={drinks} favorites={favorites} />
            </Fragment>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: '20vh',
                width: '100%',
                position: 'absolute',
              }}
            >
              <Paper>
                <Typography variant="h3" style={{ color: 'black' }}>
                  Not found ...
                </Typography>
              </Paper>
            </Box>
          )}
        </Grid>
        <Grid
          container
          item
          spacing={3}
          md={1}
          justifyContent="center"
          alignItems="center"
        >
          <Divider
            textAlign="center"
            orientation="vertical"
            variant="middle"
            flexItem
          ></Divider>
        </Grid>
        <Grid item md={3} xs={12}>
          <Grid container spacing={3} item xs={12}>
            <Grid item xs={12}>
              <Item>Favorites</Item>
            </Grid>
            {favorites && favorites.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" style={{ textAlign: 'center' }}>
                  Let's add some cocktails to your favorites!
                </Typography>
              </Grid>
            ) : (
              <FavoriteList favorites={favorites} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;

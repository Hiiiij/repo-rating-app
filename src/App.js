import React, { useState, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

// import mockData from './Data';
import { fetchRepositories } from './helpers/github-api-helpers';
import ListView from './components/ListView';
import { format, subDays } from 'date-fns';
import Filter from './components/Filter';
import './App.css';


const getFavorites = () => {
  const localStorageData = window.localStorage.getItem('favorites');
  const favoritedRepositories = localStorageData
    ? JSON.parse(localStorageData)
    : [];
  return favoritedRepositories;
};

const mapData = (data) => {
  const favoritedRepositories = getFavorites();
  
  
  return data.map(({ id, name, description, html_url, stargazers_count, language }) => {
    const isStarred = favoritedRepositories.some(
      (repository) => repository.id === id
    );
    return {
      id,
      name,
      description,
      url: html_url,
      gitHubStars: stargazers_count,
      isStarred: isStarred,
      language,
    };
  });
};

function App({ getMyStars }) {
  const [selectedTab, setSelectedTab] = useState('');
  // const handleChange = (val) => {
  //   setSelectedTab(val);
  // };
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const languages = new Set(repositories.map((repository) => repository.language).filter(lang => lang)); 

  const toggleFavorite = (item) => {
    let favorites = getFavorites();
    // if its already there remove it and if you're in the my favs tab, then re-render the favorites to remove it
    if (favorites.some((repo) => repo.id === item.id)) {
      // Remove Favorite
      favorites = favorites.filter((repo) => repo.id !== item.id);
      window.localStorage.setItem('favorites', JSON.stringify(favorites));

      if (selectedTab === 'My favorites') {
        // my favories tab --> set the list to the favorites only
        setRepositories(mapData(favorites));
      } else {
        // Week view tab
        // if its the other tab, re-render the repositories to update the "isStarred" property
        setRepositories(mapData(repositories));
      }
    } else {
      // Add favorite
      // if its not already in the favorites add it there then call
      // setRepositories / mapData to update the "isStarred" property with the new value from localStorage
      favorites.push(item);
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
      // update the starred list
      setRepositories(mapData(repositories));
    }
  };

  const handleFavoritesTabClicked = () => {
    setSelectedTab('My favorites');
    const favorites = getFavorites();
    setRepositories(mapData(favorites));
  };

  const handleBestOfTheWeekTabClicked = () => {
    console.log({ selectedTab });
    setSelectedTab('Best of the week');
    if (selectedTab === 'Best of the week') {
      // early return if the tab is already clicked
      return;
    } else {
      const sevenDaysAgo = subDays(new Date(), 7);
      const istoDate = sevenDaysAgo.toISOString();
      setLoading(true);
      fetchRepositories({
        sort: 'stars',
        order: 'desc',
        q: `created`:>${istoDate}`,
      }).then((repos) => {
        setLoading(false);
        setRepositories(mapData(repos.items));
      });
    }
  };

  useEffect(() => {
    handleBestOfTheWeekTabClicked();
  }, []);
  const handleStarClicked = (item) => (e) => {
    toggleFavorite(item);
  };

  return (
    <div className="App">
      <Jumbotron>
        <h1>Best of the week</h1>
        <h4>Your personal rating of the best repos of the week</h4>
      </Jumbotron>
      {isLoading && <h2>Loading...</h2>}
      <div style={{ marginBottom: '2rem' }}>
        <ToggleButtonGroup type="checkbox" value={[1]}>
          <ToggleButton onClick={handleBestOfTheWeekTabClicked} value={1}>
            Best of the week
          </ToggleButton>
          <ToggleButton onClick={handleFavoritesTabClicked} value={2}>
            My favourite
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <Filter languages={[...languages]} />
      </div>

      <ListView items={repositories} onStarClicked={handleStarClicked} />
    </div>
  );
}
export default App;



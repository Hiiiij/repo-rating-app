import axios from 'axios';

export async function fetchRepositories(params) {
  return axios
    .get('https://api.github.com/search/repositories', { params })
    .then((response) => response.data.items.map(repo => {
      return {
        id: repo.id,
        name: repo.name, 
        description: repo.description,
        url: repo.html_url,
        gitHubStars: repo.stargazers_count,
        language: repo.language,
      }
    }));
}

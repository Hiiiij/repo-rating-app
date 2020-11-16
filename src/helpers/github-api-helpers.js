import axios from 'axios';

export async function fetchRepositories(params) {
  return axios
    .get('https://api.github.com/search/repositories', { params })
    .then((response) => response.data);
}

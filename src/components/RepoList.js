import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './RepoList.css';

import IssuesList from './IssuesList'

let RepoList = (props) => {

  let [token, setToken] = useState(sessionStorage.getItem("token"));
  let [repos, setRepos] = useState(JSON.parse(sessionStorage.getItem("repos")) || []);
  let [selectedRepo, setSelectedRepo] = useState(JSON.parse(sessionStorage.getItem("selectedRepo")));

  useEffect(() => {
    if (!token) {
      let promptToken = prompt("What's your Github API key?");
      sessionStorage.setItem('token', promptToken);
      setToken(promptToken);
    }
}, [])

  useEffect(() => {
    if (token) {
      getRepos(token)
      .then(repos => {
        setRepos(repos)
        sessionStorage.setItem('repos', JSON.stringify(repos));
      });
    }
  }, [token])

  return (
    <div className="app-container">
      <div className="repo-container">
        <ul style={{ listStyle: 'none' }}>
        {
          repos.map((repo) => (
            <li key={repo.id} 
                onClick={(event) => {
                  setSelectedRepo(repo)
                  sessionStorage.setItem('selectedRepo', JSON.stringify(repo));
                }}>
              {repo.name}
            </li>
          ))
        }
        </ul>
      </div>
      {
        selectedRepo && <IssuesList token={token} repo={selectedRepo}/>
      }
    </div>
  );
}

async function getRepos(apiKey) {
  let response = await axios.get("https://api.github.com/user/repos", {
    headers: { 'Authorization': `token ${apiKey}` },
    params: { 
      per_page: 10,
      sort: "created",
    }
  })
  
  return response.data;
}

export default RepoList;

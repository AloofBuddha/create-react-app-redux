import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './RepoList.css';

import IssuesList from './IssuesList'

let RepoList = (props) => {

    // let apiKey = prompt("What's your Github API key?");
  // DEBUG ONLY!
  let token = "05e2a3655f706f69f0cd4182b35954d3f939edbd";

  let [repos, setRepos] = useState([]);
  let [selectedRepo, setselectedRepo] = useState(null);

  useEffect(() => {
      getRepos(token)
      .then(repos => setRepos(repos));
  }, [token])

  return (
    <div className="app-container">
      <div className="repo-container">
        <ul style={{ listStyle: 'none' }}>
        {
          repos.map((repo) => (
            <li key={repo.id} 
                onClick={(event) => setselectedRepo(repo)}
            >
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
  let repos = await axios.get("https://api.github.com/user/repos", {
    headers: { 'Authorization': `token ${apiKey}` },
    params: { 
      per_page: 10,
      sort: "created",
    }
  })

  return repos.data;
}

export default RepoList;

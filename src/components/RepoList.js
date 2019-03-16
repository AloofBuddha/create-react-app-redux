import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RepoList.css';

let RepoList = (props) => {

  let [repos, setRepos] = useState([]);
  let [selectedRepo, setselectedRepo] = useState(null);
  let [issues, setIssues] = useState([]);

  useEffect(() => {
      getRepos(apiKey)
      .then(repos => setRepos(repos));
  }, [apiKey])

  useEffect(() => {
    if (selectedRepo) {
      getIssues(apiKey, selectedRepo)
      .then(issues => setIssues(issues));
    }
}, [selectedRepo])

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
        selectedRepo &&
        <div className="issues-container">
          <ul style={{ listStyle: 'none' }}>
          {
            selectedRepo.id
          }
          </ul>
        </div>
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

  console.log(repos.data)
  return repos.data;
} 

async function getIssues(apiKey, repo) {
  let issues = await axios.get(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues`, {
    headers: { 'Authorization': `token ${apiKey}` },
    params: { 
      sort: "created",
      per_page: 10
    }
  })

  console.log('issues', issues.data);

  return issues.data;
}

export default RepoList;

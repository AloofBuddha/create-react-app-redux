import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import './IssuesList.css';

let IssuesList = ({ token, repo }) => {
  let [issues, setIssues] = useState(JSON.parse(sessionStorage.getItem("issues")) || []);
  let [sort, setSort] = useState(sessionStorage.getItem("sort") || "created");
  let [direction, setDirection] = useState(sessionStorage.getItem("direction") || "desc");

  useEffect(() => {
      getIssues(token, repo, sort, direction)
      .then(issues => {
        setIssues(issues);
        sessionStorage.setItem('issues', JSON.stringify(issues));
      });
    }, [token, repo, sort, direction])


  return (
    <div className="issues-container">
      <ul style={{ listStyle: 'none' }}>
        <li>
          <span>Avatar</span>
          <span>name</span>
          <button onClick={() => {
            setSort("created")
            sessionStorage.setItem('sort', "created");
            setDirection(direction === 'asc' ? 'desc' : 'asc') 
            sessionStorage.setItem('direction', direction === 'asc' ? 'desc' : 'asc');         
          }}>Created At ({direction})</button>
          <button onClick={() => {
            setSort("updated")
            sessionStorage.setItem('sort', "updated");
            setDirection(direction === 'asc' ? 'desc' : 'asc')
            sessionStorage.setItem('direction', direction === 'asc' ? 'desc' : 'asc');        
          }}>Updated At ({direction})</button>
        </li>
        {
        issues.map(issue => (
            <li key={issue.id}>
            {
              issue.assignee && 
              <img src={issue.assignee.avatar_url} width="40" height="40" alt="assignee avatar url"/>
            }
              <span>{issue.title}</span>
              <span>{moment(issue.created_at).format("DD/MM/YYYY")}</span>
              <span>{moment(issue.updated_at).fromNow()}</span>
            </li>
        ))
        }
      </ul>
    </div>
  );
}

async function getIssues(apiKey, repo, sort, direction) {
  let response = await axios.get(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues`, {
    headers: { 'Authorization': `token ${apiKey}` },
    params: { 
      sort,
      direction,
    }
  })

  return response.data;
}

export default IssuesList;
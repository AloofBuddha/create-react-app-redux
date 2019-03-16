import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import './IssuesList.css';

let IssuesList = ({ token, repo }) => {
  let [issues, setIssues] = useState([]);

  useEffect(() => {
      getIssues(token, repo)
      .then(issues => setIssues(issues));
    }, [token, repo])


  return (
    <div className="issues-container">
      <ul style={{ listStyle: 'none' }}>
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

async function getIssues(apiKey, repo) {
  let issues = await axios.get(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues`, {
    headers: { 'Authorization': `token ${apiKey}` },
  })

  return issues.data;
}

export default IssuesList;
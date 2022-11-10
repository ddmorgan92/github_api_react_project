
import './App.css';
import { useEffect, useState } from "react";

function GithubUser({userData, updateUser, username, handleChange, repoData}) {

  return(
    <div id="primaryContainer">
      <div id="userInfo">
        <img src={userData.avatar_url} alt="user avatar"></img>
        <h1>{userData.name}</h1>
        <a href={userData.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
        <h3>User Since {new Date(userData.created_at).getFullYear()}</h3>
        <label>Search for Another User:</label>
        <input 
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />
        <button id="searchBtn" onClick={updateUser}>Search</button>
      </div>
      <GithubUserRepos repoData={repoData}/>
    </div>
  );
}

function GithubUserRepos({repoData}) {
  console.log(repoData)
  if(repoData){
    return(
      <div id="repos">
        {repoData.map(repo => 
          <div className='repoInfo'>
            <h3 className='repoTitle'><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a></h3>
            <ul>
              <li>{repo.fork ? "This is a fork" : "Not a fork"}</li>
              <li>Date Created: {new Date(repo.created_at).toLocaleDateString()}</li>
              <li>Last Updated: {new Date(repo.updated_at).toLocaleDateString()}</li>
              <li>Open Issues: {repo.open_issues_count}</li>
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return(
      <div>
  
      </div>
    );
  }
}

function App() {
  const[userData, setUserData] = useState(null);
  const[repoData, setRepoData] = useState(null);
  const[username, setUsername] = useState("ddmorgan92");
  const handleChange = e => {
    setUsername(e.target.value);
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/ddmorgan92`)
    .then((response) => response.json())
    .then((userData) => setUserData(userData));

    fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((repoData) => setRepoData(repoData));
  }, []);

  function updateUser(){
    fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((userData) => setUserData(userData));

    fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((repoData) => setRepoData(repoData));
  };

  if(userData){
    return(
      <GithubUser userData={userData} updateUser={updateUser} handleChange={handleChange} username={username} repoData={repoData}/>
    );
  }

  return (
    <h1>Data</h1>
  );
}

export default App;

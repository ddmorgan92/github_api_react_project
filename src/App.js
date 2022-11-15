import "./App.css";
import { useEffect, useState } from "react";

function GithubUser({
  userData,
  updateUser,
  username,
  handleChange,
  repoData,
}) {

  if(userData?.message){
    return (
      <div id="primaryContainer">
        <div id="userInfo">
          <h1>GitHub User Lookup</h1>
          <label>Search for a User:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={username}
          />
          <button id="searchBtn" onClick={updateUser}>
            Search
          </button>
        </div>
        <GithubUserRepos repoData={repoData} />
      </div>
    );
  } else {
    return (
      <div id="primaryContainer">
        <div id="userInfo">
          <img src={userData.avatar_url ? userData.avatar_url : process.env.PUBLIC_URL + "/avatar.jpg"} alt="user avatar"></img>
          <h1>{userData.name? userData.name : "User Not Found"}</h1>
          <a href={userData.html_url} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
          <h3>User Since {new Date(userData.created_at).getFullYear()}</h3>
          <label>Search for Another User:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={username}
          />
          <button id="searchBtn" onClick={updateUser}>
            Search
          </button>
        </div>
        <GithubUserRepos repoData={repoData} />
      </div>
    );
  }
}

function GithubUserRepos({ repoData }) {
  if (!repoData?.message) {
    return (
      <div id="repos">
        {repoData.map((repo) => (
          <div className="repoInfo">
            <h3 className="repoTitle">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
            </h3>
            <ul>
              <li>{repo.fork ? "This is a fork" : "Not a fork"}</li>
              <li>
                Date Created: {new Date(repo.created_at).toLocaleDateString()}
              </li>
              <li>
                Last Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </li>
              <li>Open Issues: {repo.open_issues_count}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}

function App() {
  const [userData, setUserData] = useState({message: "User not found"});
  const [repoData, setRepoData] = useState({message: "User not found"});
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  function updateUser() {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((userData) => setUserData(userData))
      .catch(setError);

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((repoData) => setRepoData(repoData))
      .then(() => setLoading(false))
      .catch(setError);
  }

  if(loading) return <div id="primaryContainer"><h1 id="loading">Loading...</h1></div>;
  if(error) return <pre>{JSON.stringify(error)}</pre>;
  if(!userData) return null;

  return (
    <GithubUser
      userData={userData}
      updateUser={updateUser}
      handleChange={handleChange}
      username={username}
      repoData={repoData}
    />
  );
}

export default App;

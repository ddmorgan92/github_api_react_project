
import './App.css';
import { useState, useEffect } from "react";

function GithubUser({userData}) {
  return(
    <div>
      <img src={userData.avatar_url} alt="user avatar"></img>
      <h1>{userData.name}</h1>
      <a href={userData.html_url} target="_blank" rel="noreferrer">GitHub Profile</a>
      <h1>User Since {new Date(userData.created_at).getFullYear()}</h1>
    </div>
  );
}

function App() {
  const[data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/ddmorgan92`)
    .then((response) => response.json())
    .then((data) => setData(data));
  }, []);

  

  if(data){
    return(
      <GithubUser userData={data} />
    );
  }

  return (
    <h1>Data</h1>
  );
}

export default App;

import React,{useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image,setimage] = useState([]);
  let api01="https://api.unsplash.com/search/collections?page=1&per_page=25&orientation=squarish&query=";
  const [keyword,setkeyword]=useState('');
  let api02="&client_id=dVso0OdCflrQXO9sq9wp5FtmYBltKMqpm6CZziE3sPM";
  
  const getImage=()=>{
    axios.get(api01+keyword+api02)
    .then((response)=>{
      setimage(response.data.results);
    })
  }

  const changehandler=(e)=>{
    e.preventDefault();
    
    setkeyword(e.target.value);
    
  }
  return (
    <div className="App">
      <div className='searchfield'>
      <h2>Unsplash Image Search </h2>
      <form onSubmit={changehandler}>

      <input type="text" placeholder="Enter the keyword" value={keyword} onChange={changehandler}/>
      <button onClick={getImage}>Search</button>
      </form>
      </div>
      


      <div className='imagedisplay'>
        {
          image.map((value,index)=>{
            return(

              <div key={index} className='image00'>
                <div className='coverphoto'>
                   <img src={value.cover_photo.urls.small} alt="images"/>
                </div>
                <div className='user'>
                  <img src={value.user.profile_image.medium} className="userpro" alt='userlogo'/>
                  <div className='likes00'>{value.user.total_likes}<img src='like.png' alt='likes'/></div>
                  <div className='name'>{value.user.username}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    
  );
}

export default App;

import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [image,setimage] = useState([]);
  const [page,setpage] = useState(1);
  const [keyword,setkeyword]=useState('');

  const hello=(page,keyword)=>{
    return `https://api.unsplash.com/search/collections?page=${page}1&per_page=15&orientation=squarish&query=${keyword}&client_id=dVso0OdCflrQXO9sq9wp5FtmYBltKMqpm6CZziE3sPM`;
  }
  // const api01="https://api.unsplash.com/search/collections?page="+{page}+"1&per_page=15&orientation=squarish&query=";
  // const api02="&client_id=dVso0OdCflrQXO9sq9wp5FtmYBltKMqpm6CZziE3sPM";
  
  const getImage=()=>{
    axios.get(hello(page,keyword))
    .then((response)=>{
      setimage(response.data.results);
    })
   
  }
  useEffect(()=>{
    getImage();
  },[page])

  // const changehandler=(e)=>{
  //   e.preventDefault();
  //   setkeyword(e.target.value);
  // }

  const handleChange=(e)=>{
    e.preventDefault();
    setkeyword(e.target.value);
  }
  const prevpage=()=>{
    if(page>1)
    {
      setpage(page-1);
      // changehandler();
    }
  }
  const nextpage=()=>{
    setpage(page+1);
    // changehandler();
  }
 
  
return (
    <div className="App">
      <div className='searchfield'>
      <h2>Unsplash Image Search </h2>
      <div className="form" onSubmit={getImage}>
      <input type="text" placeholder="Enter the keyword" value={keyword} onChange={handleChange} className="inputt"/>
      <button onClick={getImage} type="button">Search</button>
      </div>
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
      <div className='pagination'>
        <button onClick={prevpage}>Previous Page</button>
        {page}
        <button onClick={nextpage}>Next page</button>
      </div>
    </div>
  );
}
export default App;

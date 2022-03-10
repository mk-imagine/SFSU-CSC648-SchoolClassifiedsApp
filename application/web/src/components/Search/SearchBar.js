import {React, useState,useEffect}  from "react";

const Search = () => {

    const [searchInput,setSearchInput] = useState("");
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
     
      return (
      
    <div className="search">
    <input
       
       placeholder={"Search Here"}
       onChange={handleChange}
       value={searchInput} 
       />
    
    
    </div>
      )
    };
    
    export default Search;
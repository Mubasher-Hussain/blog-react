import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "../auth/axiosConfig";


// Displays All Blogs or specific by author
export function BlogsList({match}) {
  const author = match.params.author;
  const [blogsList, setBlogsList] = useState();
  const baseURL = 'blogs/api/post_list';
  let url = baseURL + '/' + author;
  
  function displayList(){
      
    if (blogsList && blogsList.length){
      return blogsList.map((blog)=>{
        return <div style={{border:'1px solid black', marginBottom:'5px'}}>
          <p>Author: <NavLink to={'../blogsList/' + blog.author} >{blog.author}</NavLink></p>
          <p>Title: <NavLink to={'../blogDetails/' + blog.id} >{blog.title}</NavLink></p>
          <p>Modified At: { blog.updated_at }</p>
          <p>Created At: { blog.created_at }</p>            
        </div>
    })}
  }
  
  useEffect(() => {
    if (!author){
      url = baseURL;
    }
    axios
    .get(url)
    .then(res => {
      setBlogsList(res.data);
    })
    .catch( (error) => alert(error))  
  }, [author])
  
  return (
    <div class='blogList'>
      <h1>{author} Blog Post List</h1>
        <div >
          { displayList()}
        </div>
        
    </div>
  )
}
  
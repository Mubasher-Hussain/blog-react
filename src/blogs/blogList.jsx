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
        return <li>
          <p>Author: <NavLink to={'../blogsList/' + blog.author} >{blog.author}</NavLink></p>
          <p>Title: <NavLink to={'../blogDetails/' + blog.id} >{blog.title}</NavLink></p>
          <p>Modified At: { blog.updated_at }</p>
          <p>Created At: { blog.created_at }</p>            
        </li>
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
    <div class="container py-5">
      <h1>{author} Blog Post List</h1>
        <ul>
          { displayList()}
        </ul>
        <NavLink to='../createPost'>Create New Blog</NavLink>
    </div>
  )
}
  
import React, { useEffect, useState } from "react";
import {
  NavLink,
  useHistory,
} from "react-router-dom";

import axios from "../auth/axiosConfig";
import { useAuth } from "../auth"


// Display Details of Blog and its comments
export function BlogDetails({match}) {
  const pk = match.params.pk;
  const history = useHistory();
  const [logged] = useAuth();
  const [blogDetails, setBlogDetails] = useState({ post: null, comment_list: null, isAuth: '' });

  useEffect(async() => {
    const blogData = await axios(
      `blogs/api/post_detail/${pk}`
    );
    const commentData = await axios(
      `blogs/api/comment_detail/${pk}`
    )
    setBlogDetails({ post: blogData.data.post, comment_list: commentData.data, isAuth: blogData.data.isAuth })
  
  }, [])
  
  function deletePost(){
    let url = 'blogs/api/post_delete/';
    axios
    .delete(url+pk)
    .then(res => {
      history.goBack();
    })
    .catch( (error) => alert(error))
  }
  
  function displayDetail(){
    if (blogDetails && blogDetails.post){
      return (
        <div>
          <p>Author: <NavLink to={'../blogsList/' + blogDetails.post.author} >{blogDetails.post.author}</NavLink></p>
          <p>Title: {blogDetails.post.title}</p>
          <p>Content: { blogDetails.post.content }</p>
          <p>Modified At: { blogDetails.post.updated_at }</p>
          <p>Created At: { blogDetails.post.created_at }</p>
          {blogDetails.isAuth && (
            <p>
              <button className='btn' onClick={() => 
                history.push({pathname: `../editPost/${pk}`,
                              query: {title: blogDetails.post.title,
                                      content: blogDetails.post.content,}
                             })
                             }>
                Edit
              </button>
              <button type="button" className="btn" onClick={deletePost}>
              Delete
              </button>
            </p>
          )}            
        </div>
      )
    }
  }
  
  function displayComment(){
    if (blogDetails && blogDetails.comment_list){
      return blogDetails.comment_list.map((comment)=>{
        return <Comment comment={ comment } />
    })}
  }
  
  function createComment(){
    let comment = document.querySelector('.comment').value;
    axios
    .post(`blogs/api/create_comment/${pk}`, {'content': comment})
    .then(res => {
      history.go(0);
    })
    .catch( (error) => alert(error))
  }
  
  return (
    <div class="container mt-5 mb-5 blogList ">
      <h1>Blog Post Detail</h1>
      <div class='container'>
        { displayDetail()}
      </div>
      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-7">
          <div class="card">
            <div class="p-3">
              <h6>Comments</h6>
            </div>
            {logged && 
            <div class="mt-3 d-flex flex-row align-items-center p-3 form-color">
              <input type="text" class="comment" name='comment' placeholder="Login to enter comment..."/>
              <button class="btn btn-primary" type="submit" onClick={createComment}>Submit</button>
            </div>}
            {!logged && <p>Login to comment</p>}
            { displayComment() }
          </div>
        </div>
      </div>
    </div>
  )
}

 
function Comment(params){
  
  return(
    <div style={{border:'1px solid black', marginBottom:'5px'}}>
      <div class="d-flex flex-row p-3">
        <div class="w-100">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-row align-items-center">
              <span class="mr-2">{params.comment.commentator}</span>
            </div>
            <small>{params.comment.created_at}</small>
          </div>
          <p class="text-justify comment-text mb-0">{params.comment.content}</p>
        </div>
      </div>                     
    </div>
  )
} 
  
import React from "react";


// Title and content field for creating or editing a blog
export class BlogFormat extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      blogData: {
        title: '',
        content: '',
      },
    };  
  }
  
  componentDidMount(){
    if (this.props.blogData){
      let newdata = this.props.blogData;
      this.setState({
        blogData: newdata,
      })
    }
  }
  
  handleInputChange(event) {
    let blogData=this.state.blogData;
    blogData[event.target.name]=event.target.value;
    this.setState({
      blogData: blogData
    });
  }
  
  render(){
    return (
      <div className="form">
        <p>
          <label htmlFor="title">Title</label>
          <input type="text"
            name="title"
            placeholder="Title"
            value={this.state.blogData.title}
            onChange={this.handleInputChange.bind(this)}
          />
        </p>
        <p>
          <label htmlFor="content">Content</label>
          <input type="text"
            name="content"
            placeholder="content"
            value={this.state.blogData.content}
            onChange={this.handleInputChange.bind(this)}
           />
        </p>
        <button type="button" className="btn" onClick={() => this.props.handleClick(this.state.blogData)}>
        Submit
        </button>
      </div>
    );
  }
}

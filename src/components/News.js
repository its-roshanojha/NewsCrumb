import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  constructor(){
    super();
    console.log("constructor from news component");
    this.state = {
      articles: [],
      loading: false
    }
  }
 async componentDidMount(){ // async function can wait for a promise to resolve
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3c64745efc67492f8212eeb3a38b5d4a";

    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json()  //its a promise that the data could be parsed into json or converted into text..
    this.setState({articles: parsedData.articles}) // 
    console.log(parsedData);
  }
  render() {
    return (
      <div className='container my-3'>
        <h2>NewsCrumb - Top Headlines</h2>
        <div className='row'>
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url} >
          <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
        </div>
        
        })}
         </div>
      </div>
    )
  }
}

export default News
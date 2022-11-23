import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    // async function can wait for a promise to resolve
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3c64745efc67492f8212eeb3a38b5d4a&page=1pageSize=20";

    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json(); //its a promise that the data could be parsed into json or converted into text..
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults}); //
    console.log(parsedData);
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3c64745efc67492f8212eeb3a38b5d4a&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    // console.log(data);
    let parsedData = await data.json(); //its a promise that the data could be parsed into json or converted into text..

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {


    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3c64745efc67492f8212eeb3a38b5d4a&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      // console.log(data);
      let parsedData = await data.json(); //its a promise that the data could be parsed into json or converted into text..
  
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
   
  };
  render() {
    return (
      <div className="container my-3">
        <h2>NewsCrumb - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-3 px-4"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark mx-3 px-4"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
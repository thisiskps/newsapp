import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // articles = [
  //   {
  //     source: { id: "four-four-two", name: "FourFourTwo" },
  //     author: "Ryan Dabbs",
  //     title:
  //       "Who is football's richest player? Faiq Bolkiah is worth £16bn and currently plays in Thailand",
  //     description:
  //       "Not even Cristiano Ronaldo's salary in Saudi Arabia can match the Brunei international's wealth",
  //     url: "https://www.fourfourtwo.com/news/who-is-footballs-richest-player-faiq-bolkiah-is-worth-pound16bn-and-currently-plays-in-thailand",
  //     urlToImage:
  //       "https://cdn.mos.cms.futurecdn.net/buWxokRwiwWjcPjLxisWa5-1200-80.jpg",
  //     publishedAt: "2023-05-17T18:00:26Z",
  //     content:
  //       "On the face of it, Chonburi seem an unremarkable club, spending most of their time bobbing about in mid-table in Thailand’s top flight. \r\nBut for the past two seasons, they’ve reportedly had the worl… [+2250 chars]",
  //   },
  //   {
  //     source: { id: "fox-sports", name: "Fox Sports" },
  //     author: null,
  //     title:
  //       "Air Noland vs. Jadyn Davis: All eyes on future Ohio state-Michigan QB rivalry",
  //     description:
  //       'A new chapter in college football’s fiercest rivalry appears to be taking shape surrounding two QBs looking to put their own stamp on “The Game" in the near future.',
  //     url: "http://www.foxsports.com/stories/college-football/air-noland-jadyn-davis-all-eyes-on-future-ohio-state-michigan-qb-rivalry",
  //     urlToImage:
  //       "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/05/1408/814/05.17.23_NolandDavis_OSUMICH_Horizontal.jpg?ve=1&tl=1",
  //     publishedAt: "2023-05-17T17:55:25Z",
  //     content:
  //       'Ask any Michigan or Ohio state fan about their favorite memory in the storied college football rivalry and you will likely receive a wide range of answers.\r\nThere was Charles Woodsons "Heisman Game" … [+3409 chars]',
  //   },
  //   {
  //     source: { id: "fox-sports", name: "Fox Sports" },
  //     author: null,
  //     title:
  //       "FBS players reportedly will appear in new 'EA Sports College Football' video game",
  //     description:
  //       "Players will have the option to allow EA Sports to use their likeness in the game that is scheduled to be released in the summer of 2024.",
  //     url: "http://www.foxsports.com/stories/college-football/fbs-players-reportedly-will-appear-in-new-ea-sports-college-football-video-game",
  //     urlToImage:
  //       "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/05/1408/814/EA-Sports.jpg?ve=1&tl=1",
  //     publishedAt: "2023-05-17T17:36:30Z",
  //     content:
  //       'College football fans might have the possibility to play with their favorite players when the next video game is released. \r\nEA Sports has contracted with OneTeam Partners to help "facilitate" FBS pl… [+2270 chars]',
  //   },
  //   {
  //     source: { id: "bbc-sport", name: "BBC Sport" },
  //     author: null,
  //     title: "Toney banned for eight months over betting",
  //     description:
  //       "Brentford striker Ivan Toney is banned from football for eight months after he accepted breaking Football Association betting rules.",
  //     url: "http://www.bbc.co.uk/sport/football/65626690",
  //     urlToImage:
  //       "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/E8D6/production/_129760695_gettyimages-1252794577.jpg",
  //     publishedAt: "2023-05-17T16:52:18.4155239Z",
  //     content:
  //       "Ivan Toney last played for Brentford against Liverpool at Anfield on 6 May\r\nBrentford striker Ivan Toney has been banned from football for eight months after he accepted breaking Football Association… [+1756 chars]",
  //   },
  //   {
  //     source: { id: "espn", name: "ESPN" },
  //     author: "ESPN",
  //     title:
  //       "Ivan Toney suspended for eight months over betting breaches - ESPN",
  //     description:
  //       "Brentford striker Ivan Toney has been suspended from all football-related activities for eight months, the FA announced Wednesday.",
  //     url: "https://www.espn.com/soccer/brentford/story/4950374/brentfords-ivan-toney-suspended-from-football-for-8-months-over-betting-breaches",
  //     urlToImage:
  //       "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0314%2Fr1144256_1296x729_16%2D9.jpg",
  //     publishedAt: "2023-05-17T16:16:00Z",
  //     content:
  //       "May 17, 2023, 12:16 PM ET\r\nIvan Toney has been one of the best strikers in the Premier League this season. Photo by Alex Livesey/Getty Images\r\nBrentford striker Ivan Toney has been suspended from all… [+1606 chars]",
  //   },
  //   {
  //     source: { id: "espn", name: "ESPN" },
  //     author: "Chris Low",
  //     title:
  //       "Emmanuel Okoye goes from Nigeria to NFL Academy to Vols commit - ESPN",
  //     description:
  //       "Emmanuel Okoye, who has three games of football experience through the NFL Academy, has committed to play college football at Tennessee.",
  //     url: "https://www.espn.com/college-football/story/_/id/37668211/emmanuel-okoye-goes-nigeria-nfl-academy-vols-commit",
  //     urlToImage:
  //       "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1023%2Fr1080325_1296x729_16%2D9.jpg",
  //     publishedAt: "2023-05-17T13:00:05Z",
  //     content:
  //       "Emmanuel Okoye, who grew up in Lagos, Nigeria, and was most recently a part of the NFL Academy program in England, said Wednesday that he plans to play college football at Tennessee.\r\nThe 6-foot-5, 2… [+3265 chars]",
  //   },
  //   {
  //     source: { id: "four-four-two", name: "FourFourTwo" },
  //     author: "Ryan Dabbs",
  //     title:
  //       "Wrexham now worth 300% more than when Ryan Reynolds and Rob McElhenney bought the club",
  //     description:
  //       "Research from Saxo Bank has revealed the Hollywood duo have massively increased the wealth of the club as they prepare for a Football League return",
  //     url: "https://www.fourfourtwo.com/news/wrexham-now-worth-300-more-than-when-ryan-reynolds-and-rob-mcelhenney-bought-the-club",
  //     urlToImage:
  //       "https://cdn.mos.cms.futurecdn.net/DroptJDNzSkFJv2J3RhdM4-1200-80.jpg",
  //     publishedAt: "2023-05-16T16:58:31Z",
  //     content:
  //       "Wrexham have recently been crowned National League champions, and research conducted by investment bank Saxo (opens in new tab) has revealed that Ryan Reynolds and Rob McElhenney's initial £2 million… [+2564 chars]",
  //   },
  //   {
  //     source: { id: "espn-cric-info", name: "ESPN Cric Info" },
  //     author: null,
  //     title:
  //       "Five famous people (and one cat) you didn't know have ESPNcricinfo profiles | ESPNcricinfo.com",
  //     description:
  //       "Why do a footballer, a Nobel laureate and a prime minister (no, not Imran Khan) find themselves in the ESPNcricinfo player database? | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/29102695/five-famous-people-one-cat-know-espncricinfo-profiles",
  //     urlToImage:
  //       "https://a.espncdn.com/i/cricket/cricinfo/1221668_1296x1296.gif",
  //     publishedAt: "2020-04-27T07:20:43Z",
  //     content:
  //       "Why do a cat, a footballer, a Nobel laureate and a prime minister find themselves in the ESPNcricinfo database? Here are six player profiles you wouldn't have expected we had.\r\nPeter the catThe only … [+5504 chars]",
  //   },
  // ];


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: this.articles,
  //     loading: true,
  //     page: 1,
  //     totalResults : 0,
  //   };
  //   document.title = `${props.category} - InShots`;
  // }

  const updateNews=async()=> {
    props.setProgress(10);
    setLoading(true)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a89b9d55f8a747e5be2a912adde45065&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    updateNews()
  }, [])
  
  // async componentDidMount() {
  //   this.updateNews();
  // }

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
    // this.setState({loading : true})
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a89b9d55f8a747e5be2a912adde45065&${this.state.page-1}&pageSize=${props.pageSize}`;
    // let data= await fetch(url);
    // let parsedData= await data.json()
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles, page: this.state.page-1})
    // this.setState({loading : false})
  
  // const handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();

    // console.log("Next")
    // this.setState({loading : true})
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a89b9d55f8a747e5be2a912adde45065&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //   let data= await fetch(url);
    //   let parsedData= await data.json()
    //   this.setState({articles: parsedData.articles, page: this.state.page+1})
    //   this.setState({loading : false})
  // };

  const fetchMoreData = async() => {
    // this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a89b9d55f8a747e5be2a912adde45065&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // this.setState({ 
    //   articles: this.state.,
    //   page: this.state.page,
    //   totalResults: ,
    // });
    // this.setState({ loading: false });
    
  };

    return (
      <>
        
        <h1 className="text-center " style={{margin: '35px 0px' , marginTop:'90px'}}>
          InShots - Headlines of {props.category} category
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}

        >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      {/* </div> */}
      </>
    );
    News.defaultProps = {
      country: "in",
      pageSize: 5,
      category: "general",
    };
    News.propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    };
  };
export default News;



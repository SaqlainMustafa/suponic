import React from 'react';
import Header from '../comman/Header';
import querySearch from "stringquery";
class NoticeAndNews extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        loggedIn:true,
        pageLoaded:true,
        data:[{
            "id":"01",
            "headline":"Providing the specialized game development expertise that you needed the most.",
            "content":"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, obcaecati. Maiores, pariatur necessitatibus officia tenetur id itaque tempora molestias, doloremque quibusdam architecto, quam vel hic ut nemo? Dolores, ab suscipit."
        },
        {
            "id":"02",
            "headline":"SGC removes the problem gamers are facing while playing use the SGC wallet to play games",
            "content":"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis delectus quam illum, quibusdam tempora animi atque molestias ea modi, rem doloribus cumque dolores quas at fuga unde doloremque exercitationem ducimus id facilis! Necessitatibus non amet officia unde asperiores eos quae exercitationem dignissimos, reiciendis, recusandae sint explicabo minus voluptatem a culpa."
        },
        {
            "id":"03",
            "headline":"Proving the best games to play 500+ games of all time categories. Having the access to SGC.",
            "content":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi laborum doloribus maiores necessitatibus voluptas qui et cupiditate corrupti earum quos."
        }],
        id:'01',
        defaultdata:''
      }

      setTimeout(() => {
        this.setState({pageLoaded:false})
      }, 300);
      
    }
  
    componentDidMount(){
        var query = querySearch(this.props.location.search);
      this.state.data.forEach(element => {
          if(element.id===query.id){
              this.setState({defaultdata:element})
          }
      });
      this.setState({id:query.id})
    }
  
    render() {
      return (
        <div id="app">
            {this.state.pageLoaded && 
                <div name='fade'>
                <div id="preloader-wrapper">
                    <img src="images/preloader.svg" alt="" className="preloader" />
                </div>
                </div>
            }
            <Header loggedIn={this.state.loggedIn} />
            <section className="notice-and-news container">
                <h1 className="title text-white font-bold">Notice <br/><span className="text-yellow has-half-underline">& News</span></h1>
                <div className="content">
                    <h2 className="text-white font-bold">{this.state.defaultdata.headline}</h2>
                    <p className="text-muted">{this.state.defaultdata.content}</p>
                    {/* <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum est perspiciatis ipsam! Laudantium consequuntur recusandae a veritatis qui nemo ex.</p> */}
                </div>
            </section>
		
	    </div>
      );
    }
}

export default NoticeAndNews;

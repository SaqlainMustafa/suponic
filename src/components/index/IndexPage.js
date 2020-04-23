import React, { Component } from 'react';
import Services from '../../shared/Services.js';
import Flickity from 'flickity';
import BtnDiagonal from '../comman/BtnDiagonal';
import MainBannerNavItem from '../comman/MainBannerNavItem';
import Rating from '../comman/Rating';
import GameCard from '../comman/GameCard';
import ArticleCard from '../comman/ArticleCard';
import NewsCard from '../comman/NewsCard';
import FbFeedCard from '../comman/FbFeedCard';
import Header from '../comman/Header';
import { NavLink } from 'react-router-dom';

// import { connect } from "react-redux";
// import { changeUserData } from '../../redux/actions/index';
import { _t, setLanguage } from '../../shared/translation';
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn:false,
      pageLoaded:true,
      LoadMoreGames:false,
      allGames:[],
      userDetails:'',
      perPage:8,
      currentId:5,
      starType: '',
      score:4.50,
      mainBarNavItems: [
        { id: 1, text: 'Action', src: 'action-icon.png' },
        { id: 2, text: 'Adventure', src: 'adventure-icon.png' },
        { id: 3, text: 'RPG', src: 'rpg-icon.png' },
        { id: 4, text: 'Simulation', src: 'simulation-icon.png' },
        { id: 5, text: 'Casual', src: 'casual-icon.png' },
        { id: 6, text: 'Sports', src: 'sports-icon.png' },
        { id: 7, text: 'Others', src: 'others-icon.png' }
      ]
    };
    
    this.services = new Services();
    this.loadMore=this.loadMore.bind(this)
    this.handleOnClick=this.handleOnClick.bind(this);
    let observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    }
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.2) {
    
          if (entry.target.classList.contains('animate')) {
            entry.target.classList.add('animated')
          }
        }
      })
    }, observerOptions)

    
    this.getGamesByCat=this.getGamesByCat.bind(this);
    this.getUserDetails=this.getUserDetails.bind(this);
    if(localStorage.getItem('token')){
      this.getUserDetails();
    }

    this.myDivToFocus = React.createRef()
  }
  

  componentDidMount() {
    this.getGamesByCat(this.state.currentId,this.state.perPage)
    var flkty = new Flickity( '.main-banner_nav-carousel', {
      prevNextButtons: true,
      freeScroll: false,
      wrapAround: false,
      freeScrollFriction: 0.00,
      imagesLoaded: true,
      "cellAlign": "left", 
      "contain": true, 
      "groupCells": true
    });
  }

 
  getGamesByCat(cat,range){
    // this.setState({pageLoaded:true})
    let url = '/games?category='+cat+'&range='+range
    this.services.getGameListByCategory(url,(res)=>{
      this.setState({pageLoaded:false})
      if(res.status===200){
        this.setState({allGames:res.data,LoadMoreGames:false})
        var targets = document.querySelectorAll('.animate');
        targets.forEach(target => {
          this.observer.observe(target);
        });
        // console.log('this.state.allGames',this.state.allGames)
      }
      else{

      }
      console.log('res',res);
    })
  }
  changeType(id){
    this.setState({currentId:id,allGames:[],pageLoaded:true})
    console.log('change type to ',id)
    this.getGamesByCat(id,8);
    // this.state.perPage
  }

  loadMore(){
    console.log('load more 8 games');
    var perP=this.state.perPage;
    this.setState({perPage:perP+8,LoadMoreGames:true})
    this.getGamesByCat(this.state.currentId,perP+8)
  }

  getUserDetails(){
    let url='/profile/basicinfo';
    this.services.basicinfo(url,(res)=>{
      console.log('userDetails',res)
      if(res.status===200){
        this.setState({
         // loggedIn:true,
          userDetails:res.data
        })
        localStorage.setItem('userdata',JSON.stringify(res.data))
        // this.props.changeUserData(res.data)
      }
      else{

      }
    })
  }
  handleOnClick = (event) => {
    this.props.history.push('/game?publicUrl=inkwars');

    //.current is verification that your element has rendered
    // if(this.myDivToFocus.current){
    //     this.myDivToFocus.current.scrollIntoView({ 
    //        behavior: "smooth", 
    //        block: "nearest"
    //     })
    // }
  }
  render() {
    let lang = window.localStorage.getItem('lang');
    if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
    setLanguage(lang)
    return (
      <div id="app">
        
        <Header userdata={this.state.userDetails}/>
        <section className="main-banner container">
          <div className="main-banner_img-slices p-relative">
            <img src="images/banner-chars-coin.png" alt="" className="characters" />
            <img src="images/main-banner-vfx.png" alt="" className="effects" />

          </div>
          <div className="main-banner_content text-white container">
            <h1 className="font-bold animate">INKWARS</h1>
            <p className="text animate">Ink Wars is the world's first VS Bubble game on the market. It's a family friendly title that is
            super easy to get into but contains layers of depth for competitive play.</p>
            <div className="main-banner_type-rating">
              <div>
                <span className="game-type text-yellow font-bold">Casual</span>
                {/* <div className="rating-wrapper d-flex align-items-center text-white line-height-normal">
                  <span className="font-bold">Rating</span>
                  <div className="rating">
                  
                    {this.state.rate.map((a,key)=>{
                      return(
                        <img key={key} src={"images/" + this.setStarType(key) + ".png"} alt="" />
                      )
                    })}
                  </div>
                  <span>{this.state.score}</span>
                </div> */}
                <Rating score={this.state.score} />
              </div>
              <BtnDiagonal  text={_t('Play Now')} className="animate" onClick={this.handleOnClick}/>
              {/* <NavLink to="/game" >
              </NavLink> */}
            </div>
          </div>
        </section>
        <div className="main-banner_nav-wrapper">
          <div className="main-banner_nav align-items-center container grid-flow-column p-relative">
              {this.state.mainBarNavItems.map((data,key)=>{
                return (
                  <div key={key} className={this.state.currentId===data.id ? "item d-flex flex-column align-items-center active" : "item d-flex flex-column align-items-center"} onClick={(e)=>this.changeType(data.id)}>
                    <MainBannerNavItem  text={_t(data.text)} src={data.src} />
                  </div>
                )
              })}
          </div>
        </div>

        {/* carousel menu for responsive*/}
        <div className="main-banner_nav-carousel" data-flickity='{ "cellAlign": "left", "contain": true, "groupCells": true }'>
          {this.state.mainBarNavItems.map((data,key)=>{
                return (
                  <div key={key} className="item d-flex flex-column align-items-center" onClick={(e)=>this.changeType(data.id)}>
                    <MainBannerNavItem  text={_t(data.text)} src={data.src} />
                  </div>
                )
              })}
        </div>

        <section className="all-games container d-grid" ref={this.myDivToFocus}>
        <h3 className="text-yellow text-center grid-col-span">{_t('all games')}</h3>
          {this.state.pageLoaded ? 
            <div name='fade' className="text-center grid-col-span text-white">
              <div id="preloader-wrapper" style={{position: 'relative',backgroundColor: 'transparent'}}>
                <img src="images/preloader.svg" alt="" className="preloader" />
              </div>
            </div>
            :
            <>
              {this.state.allGames.map((data,key)=>{
                return(
                  <GameCard img={data.icon} key={key} rate={data.rating} score={data.rating} title={data.title} desc={data.description} link={'/game?publicUrl='+data.publicurl} />
                )
              })}
              {this.state.allGames.length===0 && 
              <div className="text-center grid-col-span text-white">
                <h3 >{_t('There is no game')}</h3 >
              </div>}
              {this.state.LoadMoreGames ? 
                <BtnDiagonal text={_t('Loading...')} className="grid-col-span"/>
              :
                this.state.allGames.length <8 ? '' 
                :
                <BtnDiagonal text={_t('More Games')} className="grid-col-span" onClick={this.loadMore}/>
              }
            </>
          }
        </section>

        <section className="articles container d-grid">
          <h3 className="text-yellow text-center grid-col-span">{_t('community news article')}</h3>
          <ArticleCard number='01'
            headline='Providing the specialized game development expertise that you needed the most.' content={[
              _t("SGC is the coin used in the Suponic Game Platform, born with the unique algorithm. Gamers can use SGC to buy the items and also play against other gamers for wagering profit. The wagering system is set so that the professional gamers can make millions through SGC"),
              _t("Suponic Game Platform currently hosts 64 mobile game software's. All games can be downloaded in apk file, so that countries with access restrictions can also enjoy the games on our platform. The game developers")]} />
            
          
          <ArticleCard number='02'
            headline='SGC removes the problem gamers are facing while playing use the SGC wallet to play games' content={[_t("Suponic Protocol aims to setup the global standards in crypto game world, providing core base for the regulations and the development procedures for the game developers, analysts, designers, artists, publishers, and other participants in the industry. The goal is to establish an environment where eSports industry can flourish and where gamers and game developers can enjoy the convenience of the platform. After the endless endeavour to establish the protocol, the World eSports and Blockchain Association (WESBA) has officially recognized Suponic Protocol, and now we are contributing to invigorate the crypto game industry by providing open source")]}/>
            
          <ArticleCard number='03'
            headline='Proving the best games to play 500+ games of all time categories. Having the access to SGC.' content={[_t("Use the SGC you received from the registration to play wagering mode against other players. (*Wagering: A type of sports betting, where the winner takes the wagered amount. It is different from gambling in the aspect that wagering is based on the skills of the players developed by time and effort. For legal )")]}/>
        </section>

        <section className="news d-grid container p-relative">
          <h3 className="text-yellow text-center grid-col-span">{_t('Notice & News')}</h3>
          <NewsCard character='cabal' title='cabal online update will be coming soon with new characters and features'
            para={_t('Cabal Online is a free-to-play')} />
          <NewsCard character='paladins'
            title='paladins is going to announce for the next series of its game with more features' 
            para={_t('Paladins: Champions of the Realm is a free-to')}/>
          <div className="gradient-line-and-lights animate">
            <div className="gradient-line grid-col-span"></div>
            <img src="images/nav-icon-hover.png" alt="" className="light light-1" />
            <img src="images/nav-icon-hover.png" alt="" className="light light-2" />
          </div>
        </section>

        <section className="fb-feed d-grid container">
          <h3 className="text-yellow text-center grid-col-span">{_t('Facebook Feed')}</h3>
          <FbFeedCard img='1' title="AC: Odyssey" content={[_t("Assassin's Creed Odyssey is an action role-playing video game developed by Ubisoft Quebec and published by Ubisoft. It is the 11th major installment, and 21st overall, in the Assassin's Creed series and the successor to 2017's Assassin's Creed Origins.")]}/>
            
          <FbFeedCard img='2' title="Art of War" content={[_t("Art of War: Global Conflict (AOW) - is a real-time strategy online game in the best tradition of old classic PC RTS games. Command, conquer and defeat your enemy on the battlefield in this modern warfare game!")]}/>
           
          <FbFeedCard img='3' title="Contract Wars" content={[_t("Contracts Wars is the first multiplayer free2play FPS with a RPG elements developing as the browser-based application for social networks and as a full-fledged downloadable client version.")]}/>
            
        </section>

        {/* <Footer /> */}
	    </div>
    );
  }
}

// function mapStateToProp(state) {
//   return ({
//     userdata:state.headerData.userdata
//   })
// }
// function mapDispatchToProp(dispatch) {
//   return ({
//     changeUserData:(val)=>{dispatch(changeUserData(val))}
//   })
// }

// export default connect(null, mapDispatchToProp)(IndexPage);

export default IndexPage;

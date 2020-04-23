import React from 'react';
import Services from '../../shared/Services.js';
import querySearch from "stringquery";
// import Mainnav from '../comman/Mainnav';
import Flickity from 'flickity';
import Rating from '../comman/Rating';
import BtnDiamond from '../comman/BtnDiamond';
import Header from '../comman/Header';
import './GameScreen.css';

import { _t, setLanguage } from '../../shared/translation';
class GameScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        loggedIn:false,
        pageLoaded:true,
				gameDetails:'',
				score:0,
				userdata:JSON.parse(localStorage.getItem('userdata'))
      }
      
     
			this.services = new Services();
			this.gameInfo=this.gameInfo.bind(this);
			this.Download=this.Download.bind(this);

			var query = querySearch(this.props.location.search);
			this.gameInfo(query.publicUrl)
    }
		
		gameInfo(publicUrl){
			this.setState({pageLoaded:true})
			let url = '/games/'+publicUrl
			this.services.getGameListByCategory(url,(res)=>{
				this.setState({pageLoaded:false})
				if(res.status===200){
					this.setState({gameDetails:res.data,score:res.data.rating})
					var flkty = new Flickity( '.screenshots-carousel', {
						prevNextButtons: true,
						 freeScroll: false,
						wrapAround: false,
						freeScrollFriction: 0.00,
						 imagesLoaded: true,
						"cellAlign": "left", 
						"contain": true, 
						"pageDots": false, 
						"groupCells": true,
						"lazyLoad": true
					});
				 console.log('this.state.game	Details',res)
				}
				else{

				}
				console.log('res',res);
			})
			
		}
	
    componentDidMount(){
		
			
		}
		
		Download(){
			console.log('download me ',this.state.gameDetails)
		}
    render() {
			let lang = window.localStorage.getItem('lang');
      if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
      setLanguage(lang)
			const gameDetails=this.state.gameDetails;
      return (
        <div id="app">
					
					<Header userdata={this.state.userdata} />

					<div className="game-screen container">
						{this.state.pageLoaded ? 
							<div name='fade' className="text-center grid-col-span text-white">
								<div id="preloader-wrapper" style={{position: 'relative',backgroundColor: 'transparent'}}>
									<img src="images/preloader.svg" alt="" className="preloader" />
								</div>
							</div>
							:
							<>
								<img src={gameDetails.banner} alt="" className="game-banner"/>
								<section className="game-img-and-info d-grid">
									<img src={gameDetails.thumbnail} alt="" className="thumbnail"/>
									<div className="info text-white">
										<h3 className="title font-bold has-half-underline">{gameDetails.title}</h3>
										<div className="description line-height-normal">
											<p>{gameDetails.description}</p>
											{/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
										</div>
										<Rating score={this.state.score} />
										<div className="d-flex justify-content-between align-items-center">
											<div className="age-and-genre">
												<span className="text-yellow font-bold">3+</span> / <span className="text-yellow font-bold">Casual</span> / <span className="text-yellow font-bold">Multiplayer</span>
											</div>
											<BtnDiamond text={_t('Download')} link={gameDetails.apps && gameDetails.apps.length>0 ? gameDetails.apps[0].download_link : ''}/>
										</div>
									</div>
								</section>
								<section className="screenshots">
									<h3 className="title text-white has-half-underline font-bold">{_t('Screenshots')}</h3>
									<div className="screenshots-carousel" data-flickity='{ "cellAlign": "left", "contain": true, "pageDots": false, "groupCells": true,"lazyLoad": true }'>
										{gameDetails.screenshots && gameDetails.screenshots.length ? gameDetails.screenshots.map((data,key)=>{
											return(
												<img className="cell" key={key} data-flickity-lazyload={data.url} src={data.url} link='' alt=""/>
											)
										}) 
										:
										<>
										</>}
										{/* <img className="cell" data-flickity-lazyload="images/screenshot2.png" src="images/screenshot2.png" alt=""/>
										<img className="cell" data-flickity-lazyload="images/screenshot3.png" src="images/screenshot3.png" alt=""/>
										<img className="cell" data-flickity-lazyload="images/screenshot4.png" src="images/screenshot4.png" alt=""/> */}
									</div>
									


								</section>
							</>
						}
					</div>
	    	</div>
      );
    }
  }

export default GameScreen;

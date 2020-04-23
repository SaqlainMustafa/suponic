import React from 'react';

import { _t, setLanguage } from '../../shared/translation';

class Rating extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        rate:[{
            img:'1'
          },
          {
            img:'2'
          },
          {
            img:'3'
          },
          {
            img:'4'
          },
          {
            img:'5'
          }],
          starType:''
      }
      this.setStarType=this.setStarType.bind(this);
    }
    
    // componentDidMount(){
    //   console.log('this.props.score',this.props.score);
    // }
    setStarType(index,starCount) {
        if (index < Math.floor(starCount)){
          return 'star-icon'
        }
        else{
          return 'star-icon-empty'
        }
      }
  
    render() {
      let lang = window.localStorage.getItem('lang');
      if (lang === undefined || lang === null || lang === "null") { lang = 'eng' }
      setLanguage(lang)
      return (
        <div className="rating-wrapper d-flex align-items-center text-white line-height-normal">
            <span className="font-bold">{_t('Rating')}</span>
            <div className="rating">
                {this.state.rate.map((a,key)=>{
                    return(
                        <img key={key} src={"images/" + this.setStarType(key,this.props.score) + ".png"} alt="" />
                    )
                })}
            </div>
            <span>{(this.props.score ? this.props.score : 0).toFixed(2)}</span>
        </div>
      );
    }
}

export default Rating;
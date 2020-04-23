import axios from "axios";
import constant from "../utils/constant.js";
import qs from "querystring";

import { toast } from 'react-toastify';
class Services {

   constructor() {
        if (localStorage.getItem("token") !== undefined) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
        }
    }

    // get game list by category
    async getGameListByCategory(url, cb) {
        let config = {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        };
        axios
          .get(constant.API_URL + url, { config })
          .then(res => {
            cb(res);
          })
          .catch(error => {
            if (error.response && error.response.status === 401) {
              window.x = "e40";
            } else {
              if (error.response) {
                cb(error.response.data);
              }
            }
          });
    }

    async login(val, url, cb) {
      let data = qs.stringify(val);
      
      axios
        .post(constant.API_URL + url, data)
        .then(res => {
          cb(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            window.x = "e40";
          } else {
            if (error.response) {
              cb(error.response.data);
            }
            if (!error.response) {
              cb(error);
            }
          }
        });
    }
    async forgot(val, url, cb) {
      console.log('val',val);
      let data = JSON.stringify(val);
      console.log('data',data);
      const config = { headers: {'Content-Type': 'application/json'} }
      axios
        .post(constant.API_URL + url,JSON.stringify(val),config)
        .then(res => {
          cb(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            window.x = "e40";
          } else {
            if (error.response) {
              cb(error.response.data);
            }
            if (!error.response) {
              cb(error);
            }
          }
        });
    }
    async withdraw(val, url, cb) {
      console.log('val',val);
      let data = JSON.stringify(val);
      console.log('data',data);
      const config = { headers: {'Content-Type': 'application/json'} }
      axios
        .post(constant.API_URL + url,JSON.stringify(val),config)
        .then(res => {
          cb(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            window.x = "e40";
          } else {
            if (error.response) {
              cb(error.response.data);
            }
            if (!error.response) {
              cb(error);
            }
          }
        });
    }
    

    async signup(val, url, cb) {
      // let data = qs.stringify(val);
      
      axios
        .post(constant.API_URL + url, val)
        .then(res => {
          cb(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            window.x = "e40";
          } else {
            if (error.response) {
              cb(error.response.data);
            }
            if (!error.response) {
              cb(error);
            }
          }
        });
    }
  
    async stripecharge(val, url, cb) {
      // let data = qs.stringify(val);
      
      axios
        .post(constant.API_URL + url, val)
        .then(res => {
          cb(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            window.x = "e40";
          } else {
            if (error.response) {
              cb(error.response.data);
            }
            if (!error.response) {
              cb(error);
            }
          }
        });
    }
    async basicinfo(url, cb) {
       axios
        .get(constant.API_URL + url)
        .then(res => {
          cb(res);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            window.x = "e40";
          } else {
            if (error.response) {
              cb(error.response.data);
            }
            if (!error.response) {
              cb(error);
            }
          }
        });
    }

    async ggpHistory(url, cb) {
      axios
       .get(constant.API_URL + url)
       .then(res => {
         cb(res);
       })
       .catch(error => {
         if (error.response && error.response.status === 401) {
           window.x = "e40";
         } else {
           if (error.response) {
             cb(error.response.data);
           }
           if (!error.response) {
             cb(error);
           }
         }
       });
   }


    toastBasicOption(){
      return {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    }
    
    successToast(msg){
      toast.success(msg, this.toastBasicOption());
    }
    errorToast(msg){
      toast.error(msg, this.toastBasicOption());
    }

}

export default Services;

export default function headerData(state = {}, action) {
  switch (action.type) {
        case "userdata":
          {
              const userdata = action.payload;
              return {
                  ...state,
                  userdata
              };
          }
          
      default:
          return state;
  }
}
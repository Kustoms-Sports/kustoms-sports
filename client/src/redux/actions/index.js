import axios from 'axios';

export const types={
    CHANGE_THEME:"CHANGE_THEME",
    GET_DETAILS :"GET_DETAILS",
    GET_STOCK:"GET_STOCK",

}


export const changeTheme=(payload)=>{
    return ({
        type:types.CHANGE_THEME,
        payload:payload
    })
}
 

export function getDetailId(id) {
    return async function (dispatch) {
      try {
        var json = await axios.get(`http://localhost:3001/${id}`);
        return dispatch({
          type: types.GET_DETAILS,
          payload: json.data[0],
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function getStock(id) {
    return async function (dispatch) {
      try {
        var json = await axios.get(`http://localhost:3001/${id}`);
        return dispatch({
          type: types.GET_STOCK,
          payload: json.data[1],
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  
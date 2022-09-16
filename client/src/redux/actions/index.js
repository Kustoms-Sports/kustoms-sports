import axios from 'axios';


const URL="http://localhost:3001/"

export const types={
    CHANGE_THEME:"CHANGE_THEME",
    GET_DETAILS :"GET_DETAILS",
    GET_CATEGORY: "GET_CATEGORY",
    CLEAR_CATEGORY: "CLEAR_CATEGORY",
    GET_STOCK:"GET_STOCK",
    GET_BY_DATE:"GET_BY_DATE"

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

  export const getByCategory=(category, value)=>{
    return async (dispatch)=>{
      try {
        let response= await axios.get(`${URL}?${category}=${value}`)
        return dispatch({
          type: types.GET_CATEGORY,
          payload:response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  export const clearCategory=()=>{
    return{
      type: types.CLEAR_CATEGORY
    }
  }

  export const getByDate=()=>{
    return async (dispatch)=>{
      try {
        let response= await axios.get(`${URL}date`)
        return dispatch({
          type: types.GET_BY_DATE,
          payload:response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
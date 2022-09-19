import axios from 'axios';


const URL="/"

export const types={
    CHANGE_THEME:"CHANGE_THEME",
    GET_DETAILS :"GET_DETAILS",
    GET_CATEGORY: "GET_CATEGORY",
    CLEAR_CATEGORY: "CLEAR_CATEGORY",
    GET_STOCK:"GET_STOCK",
    GET_NAVBAR:"GET_NAVBAR",
    GET_BY_DATE:"GET_DATE",
    FILTER:"FILTER",
    POST_USER: "POST_USER",
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
        var json = await axios.get(`${URL}${id}`);
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
        var json = await axios.get(`${URL}${id}`);
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
  export const getNavData=()=>{
    return async (dispatch)=>{
      try {
        let response= await axios.get(`${URL}navbar`)
        return dispatch({
          type: types.GET_NAVBAR,
          payload:response.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  export const filterProducts=(payload)=>{
    return{
      type: types.FILTER,
      payload
    }
  }
  export const clearCategory=()=>{
    return{
      type: types.CLEAR_CATEGORY
    }


  }

  export const createnewuser = (payload) => {
    return async function (dispatch) {
      try {
        var json = await axios.post(`${URL}user`, payload);
        return json
      } catch (error) {
        console.log(error);
      }
    };

  }
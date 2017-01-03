export const GET_SUBMENU = 'GET_SUBMENU'
export const REQUESTING = 'REQUESTING'

export function getSubmenu(parentMenu){
  return dispatch => {
    dispatch({
      type:REQUESTING
    })
    setTimeout(()=>dispatch({
      type:GET_SUBMENU,
      payload:parentMenu,
    }),500)
  }
}

export const loggerMiddleware =  (store) =>(next) =>(action) =>{
    if(!action.type){
      return next(action);
    }
    console.log('type' , action.type);
    console.log(store.getState());
  
    next(action);
  
  
  
  }
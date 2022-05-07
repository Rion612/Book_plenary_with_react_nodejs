
export const validateEmailHandler = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
};

export const validatePasswordHandler = (password) => {
  return password?.trim().length > 6
};
export const passwordMatch=(p1 ,p2)=>{
  if(p1===p2){
    return true;
  }
  else{
    return false;
  }
}
export const validateName =(name)=>{
  return name?.trim().length > 3
}

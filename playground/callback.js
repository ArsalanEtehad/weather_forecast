var getUser= (id, callbackFunc)=>{
  var u = {
    id: id,
    name: 'Jo'
  };
  callbackFunc(u);
}


getUser(594,(uObj_arg)=>{
  console.log(uObj_arg);
});

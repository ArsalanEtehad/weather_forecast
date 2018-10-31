


var somePromise = new Promise((resolve, reject)=>{
  //whichever comes first, will fire and it will fire only once! <promise is simply that>
  resolve('Worked.');
  reject('Not Worked!');

});


somePromise.then((message)=>{//on Fullfill
  console.log('Success: ',message);
},(errorMessage)=>{//on rejected
  console.log('Failed: ', errorMessage);
})

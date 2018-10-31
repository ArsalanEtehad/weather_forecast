
var asyncAdd = (a, b)=>{ //this is just a wrapper function for promise()
  return new Promise((resolve, reject)=>{  //new promise() @1 arg
    setTimeout(()=>{
        if(typeof a === 'number' && typeof b === 'number'){
          resolve(a+b);
        }else{
          reject('Both args must be numbers.');
        }
    },2000);
  });
}


//we getting the result of 1 promise and passing it to the next one.
asyncAdd(1,1)
.then((result)=>{
  console.log(result);
  return asyncAdd(1,result);
})
.then((result)=>{
  console.log(result);
  return asyncAdd(2,result);
})
.then((result)=>{
  console.log(result);
  return asyncAdd(3,result);
})
.then((result)=>{
  console.log(result);
  return asyncAdd(5,result);
})
.then((result)=>{
  console.log(result);
  return asyncAdd(8,result);
}).catch((errorMessage)=>{
  console.log(errorMessage);
})

//when using chaining promises, we have to use just resolve cases in then()
//and at the end, use just 1 .catch for all the errorMessages that would occured. Otherwise it goes on and crashes.

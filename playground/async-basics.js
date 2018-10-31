console.log('Starting app');

//setTimeout(callBackFunction, time in ms)
setTimeout(()=>{ //this is an asynchrinist call back: meaning that node can do other things while this is executing.
  console.log('inside the callback');
},0)

setTimeout(()=>{
  console.log('inside the second callback.')
},0);
console.log('Finishing up');

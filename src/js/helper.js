
import { API_URL, TIMER_SEC, NUMBEROFRESULTSPERPAGE } from './config.js';

export const toJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error('some thing went wrong!', res.status);
    } 
    return data;
  } catch (err) {
    throw err;
  }
};

export const timeOut = function(sec){
  return new Promise(function(_,reject){
    setTimeout(function(){
      reject(new Error('You have bad network connections!'));
    },sec*1000);
  })
};
export const sendJSON = async function(url,uploadData){
  try{
const fetchPro = fetch(url,{
    method:'POST',
    headers:{'Content-Type':'Application/json'},
    body:JSON.stringify(uploadData)
  })
  const res = await Promise.race([fetchPro,timeOut(TIMER_SEC)]);
  const data = await res.json();
  if(!res.ok){
    throw new Error(`${data.message} and ${data.status}`)
  }
  return data;
  }catch(err){
    throw err;
  }
  
}



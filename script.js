//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function download(images) {
  
 let promise= images.map((item, i) => {
  return new Promise((resolve,reject)=>{
    fetch(item.url).then(res=>{
      if(!res.ok){
        throw new Error(`Failed to load image's URL: ${item.url}`)
        
      }
      else return res.blob();
    }).then(image=>{
      let imageURL=URL.createObjectURL(image);
      resolve(imageURL);
    }).catch((error)=>{
      reject(error);
    })
  })
  })
  Promise.all(promise,i).then((data)=>{
    data.map((url,i)=>{
      let img = document.createElement('img');
        img.src = url;
        output.appendChild(img);
        img.src=images[i].url;
    })
  }).catch((error)=>console.log(error))
    
}

document.getElementById("download-images-button").addEventListener("click",()=>download(images))
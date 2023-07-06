function mainBlog() {   
   
 function openModal(){
    const ed = document.getElementById("btn")
    ed.addEventListener('click', ()=>{
        document.getElementById("blogEditor").style.display= "block";
    })
 }
 function closeModal(){
    const ed = document.getElementById("closur")
    ed.addEventListener('click', ()=>{
        document.getElementById("blogEditor").style.display= "none";
    })
 }
 closeModal()
openModal()




        fetch("http://localhost:3000/blogs")
        .then(response=>response.json())
        .then(data=>getBlogs(data))      

   
    function getBlogs(blogs) {
    blogs.forEach(char => {       
        const blog = document.getElementById("blogs")
      
        const card = document.createElement("div")
        card.className ="blog-card"
        card.innerHTML= `
        <img class="blog-image1" src="${char.poster}">
        <h1 class="blog-title">${char.title}</h1>
        <p class="blog-overview">${char.description.substring(0, 100) + '...'}</p>  
        <button id="read" class="btn dark">Read More</button> 
        <button id="del" class="btn dark">Delete</button>  
        <button id="edit" class="btn dark">Edit</button>     
        `

        card.querySelector("#read").addEventListener('click', ()=> {            
        displayOneBlog(char.id)

         })
         
        card.querySelector("#del").addEventListener('click', ()=> {card.remove()
            alert('Hello, are you sure you want to delete this blog')
        deleteBlog(char.id)
         })

        let edit1= card.querySelector("#edit")
        edit1.dataModal ="blogEditor"
         edit1.className ="btn"
        edit1.addEventListener('click', (e)=> {
            const title = e.target.title
            const poster = e.target.poster
            const topic = e.target.topic
            const description = e.target.description
           
           const editor= document.getElementById("editor")
           const modal = document.createElement('div')
           modal.className='modal-content'
           modal.innerHTML=`
           <div class="contact-form">
           <a class="close">&times;</a>
           <form id="new-blog">
          
           <h2>Blog</h2>
          <div>                    
            <input class="fname" id="title" value= " ${char.title}" type="text" name="title" placeholder="Title" />
            <input class="fname" id="topic" type="text"  value= " ${char.topic}" name="topic" placeholder="Topic" />
                   -->
            <input type="text" id="poster" name="poster"  value= " ${char.poster}" placeholder="image" />
          </div>
          <span>Message</span>
          <div>
            <textarea id="description" value="${char.description}"   name="description" rows="4"></textarea>
          </div>
          <button type="submit" href="/">Submit</button>
           </div>
           </form>                     
           `
           modal.querySelector(".close").addEventListener('click', ()=> {
            
           modal.remove()
        })
          editor.append(modal)
           
         })


        blog.append(card)
        
               
    }); 
    } 

   
//     function displayOneBlog(id) {
//         fetch(`http://localhost:3000/blogs/${id}`)
//         .then(response=>response.json())
//         .then(data=> displayerBlog(data))
        
//     }
//     function displayerBlog(blogs) {
        
//         const di = document.getElementById("display")
//         const container = document.createElement('div')
//         container.className= "viewer-container"
//         const modal = document.createElement('div')
//          modal.className='viewer'
//            modal.innerHTML=`
//            <div class="contact-form">
//            <a class="close">&times;</a>
//            <img class="viewer-img" src="${blogs.poster}">
//           <h1 class="blog-title">${blogs.title}</h1>
//            <p class="blog-overview">${blogs.description}</p>          
//           </div>                    
//            `
//            modal.style.display= "block";
//           container.append(modal)
//           di.append(container)

//           container.querySelector(".close").addEventListener('click', ()=> {
            
//             container.remove()
//          })
          
           

//     }


//    function deleteBlog(id) {
//     fetch(`http://localhost:3000/blogs/${id}`,{
//         method: 'Delete',
//         headers:{
//             'Content-Type': 'application/json'

//         }
//     })
// }

//     let former = document.getElementById('new-blog').addEventListener('submit', handleSubmit)
//             // adds an event to form
//                 function handleSubmit(e) {
//             // creates  an object  called  filmObj
//                const title = document.getElementById('title').value
//                const topic = document.getElementById('topic').value
//                const description = document.getElementById('description').value
//                const poster = document.getElementById('poster').value
               
//                if(title==='' || topic==='' || description==='' || poster==='' ){
//                 alert("Kindly fill all the fields")
//                }
//                else{

//                     e.preventDefault()
//                     let blogObj ={
//                     // id: e.target.id.value,
//                     title: e.target.title.value,
//                     topic: e.target.topic.value,
//                     createdAt: new Date(),
//                     description: e.target.description.value,    
//                     poster: e.target.poster.value  
//                 }
//                 alert("Blog has been created Succesfully")
//                 postBlog(blogObj)
//             }
              
  
//         function postBlog(blogObj) {

//             fetch('http://localhost:3000/blogs',{
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//                 body: JSON.stringify(blogObj)
            
//             })
//             .then(res=>res.json)
//             .then(blogs=>console.log(blogs))
            
//         }
//     }
 
// function sortBlogs() {
//     fetch("http://localhost:3000/blogs")
//         .then(response=>response.json())
//         .then(data=>sortArray(data))  

//     function sortArray(blogs) {
//         const sortedAsc = blogs.sort(
//             (blog1, blog2) => Number(blog1.createdAt) - Number(blog2.createdAt),                 
//                   ).reverse();
         
//            let header = sortedAsc.slice(0,1)
//           header.forEach(char => { 
//             const card = document.createElement("div")
//             card.className ="blog-card"
//             card.innerHTML= `
//             <h2 >Most Recent Blog</h2>
//             <img class="blog-image1" src="${char.poster}">
//             <h1 class="blog-title">${char.title}</h1>
//             <p class="blog-overview">${char.description.substring(0, 100) + '...'}</p>  
//             <button class="btn dark">Read More</button> 
//             <button id="del" class="btn dark">Delete</button>  
//             <button id="edit" class="btn dark">Edit</button>     
//             `
//             const ul = document.getElementById("list-name")
//             // const li = document.createElement("li")
//             // li.innerHTML = char.title
//             card.style.display="block"
//             ul.append(card)
//             console.log(char.title);
//           })
//           console.log(sortedAsc.slice(0,5))
//     }

    
// }
sortBlogs()

}

window.onload=mainBlog

 
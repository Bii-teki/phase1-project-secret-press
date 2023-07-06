let loader = document.addEventListener('DOMContentLoaded',function () { 
    // capitalize the title as it is being typed 
    document.getElementById("title").addEventListener("change", capitalTitle); 
    function capitalTitle() {
        let bob = document.getElementById("title");
        bob.value = bob.value.toUpperCase();
      }
   // display a create form in a pop up form
 function openModal(){
    const ed = document.getElementById("btn")
    ed.addEventListener('click', ()=>{
        document.getElementById("blogEditor").style.display= "block";
    })
 }// closes the pop up
 function closeModal(){
    const ed = document.getElementById("closur")
    ed.addEventListener('click', ()=>{
        document.getElementById("blogEditor").style.display= "none";
    })
 }
 function closeDisplay(){
    const de = document.getElementById("closure")
    de.addEventListener('click', ()=>{
        document.getElementById("blogEditor1").style.display= "none";
    })
 }
        closeDisplay()
        closeModal()
        openModal()

        fetch("http://localhost:3000/blogs")
        .then(response=>response.json())
        .then(data=>getBlogs(data))      

   // fetch values of each object and 
   //loops  through the items of that object
   //then display in a card
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
        <button id="del" class="btn red">Delete</button>  
        <button id="edit" class="btn edit">Edit</button>    
        `
        card.querySelector("#read").addEventListener('click', ()=> { 
            const di = document.getElementById("blogEditor1").style.display = "block" 
            document.getElementById("imga").src =char.poster
            document.getElementById("title1").innerHTML =char.title
            document.getElementById("description1").innerHTML =char.description

         })
         // on click it alerts the use if he/she wants to delete
         // deletes the blog         
        card.querySelector("#del").addEventListener('click', ()=> {card.remove()
        alert('Hello, are you sure you want to delete this blog')
        deleteBlog(char.id)
         })

        let edit1= card.querySelector("#edit")
         edit1.dataModal ="blogEditor"
         edit1.className ="btn"
         edit1.addEventListener('click', ()=> {
            //sets values of blogs to editor
            document.getElementById("blogEditor").style.display= "block";
            document.getElementById("title").value =char.title                 
            document.getElementById("topic").value = char.topic
            document.getElementById("description").value = char.description
            document.getElementById("poster").value = char.poster          
          
         })
        blog.append(card)
        
               
    }); 
    } 

   //deletes an item from json
   function deleteBlog(id) {
    fetch(`http://localhost:3000/blogs/${id}`,{
        method: 'Delete',
        headers:{
            'Content-Type': 'application/json'

        }
    })
}

    let former = document.getElementById('new-blog').addEventListener('submit', handleSubmit)
            // adds an event to form
                function handleSubmit(e) {
            // creates  an object  called  filmObj
               const title = document.getElementById('title').value
               const topic = document.getElementById('topic').value
               const description = document.getElementById('description').value
               const poster = document.getElementById('poster').value
               // perform form validation checking if the form is empty or not
               if(title==='' || topic==='' || description==='' || poster==='' ){
                alert("Kindly fill all the fields")
               }
               else{
                    e.preventDefault()
                    let blogObj ={
                    // id: e.target.id.value,
                    title: e.target.title.value,
                    topic: e.target.topic.value,
                    createdAt: new Date(),
                    description: e.target.description.value,    
                    poster: e.target.poster.value  
                }
                alert("Blog has been created Succesfully")
                postBlog(blogObj)
            }
              
      //Post blogs data to json file
        function postBlog(blogObj) {

            fetch('http://localhost:3000/blogs',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(blogObj)
            
            })
            .then(res=>res.json)
            .then(blogs=>console.log(blogs))
            
        }
    }
 //sort fuction fetch blogs  
function sortBlogs() {
    fetch("http://localhost:3000/blogs")
        .then(response=>response.json())
        .then(data=>sortArray(data))  

    function sortArray(blogs) {
        // sort them according to the time they were created
        const sortedDsc = blogs.sort(
            (blog1, blog2) => Number(blog1.createdAt) - Number(blog2.createdAt),                 
                  ).reverse();
         // displays the most recent blog
           let header = sortedDsc.slice(0,1)
          header.forEach(char => { 
            const card = document.createElement("div")
            card.className ="blog-card"
            card.innerHTML= `
            <h2 >Most Recent Blog</h2>
            <img class="blog-image1" src="${char.poster}">
            <h1 class="blog-title">${char.title}</h1>
            <p class="blog-overview">${char.description.substring(0, 100) + '...'}</p>  
            <button class="btn dark">Read More</button> 
            <button id="del" class="btn dark">Delete</button>  
            <button id="edit" class="btn dark">Edit</button>     
            `
            const ul = document.getElementById("list-name")
            card.style.display="block"
            ul.append(card)
            console.log(char.title);
          })
          console.log(sortedAsc.slice(0,5))
    }

    
}
sortBlogs()

})

 
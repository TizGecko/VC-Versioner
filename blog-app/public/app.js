const API = "/api/posts";

async function loadPosts(){
    const res = await fetch(API);
    const posts = await res.json();

    const container = document.getElementById("posts");
    container.innerHTML = "";

    posts.forEach(p => {
        const div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.content}</p>
        <button onclick="deletePost(${p.id})">Elimina</button>
        `;

        container.appendChild(div);
    });
}

async function createPost(){
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch(API,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title,content})
    });

    loadPosts();
}

async function deletePost(id){
    await fetch(API + "/" + id,{method:"DELETE"});
    loadPosts();
}

loadPosts();
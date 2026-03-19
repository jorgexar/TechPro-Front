const form = document.getElementById("newPost");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const postTitle = document.getElementById("title").value;
    const postText = document.getElementById("postBody").value;
    const errDiv = document.getElementById("error");

    if(!postText || !postTitle){
        errDiv.innerHTML = "<p>Both inputs must be filled</p>"
        return;
    }
        errDiv.innerHTML = ""
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: `${postTitle}`,
                body: `${postText}`,
                userId: 1,
            }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        const display = document.getElementById("display");
        console.log(json)
        display.innerHTML = `<p>ID:${json.id}<p>
        <h1>${json.title}</h1>
        <p>${json.body}</p>
        `
    })
    .catch(error=>{
        errDiv.innerHTML =`<p>${error}</p>`
        console.log(error)
    });

})
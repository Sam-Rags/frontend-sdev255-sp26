addEventListener("DOMContentLoaded", function() {
    document.querySelector("#addbtn").addEventListener("click", addSong)
})

//add the song to the DB, has to  be async because we are calling data outside our server

async function addSong() {
    //create a song object based on the form filled out by the user. This will make life easier when we send data to the backend
    const song = {
        title:          document.querySelector("#title").value,
        artist:         document.querySelector("#artist").value,
        releaseDate:    document.querySelector("#released").value,
        popularity:     document.querySelector("#popularity").value,
        genre:          document.querySelector("#genre").value ? document.querySelector("#genre").value.split(",") : [],
        username:       localStorage.getItem("uname")
    }
    // create response template from server, override method to be POST (default of a fetch request is GET)
    const response  = await fetch("http://localhost:3000/api/songs", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(song)
    })

    // if song successfully added, return ok response & alert user to ID of new song
    if (response.ok) {
        const results = await response.json()
        alert("Added song with ID of: " + results._id)

        // clear the form after the song is added
        document.querySelector("form").reset()
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot add song"
    }
    
}
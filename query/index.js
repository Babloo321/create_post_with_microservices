const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

/* quick example
posts === {
    'j123jk54': {
        id:'j123jk54',
        title: "post title",
        comments: [
            {id: khd42lkj, content: "comment!"}
        ]
    },
}

*/

const handleEvents = (type, data) =>{
    
    if(type === "PostCreated"){
        const {id, title} = data;
        posts[id] = { id, title, comments: []};
    }

    if(type === "CommentCreated"){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content, status});
    }

    if(type === "CommentUpdated"){
        const {id, postId, content, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(cmnt => cmnt.id === id);
        comment.status = status;
        comment.content = content;
    }
}

app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    handleEvents(type, data);
    res.send({});
});

app.listen(5002, async() => {
    console.log("Query service is listening on 5002 Port!")

    const res = await axios("http://localhost:5005/events");
    for(let event of res.data){
        console.log("Precessing event", event.type);
        handleEvents(event.type, event.data);
    }
    console.log(posts);
})
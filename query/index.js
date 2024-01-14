const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    if(type === "PostCreated"){
        const {id, title} = data;
        posts[id] = { id, title, comments: []};
    }

    if(type === "CommentCreated"){
        const {id, content, postId} = data;
        const post = posts[postId];
        post.comments.push({id, content});
    }

    console.log(posts);
    res.send({});
});

app.listen(5002, () => {
    console.log("Query service is listening on 5002 Port!")
    console.log(posts);
})
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h1>=>>CREATE POST AND COMMENTS ON THESE POSTS<<=</h1>
<h1><b>****Using Microservices****</b></h1>
<br/>
<h3><b><em>##Synchronous Communication##</em></b></h3>
<ul>
  <li>It is easy to understand</li>
  <li>There have many drawbacks of synchronous communication</li>
  <li>Lack of connections</li>
  <li>Response take time</li>
  <li>Depends on another service</li>
</ul>
<br/>
<h2>==Post Service==</h2>
<ul>
  <li>Create a service for creating a post with specific id</li>
  <li>Created a list of posts with their id's</li>
</ul>
<br/>
<h2>==Comment Service==</h2>
<ul>
  <li>Create a service for creating a comments with given post's id</li>
  <li>Create a service which lists all comments with a specific post's id</li>
</ul>
<br/>
<h2>==Client Service==</h2>
<ul>
  <li>Create UI for User interaction</li>
  <li>Which is fetch the data from postman using axios and render the data on user's UI</li>
</ul>
<br/>
<h3><b><em>##Asynchronous Communication##</em></b></h3>
<ul>
  <li>Harder to understand</li>
  <li>No dependency on another service</li>
  <li>Execute faster</li>
  <li>No Much more connections</li>
  <li>All events gone through the bus events make sure we create a another service to handle the app APIs</li>
  <li>Data duplication</li>
</ul>
<h2><b><em>Create an event-bus:=></em></b></h2>
<ul>
  <li>send an event inside the event-bus from where creating api</li>
  <li>event-bus return the data through events through the calling api from otherside</li>
</ul>
<h2><b><em>Create a query service:=></em></b></h2>
<ul>
  <li>It's service has both the data post create as well as comment create</li>
  <li>Through the query service we can extract the data in on single request</li>
</ul>
<h2><b><em>Create a moderation service:=></em></b></h2>
<ul>
  <li>It has implemented some functionality to check the commend should be displed</li>
  <li>If approved than display original comment</li>
  <li>If pending than display comment is in pending, working in moderation service</li>
  <li>If reject than display comment is reject that's it</li>
</ul>
<h2><b><em>Introducing Docker:=></em></b></h2>

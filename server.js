var express = require('express'); 
var bodyParser = require('body-parser');

var Items = function() {
     this.items = [];     
     this.id = 0; 
};  

Items.prototype.add = function(name) {     
var item = {name: name, id: this.id};     
this.items.push(item);     
this.id += 1;     
return item; 
};  

var items = new Items(); 
items.add('Broad beans'); 
items.add('Tomatoes'); 
items.add('Peppers');  

var app = express(); 
var jsonParser = bodyParser.json();

app.use(express.static('public'));

app.get('/items', function(req, res) {     
res.json(items.items); 
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = items.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function (req, res) {
    
    var length = items.items.length;
    
    var id = req.params.id;
    
    var i = 0;
    
    for(i; i < length; i++) {
     
          if(items.items[i].id == id) {
               var deleted = items.items[i];
              items.items.splice(i, 1);
              break;
          }
     }
     
     if (i == length) {
          res.status(400).json({ error: 'Sorry, that ID does not exist.' });
     } else {
          res.status(201).json(deleted);
     }
     
});

app.put('/items/:id', jsonParser, function (req, res) {
    
     var length = items.items.length;
    
    var id = req.params.id;
    
    var i = 0;
    
    for(i; i < length; i++) {
     
          if(items.items[i].id == id) {
               var updated = items.items[i];
              items.items[i].name = req.body.name;
              break;
          }
     }
     
     if (i == length) {
          //res.status(400).json({ error: 'Sorry, that ID does not exist.' });
          var new_name = req.body.name;
          var new_item = {name: new_name, id: id};     
          items.items.push(new_item);   
          
     } else {
          res.status(201).json(updated);
     }
    
    
});


app.listen(process.env.PORT || 8080);

MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://user:Password123@ds157621.mlab.com:57621/testdb12345", function (err, db) {
   
     if(err) throw err;

    db.collection('bugsdb', function (err, collection) {
        
        collection.insert({ priority: 'P1', status:'Open', owner:'Weiyang', title:'App crashes on open' });
	collection.insert({ priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel' });      

        db.collection('bugsdb').count(function (err, count) {
            if (err) throw err;
            
            console.log('Total Rows: ' + count);
        });
    });
     //Write databse Insert/Update/Query code here..
                
});

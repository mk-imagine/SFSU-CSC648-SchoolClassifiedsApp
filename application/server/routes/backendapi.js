
//___________________________________________--
//const db = require('../config/database');
//I was going off a Youtube video
const {createPool} = require('mysql2');
                            
//have to change
 const pool = createPool({       //have to change
    host: 'localhost',
    user: 'root',
    password: 'sfcs2020',
    connectionLimit: 50
}); 

//gets the array of categories
//function getCategories(){
    pool.query('select category_name from csc648.category', (err, res) => {
    let arrayOfCategories = [];
    res.map((data) => {        
        let sData = Object.values(data);
        arrayOfCategories.push(sData[0]);
    })
    console.log(arrayOfCategories);
    return arrayOfCategories;
    });
//}

//gets the array of items
/* pool.query('select * from csc648.item', (err, res) => {
    let arrayOfItems = [];
    res.map((data) => {
        for(key in data){
            if(key == "item_pic"){
                let val = data[key];
                //here run the s3 stuff to get the image url. find using the value and save result


                //then replace the val with the saved url result
                let x = "temp_url"
                data[key] = x;
                //console.log(data);
            }
        }
        let sData = JSON.parse(JSON.stringify(data));       
        arrayOfItems.push(sData);
    })
    console.log(arrayOfItems);
    return arrayOfItems;
}); */


//*****************
//Actually searching
let searchWord = "rare";

let searchw = "%"+searchWord+"%";
let baseSQL = 'select * from csc648.item where item_name like ? or item_desc like ?;';
pool.query(baseSQL,[searchw,searchw], (err, res) => {
    let arrayOfItems = [];
   
    if(res == undefined){
        //have to send something?

        return -1;
    }
    res.map((data) => {
        for(key in data){
            if(key == "item_pic"){
                let val = data[key];
                //here run the s3 stuff to get the image url. find using the value and save result


                //then replace the val with the saved url result
                let x = "temp_url"
                data[key] = x;
            }
        }
        let sData = JSON.parse(JSON.stringify(data));       
        arrayOfItems.push(sData);
    })
    console.log(arrayOfItems);
    return arrayOfItems;
});
//___________________________________________________________
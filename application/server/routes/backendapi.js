const aws = require('aws-sdk');
const { createPool } = require('mysql2');
//const db = require('../config/database');

/*___________________________________________*/

//have to change information
const pool = createPool({
    host: 'mysql',
    user: 'root',
    password: 'csc648team8'
});

/*__________________________________________________________________________________________________*/

//gets the array of categories
function getCategories() {
    pool.query('select category_name from csc648.category', (err, res) => {
        let arrayOfCategories = [];
        res.map((data) => {
            let sData = Object.values(data);
            arrayOfCategories.push(sData[0]);
        })
        console.log(arrayOfCategories);
        return arrayOfCategories;
    });
}

/*__________________________________________________________________________________________________*/

//gets the array of all items
function getAllItems() {
    pool.query('select * from csc648.item', (err, res) => {
        let arrayOfItems = [];
        res.map((data) => {
            for (key in data) {
                if (key == "item_pic") {
                    let val = data[key];
                    let url = getPicURL(val);
                    if(url != -1){
                        data[key] = url;
                    }                    
                }
            }
            let sData = JSON.parse(JSON.stringify(data));
            arrayOfItems.push(sData);
        })
        console.log(arrayOfItems);
        return arrayOfItems;
    });
}

/*__________________________________________________________________________________________________*/

//Use a parameter to find item with that word
function getItem(searchWord) {
    let searchw = "%" + searchWord + "%";
    let baseSQL = 'select * from csc648.item where item_name like ? or item_desc like ?;';
    pool.query(baseSQL, [searchw, searchw], (err, res) => {
        let arrayOfItems = [];
        if (res == undefined) {
            //have to send something?

            return -1;
        }
        res.map((data) => {
            for (key in data) {
                if (key == "item_pic") {
                    let val = data[key];
                    let url = getPicURL(val);
                    if(url != -1){
                        data[key] = url;
                    }                    
                }
            }
            let sData = JSON.parse(JSON.stringify(data));
            arrayOfItems.push(sData);
        })
        console.log(arrayOfItems);
        return arrayOfItems;
    });
}

/*__________________________________________________________________________________________________*/

//Getting the URL of the image
function getPicURL(name) {
    try {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: 'AKIA2JSQG5HH76ZUX4PE',
            secretAccessKey: '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',
            region: 'us-east-1'
        });
        const s3 = new aws.S3();
        var params = {
            Bucket: 'csc648-t8-user-uploaded-images',
            Key: name
        }
        var url = s3.getSignedUrl('getObject', params);
        //console.log(url);
        return url;
    } catch (e) {
        console.log('AWS error response', e);
        return -1;
    }
}
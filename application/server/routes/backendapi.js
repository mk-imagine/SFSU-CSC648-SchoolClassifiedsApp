const aws = require("aws-sdk");
const { createPool } = require("mysql2");

//const db = require('../config/database');

/*___________________________________________*/

//have to change information
const pool = createPool({
  host: "54.90.37.137",
  user: "root",
  password: "csc648team8"
});

/*__________________________________________________________________________________________________*/

//returns an array of all categories
function getCategories() {
  pool.query("select category_name from csc648.category", (err, res) => {
    let arrayOfCategories = [];
    res.map((data) => {
      let sData = Object.values(data);
      arrayOfCategories.push(sData[0]);
    });
    console.log(
      "_________________getCategories: Getting the array of categories_________________"
    );
    console.log(arrayOfCategories);
    return arrayOfCategories;
  });
}

/*__________________________________________________________________________________________________*/

//returns an array of all items
function getAllItems() {
  pool.query("select * from csc648.item", (err, res) => {
    let resArray = processRes(res);
    console.log(
      "_________________getAllItems: Getting the array of all items_________________"
    );
    console.log(resArray);
    return resArray;
  });
}

/*__________________________________________________________________________________________________*/

//Takes in a searchword and a category and returns an array with items in that category and searchword
//matching in its name or description.
function getItemWCat(searchWord, categoryWord) {
  let searchw = "%" + searchWord + "%";
  let baseSQL =
    "select * from csc648.item left join csc648.category on item.item_category = category.category_id where (item.item_name like ? or item.item_desc like ?) and category.category_name = ?;";
  pool.query(baseSQL, [searchw, searchw, categoryWord], (err, res) => {
    let resArray = processRes(res);
    console.log(
      "_________________getItemWCat: Getting the array of searched item with a category_________________"
    );
    console.log(resArray);
    return resArray;
  });
}

/*__________________________________________________________________________________________________*/

//Takes in a category and returns an array with all items from that category.
function getItemWCatO(searchCategory) {
  let baseSQL =
    "select * from csc648.item left join csc648.category on item.item_category = category.category_id where category.category_name = ?;";
  pool.query(baseSQL, [searchCategory], (err, res) => {
    let resArray = processRes(res);
    console.log(
      "_________________getItemWCatO: Getting the array of item with a category_________________"
    );
    console.log(resArray);
    return resArray;
  });
}

/*__________________________________________________________________________________________________*/

//Takes in a searchword and returns an array with the items with that searchword in its name or description.
function getItemWOCat(searchWord) {
  let searchw = "%" + searchWord + "%";
  let baseSQL =
    "select * from csc648.item where item_name like ? or item_desc like ?;";
  pool.query(baseSQL, [searchw, searchw], (err, res) => {
    let resArray = processRes(res);
    console.log(
      "_________________getItemsWOCat: Getting the array of searched item without a category_________________"
    );
    console.log(resArray);
    return resArray;
  });
}

/*__________________________________________________________________________________________________*/

//For processing the results of the mySQL query. The other functions call on this to get the array of items.
//It takes in the mySQL query results and returns an array of objects, image url included.
function processRes(res) {
  if (res == undefined) {
    return [];
  }
  let arrayOfItems = [];
  res.map((data) => {
    for (key in data) {
      if (key == "item_pic") {
        let val = data[key];
        let url = getPicURL(val);
        if (url != -1) {
          data[key] = url;
        }
      }
    }
    let sData = JSON.parse(JSON.stringify(data));
    arrayOfItems.push(sData);
  });
  return arrayOfItems;
}

/*__________________________________________________________________________________________________*/

//Getting the URL of the image. The other functions call on this function for url.
//It takes in the value of item_pic from the item table and gets the image from the s3 bucket.
function getPicURL(name) {
  const url = "https://csc648-t8-user-uploaded-images.s3.amazonaws.com/";
  return url.concat(name);
  // try {
  //     aws.config.setPromisesDependency();
  //     aws.config.update({
  //         accessKeyId: 'AKIA2JSQG5HH76ZUX4PE',
  //         secretAccessKey: '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',
  //         region: 'us-east-1'
  //     });
  //     const s3 = new aws.S3();
  //     var params = {
  //         Bucket: 'csc648-t8-user-uploaded-images',
  //         Key: name
  //     }
  //     //var url = s3.getSignedUrl('getObject', params);
  //     var url = s3.getObject(params);
  //     //console.log(url);
  //     return url;
  // } catch (e) {
  //     console.log('AWS error response', e);
  //     return -1;
  // }
}

//////////////////////////////////////TESTING///////////////////////////////
getCategories();
getAllItems();
getItemWCat("art", "art");
getItemWCatO("books");
getItemWOCat("down");

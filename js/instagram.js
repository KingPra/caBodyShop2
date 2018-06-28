//updates copyright
function newYear () {
  return (new Date()).getFullYear()
};

document.querySelector('.new-year').innerHTML = newYear();

// window.onload = function () {
//   console.log('hey there');
//     res = fetch("https://www.instagram.com/brazilian_carlos/?__a", {
//         method: 'get'
//     }).then(function (data) {
//       console.log(data.json)
//         return data.json();
//     }).catch(function (error) {
//         console.log("ERROR".concat(error.toString()));
//     });
//     console.log(res.user);
// };

const client_id = 'eb293f7a9a014367aacc227252efe2a5';
const secret = 'ef8b7676f5d148319755d6f79820f9dd';
//const user_id = 'brazilian_carlos';
const num_pics = 4;

const token = 'ef8b7676f5d148319755d6f79820f9dd', // learn how to obtain it below
    userid = 'eb293f7a9a014367aacc227252efe2a5', // User ID - get it in source HTML of your Instagram profile or look at the next example :)
    num_photos = 4; // how much photos do you want to get

// $.ajax({
// 	url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
// 	dataType: 'jsonp',
// 	type: 'GET',
// 	data: {access_token: token, count: num_photos},
// 	success: function(data){
//  		console.log(data);
// 		for( x in data.data ){
// 			$('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
// 			// data.data[x].images.thumbnail.url - URL of image 150х150
// 			// data.data[x].images.standard_resolution.url - URL of image 612х612
// 			// data.data[x].link - Instagram post URL
// 		}
// 	},
// 	error: function(data){
// 		console.log(data); // send the error notifications to console
// 	}
// });



var apitags   = 'https://" + "api.instagram.com/v1/tags/';
var query     = 'king.pra';
var apitoken  = '?access_token=ef8b7676f5d148319755d6f79820f9dd';
var url = apitags + query + apitoken;


function preload() {
  loadJSON(url);

}
function setup() {
  noCanvas();
  var tags = url.data[1].name;
  console.log(url.data[1].name);
  console.log(tags);
  createP(tags);

}

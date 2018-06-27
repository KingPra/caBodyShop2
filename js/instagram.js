console.log('connected');



//updates copyright
function newYear () {
  return (new Date()).getFullYear()
};

document.querySelector('.new-year').innerHTML = newYear();


window.onload = function () {
  console.log('hey there');
    res = fetch("https://www.instagram.com//brazilian_carlos/?__a", {
        method: 'get'
    }).then(function (data) {
        return data.json();
    }).catch(function (error) {
        console.log("ERROR".concat(error.toString()));
    });
    console.log(res.user);
};

function hello () {
  console.log('hello')
}

console.log(hello());

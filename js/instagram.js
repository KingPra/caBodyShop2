//updates copyright
function newYear () {
  return (new Date()).getFullYear()
};
document.querySelector('.new-year').innerHTML = newYear();

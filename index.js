// function render() {
//   return `
//   <div> HOla </div>
//   `;
// }

// const MainPage = {
//   //returns the html. The innerHtml will read directly the html.
//   toString() {
//     return render();
//   },
//   //Add the main-page's listeners and the navbar's listeners
//   addListeners() {
//     // listenSelectOrder();
//     // listenRemoveFilter();
//     // Navbar.addListeners();
//   },
// };

// export default MainPage;

const STORE = {
  products: [],
  categories: [],
};

const nav = document.getElementById("casa");
console.log(nav);

function navBar() {
  const title = document.createElement("div");
  title.innerHTML = `
    <div> HOlaaaaaaaa </div>
    <div> HOla </div>
    <div> HOla </div>
    <div> HOla </div>
  `;
  nav.append(title);
}

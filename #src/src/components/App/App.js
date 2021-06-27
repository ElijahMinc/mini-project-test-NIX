import './App.scss';
import Checkbox from '../Checkbox';
import DataInfo from '../DataInfo';
import Pagination from '../Pagination/Pagination';
import Burger from '../Burger/Burger';
import './../Select';
class App {
   render() {
      Checkbox.render();
      Pagination.render();
      Burger.render();
      DataInfo.renderData();
   }
}

export default new App();
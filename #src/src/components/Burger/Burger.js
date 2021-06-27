import { ROOT_BURGER } from './../../constants/root';
import './Burger.scss';

class Burger {
   constructor() {
      this.#setup();
   }
   showMenu() {
      if (!ROOT_BURGER.classList.contains('open')) {
         document.querySelector('body').style.overflow = 'hidden';
      } else {
         document.querySelector('body').style.overflow = 'visible';
      }
      ROOT_BURGER.classList.toggle('open');
      document.querySelector('.nav').classList.toggle('open');
   }
   render() {
      let burger = `
      <span></span>
      <span></span>
      <span></span>
      `;
      ROOT_BURGER.innerHTML = burger;
   }
   #setup() {
      ROOT_BURGER.addEventListener('click', () => this.showMenu());
   }
}

export default new Burger('#burger');
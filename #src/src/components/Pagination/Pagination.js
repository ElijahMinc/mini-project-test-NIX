// import './Pagination.scss';
import { ROOT_URL, ROOT_PAGINATION, ROOT_RENDER_QUANTITY_NORMAL } from './../../constants/root';
import imgNext from './img/next.png';
import imgPrev from './img/prev.png';
import DataInfo from '../DataInfo';
import GetData from '../../utils/GetData';
import './Pagination.scss';

class Pagination {
   renderFirstData() {
      DataInfo.renderData(ROOT_RENDER_QUANTITY_NORMAL);
   }
   renderSecondData() {
      DataInfo.renderData(ROOT_RENDER_QUANTITY_NORMAL);
   }
   renderData(e) {
      const btn = e.currentTarget;
      if (btn.dataset.type === 'first') {
         console.log('1')
         this.currentClass(btn);
         this.renderFirstData();
      } else if (btn.dataset.type === 'second') {
         console.log('2')
         this.currentClass(btn);
         this.renderSecondData();
      }
   }
   currentClass(btn) {
      const btnCurrent = document.querySelectorAll('.pagination-block__btn');
      btnCurrent.forEach(e => e.classList.remove('current'));
      btn.classList.add('current');
   }
   setup() {
      const firstBtn = document.querySelector('[data-type="first"]');
      const secondBtn = document.querySelector('[data-type="second"]');
      firstBtn.addEventListener('click', (e) => this.renderData(e));
      secondBtn.addEventListener('click', (e) => this.renderData(e));
   }
   render() {
      let pagination = `
         <div class="pagination-block d-flex">
            <div class="pagination-block__item">
               <img class="arrow-prev" src="${imgPrev}" alt="prev">
            </div>
            <div class="pagination-block__item pagination-block__btn current" data-type="first">
               <span class="first number">1</span>
            </div>
            <div class="pagination-block__item pagination-block__btn" data-type="second">
               <span class="second number">2</span>
            </div>
            <div class="pagination-block__item">
               <img class="arrow-next" src="${imgNext}" alt="next">
            </div>
         </div>
      `;
      ROOT_PAGINATION.innerHTML = pagination;
      this.setup();
   }
}
export default new Pagination();

{/* <div class="pagination-block d-flex">
<div class="pagination-block__item">
   <img class="arrow-prev" src="${imgPrev}" alt="prev">
</div>
<div class="pagination-block__item current">
   <span class="first number">1</span>
</div>
<div class="pagination-block__item">
   <span class="second number">2</span>
</div>
<div class="pagination-block__item">
   <img class="arrow-next" src="${imgNext}" alt="next">
</div>
</div> */}

// export const selectNum = new Select('#selectNum', {
//    isSelect: '',
//    placeholder: '10',
//    data: [
//       {
//          id: 1,
//          name: '1'
//       },
//       {
//          id: 2,
//          name: '2'
//       },
//    ]
// }); // initialization select 
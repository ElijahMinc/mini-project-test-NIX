import { ROOT_URL, ROOT_DATAINFO, ROOT_RENDER_QUANTITY_NORMAL } from "../../constants/root";
import GetData from "../../utils/GetData";
import './DataInfo.scss';
import img from './img/sort.png';
import imgPreload from './img/preload.svg';
import DataInfoTotal from "../DataInfoTotal";
import Error from "../Error";
class DataInfo {
   async getData(url) {
      const data = await GetData.get(url);
      return data
   }
   loadData(data, quantity) {
      setTimeout(() => {
         this.render(data, quantity);
         this.#setup(data); // устанавливаем после загрузки данных обработчики событий
         this.renderRestComponents();
      }, 2000);
   }
   async renderData(quantity) {
      const data = await this.getData(ROOT_URL);
      if (data.statusError) {
         Error.render(data.error);
      } else {
         console.log('work');
         this.preload();
         this.loadData(data.data, quantity);
      }
   }
   preload() {
      let preload = `
         <div class="preload">
            <div class="preload__body">
               <img src="${imgPreload}" alt="preload">
            </div>
         </div>
      `;

      ROOT_DATAINFO.innerHTML = preload;
   }
   renderRestComponents() {
      DataInfoTotal.render();
   }
   render(data, quantity) {
      let htmlDataInfoWrapper = `
         <table>
            ${this.#titles()}
            ${this.renderMain(data, quantity)}
         </table>
      `;
      ROOT_DATAINFO.innerHTML = htmlDataInfoWrapper;
   }
   sortEstimation(data) {
      return data.sort((obj1, obj2) => obj2.estimation - obj1.estimation)
   }
   sortTotalTime(data) {
      return data.sort((obj1, obj2) => obj2.totalTime - obj1.totalTime)
   }
   sortTotalTimePeriod(data) {
      return data.sort((obj1, obj2) => obj2.totalTimePeriod - obj1.totalTimePeriod)
   }
   sortEfficiency(data) {
      const sortData = data.sort((obj1, obj2) => {
         let a = obj1.efficiency;
         let b = obj2.efficiency;
         (a === '-') ? a = -1 : a = 1;
         (b === '-') ? b = -1 : b = 1;
         return b - a
      })
      return sortData
   }
   renderSortComponents(dataTypeSort, data) {
      this.render(dataTypeSort);
      this.#setup(data);
   }
   sortData(event, data) {
      const btn = event.currentTarget;
      const sortBtn = btn.dataset.sort;
      if (sortBtn === 'estimation') {
         const dataSortEstimation = this.sortEstimation(data);
         this.renderSortComponents(dataSortEstimation, data);
      } else if (sortBtn === 'total-time') {
         const dataSortTotalTime = this.sortTotalTime(data);
         this.renderSortComponents(dataSortTotalTime, data);
      } else if (sortBtn === 'time-period') {
         const dataSortTotalTimePeriod = this.sortTotalTimePeriod(data);
         this.renderSortComponents(dataSortTotalTimePeriod, data);
      } else if (sortBtn === 'efficiency') {
         const dataSortEfficiency = this.sortEfficiency(data);
         console.log(dataSortEfficiency)
         this.renderSortComponents(dataSortEfficiency, data);
      }
   }
   #titles() {
      let titles = `
         <tr class="data-info__th-titles">
            <td data-th="Task name" class="title data-info__td-title">
               <div class="data-info__title">
                  Task name
                  <img src="${img}" alt="sort">
               </div>
            </td>
            <td data-th="Developer" class="title data-info__td-title">
               <div class="data-info__title">
                  Developer
                  <img src="${img}" alt="sort">
               </div>
            </td>
            <td data-th="Work Type" class="title data-info__td-title">
               <div class="data-info__title">
                  Work Type
                  <img src="${img}" alt="sort">
               </div>
            </td>
            <td data-th="Status" data-th="Developer" class="title data-info__td-title">
               <div class="data-info__title">
                  Status
                  <img src="${img}" alt="sort">
               </div>
            </td>
            <td data-th="Estimation" class="title data-info__td-title">
               <div class="data-info__title sort" data-type="sort" data-sort="estimation">
                  Estimation (h)
                  <img src="${img}" alt="sort">
               </div>
            </td>
            <td data-th="Total time spent by All" class="title data-info__td-title">
               <div class="data-info__title sort" data-type="sort" data-sort="total-time">
                  Total time spent
                  by All
                  <img src="${img}" alt="sort">
               </div>
            </td>
            <td data-th="My Time spent by Period(h)" class="title data-info__td-title">
               <div class="data-info__title sort" data-type="sort" data-sort="time-period">
                  My Time spent by Period (h)
                  <img src="${img}" alt="sort">
               </div>
            </td>
            <td data-th="Efficiency" class="title data-info__td-title">
               <div class="data-info__title sort" data-type="sort" data-sort="efficiency">
                  Efficiency
                  <img src="${img}" alt="sort">
               </div>
            </td>
         </tr>
      `
      return titles
   }
   #renderItem(element) {
      let item = ``
      element.forEach(el => {
         let li = `<li class="several data-info__content">${el}</li>`;
         item += li;
      })
      return item;
   }
   #lengthCheck(workType, showMore) {
      if (workType.length >= 2) {
         return showMore = `
            <a href="##" class="show-more">
               Show more (6)
            </a>
            `;
      } else {
         return showMore
      }
   }
   renderMain(data, quantity) {
      let htmlDataInfo = ``;
      data.forEach(({ id, taskName, developer, workType,
         status, estimation, totalTime,
         totalTimePeriod, efficiency }, index) => {
         (quantity === undefined) ? quantity = ROOT_RENDER_QUANTITY_NORMAL : false
         if (index < quantity) {
            let showMoreDev = ``;
            let showMoreWork = ``;
            let statusCurrent = null;
            let classCurrent = null;
            let moreDevClass = null;
            let moreWorkClass = null;
            let dataType = ``;
            let dev = [];
            if (status) {
               statusCurrent = `Completed`;
               classCurrent = `completed`;
            } else {
               statusCurrent = 'Non Completed';
               classCurrent = `non`;
            }
            if (developer.length >= 2) {
               dev = developer
                  .splice(0, 2)
               showMoreDev = `
                  <a href="##" class="show-more">
                     Show more (6)
                  </a>
               `;
               moreDevClass = `more-dev`
            } else {
               dev = developer;
            }
            showMoreWork = this.#lengthCheck(workType, showMoreWork);
            if (workType.length >= 2) {
               moreWorkClass = `more-work`
               dataType = `data-type="several-work"`
            } else if (workType.length <= 1) {
               dataType = `data-type="grafic-design"`
            } else {
               moreWorkClass = ``
            }
            let workTypeItem = this.#renderItem(workType);
            let devItem = this.#renderItem(dev);

            htmlDataInfo += `
               <tr class="data-info__several" data-id='${id}' ${dataType}>
               <td data-th="Task name" class="data-info__value">
                  <div class="data-info__wrap">
                     <div class="data-info__name data-info__content">
                        ${taskName}
                     </div>
                  </div>
               </td>
               <td data-th="Work Type" class="data-info__value">
               <div class="data-info__wrap">
                  <ul class="${moreDevClass} data-info__wrap-content d-flex">
                     ${devItem}
                  </ul>
                  <div class="data-info__more">
                     ${showMoreDev}
                  </div>
               </div>
               </td>
               <td data-th="Developer" class="data-info__value">
                  <div class="data-info__wrap">
                     <ul class="${moreWorkClass} data-info__wrap-content d-flex">  
                        ${workTypeItem}
                     </ul>
                     <div class="data-info__more">
                        ${showMoreWork}
                     </div>
                  </div>
               </td>
               <td data-th="Status" class="data-info__value">
                  <div class="data-info__wrap">
                     <div class="${classCurrent} data-info__content">
                        ${statusCurrent}
                     </div>
                  </div>
               </td>
               <td data-th="Estimation (h)" class="data-info__value sort">
                  <div class="data-info__wrap">
                     ${estimation}
                  </div>
               </td>
               <td data-th="Total time spent
               by All" class="data-info__value sort">
                  <div class="data-info__wrap">
                     ${totalTime}
                  </div>
               </td>
               <td data-th="My Time spent by Period (h)" class="data-info__value sort">
                  <div class="data-info__wrap">
                     ${totalTimePeriod}
                  </div>
               </td>
               <td data-th="Efficiency" class="data-info__value sort" data-sort="efficiency">
                  <div class="data-info__wrap">
                     ${efficiency}
                  </div>
               </td>
            </tr>
               `
         }
      })
      return htmlDataInfo;
   }
   #setup(data) {
      const pagination = document.querySelector('.pagination')
      const dataInfo = document.querySelector('#dataInfo').querySelector('table');
      if (dataInfo) {
         pagination.style.display = 'block'
      }
      const sortBtns = document.querySelectorAll('[data-type="sort"]');
      sortBtns.forEach(e => e.addEventListener('click', (e) => this.sortData(e, data)));
   }

}

export default new DataInfo();
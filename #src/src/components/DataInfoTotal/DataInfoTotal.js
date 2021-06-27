import { ROOT_DATAINFOTOTAL } from './../../constants/root';
import './DataInfoTotal.scss';

class DataInfoTotal {
   render() {
      let dataInfoTotal = `
      <table>
      <tr class="data-total__body" data-type="total">
         <td class="data-total__item data-total__sum">Sum</td>
         <td class="data-total__item></td>
         <td class="data-total__item></td>
         <td class="data-total__item></td>
         <td class="data-total__item></td>
         <td data-th="Efficiency" class="data-total__item" data-type="total-time">
            <div class="data-total__content">
               2078h
            </div>            
         </td>
         <td data-th="My Time spent by Period" class="data-total__item" data-type="all-time-period">
            <div class="data-total__content">
               1090h
            </div>   
         </td>
         <td data-th="Total time spent by All" class="data-total__item" data-type="efficiency">
            <div class="data-total__content">
               100% (1090h)
            </div>      
         </td>
      </tr>
   </table>
      `
      ROOT_DATAINFOTOTAL.innerHTML = dataInfoTotal;
   }
}

export default new DataInfoTotal();


{/* <div class="data-total__body d-grid" data-type="total">
<div class="data-total__item data-total__sum">Sum</div>
<div data-th="Efficiency" class="data-total__item" data-type="total-time">2078h</div>
<div data-th="My Time spent by Period" class="data-total__item" data-type="all-time-period">1090h</div>
<div data-th="Total time spent by All" class="data-total__item" data-type="efficiency">100% (1090h)</div>
</div> */}
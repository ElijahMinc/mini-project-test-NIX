import './Error.scss';
import { ROOT_DATAINFO } from "../../constants/root";
import errorImg from './img/error.jpg'

class Error {
   render(errorText) {
      let error = `
         <div class="error">
            <div class="error__body">
               <img src="${errorImg}" alt="error">
               <p class='error__text'>${errorText}</p>
            </div>
         </div>
      `;
      ROOT_DATAINFO.innerHTML = error
   }
}


export default new Error();
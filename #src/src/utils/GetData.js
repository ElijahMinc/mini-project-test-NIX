import axios from "axios";

class GetData {
   async get(url) {
      let statusError = false;
      try {
         const data = await axios.get(url);
         return {
            data: data.data['data-info'],
            statusError
         }
      } catch (error) {
         statusError = true;
         return { error, statusError };
      }

   }
}

export default new GetData();
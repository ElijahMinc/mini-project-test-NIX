import './Checkbox.scss';

class Checkbox {
   constructor($el) {
      this.$el = document.querySelector($el)
      this.#setup();
   }
   handleCheckbox() {
      this.trueOrFalse ? this.removeCheck() : this.addCheck();
   }
   get trueOrFalse() {
      return this.$el.classList.contains('checked');
   }
   render() {
      let checkbox = `
         <span class="checkbox__body">
            <input type="checkbox">
         </span>
      `;
      this.$el.innerHTML = checkbox;
   }
   #setup() {
      this.$el.addEventListener('click', () => this.handleCheckbox());
   }
   removeCheck() {
      this.$el.classList.remove('checked');
      this.$el.querySelector('input').removeAttribute('checked')
   }
   addCheck() {
      this.$el.classList.add('checked');
      this.$el.querySelector('input').setAttribute('checked', '')
   }
}

const checkbox = new Checkbox('#checkbox');
export default checkbox
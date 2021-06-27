import './Select.scss';

class Select {
   constructor($el, data) {
      this.$el = document.querySelector($el);
      this.data = data;
      this.render();
      this.#setup();
   };
   renderSelect = (el, placeholder, data) => {
      let str = null;
      const selected = data.map(select => {
         return `
         <li class="select__item" data-type="item" data-id="${select.id}">${select.name}</li>
         `
      }).join('')
      if (data.length) {
         str = `
         <div class="select__area" data-type="area"></div>
            <div class="select__input-area" data-type="input">
               <span data-type="value">${placeholder}</span>
               <span class="select__arrow" data-type="arrow"></span>
               <input type="radio" class="select__input" data-type="input-form" name="select">
            </div>
            <div class="select__dropdown">
            <ul class="select__list">
               ${selected}
            </ul>
         </div>
            `
      }
      return el.insertAdjacentHTML('beforeend', str)
   };
   render() {
      const { placeholder, data } = this.data;
      this.$el.classList.add('select');
      this.renderSelect(this.$el, placeholder, data);
   }
   #setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener('click', this.clickHandler);
      this.$valueInput = this.$el.querySelector('[data-type="value"]');
      this.$input = this.$el.querySelector('[data-type="input-form"]');
      // this.$area = this.$el.querySelector('[data-type="area"]');
   }
   clickHandler(event) {
      const target = event.target;
      const { type } = target.dataset;
      if (type === 'input' || type === 'value') {
         this.toggle();
      } else if (type === 'item') {
         this.checkChecked(target);
         this.select(target)
      } else if (type === 'area') {
         this.close()
      }
   }
   checkChecked(btn) {
      this.$el.querySelectorAll('.select__item')
         .forEach(e => e.classList.remove('checked'));
      btn.classList.add('checked');
   }
   select(target) {
      this.$valueInput.textContent = target.textContent;
      this.data.isSelect = target.textContent;
      this.$input.value = this.data.isSelect;
      this.$input.setAttribute('checked', '');
      this.close()
   }
   get hasOpen() {
      return this.$el.classList.contains('open');
   }
   toggle() {
      this.hasOpen ? this.close() : this.open();
   }
   open() {
      this.$el.classList.add('open');
   }
   close() {
      this.$el.classList.remove('open');
   }
};

export const selectDev = new Select('#selectStatus', {
   isSelect: '',
   placeholder: 'All Statuses',
   data: [
      {
         id: 1,
         name: 'Error'
      },
      {
         id: 2,
         name: 'Created'
      },
      {
         id: 3,
         name: 'Proccesing'
      },
      {
         id: 4,
         name: 'Ok'
      },
      {
         id: 5,
         name: 'Not Modified'
      },
   ]
});
export const selectStatus = new Select('#selectDev', {
   isSelect: '',
   placeholder: 'Jenny Wilson',
   data: [
      {
         id: 1,
         name: 'Bob Marley'
      },
      {
         id: 2,
         name: 'Bulgarkov Michael'
      },
      {
         id: 3,
         name: 'Erich Maria Remarque'
      },
      {
         id: 4,
         name: 'Stefan Zweig'
      },
   ]
}); // initialization select 


export const selectNum = new Select('#selectNum', {
   isSelect: '',
   placeholder: '10',
   data: [
      {
         id: 1,
         name: '1'
      },
      {
         id: 2,
         name: '2'
      },
   ]
}); // initialization select  







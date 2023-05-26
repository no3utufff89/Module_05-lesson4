import createButtonsGroup from "./createButtonsGroup.js";

export const creteTable = () => {
    const  table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
        <tr>
        
        <th>Редактировтаь</th>
        <th class="th-name">Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
        
        </tr>`);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;
    return table;
};

export const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
        <button class ="close" type="button"></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class="form-group">
            <label class="form-label" for="name">Имя:</label>
            <input class="form-input" name="name" id="name" type="text" required>
        </div>
         <div class="form-group">
            <label class="form-label" for="surname">Фамилия:</label>
            <input class="form-input" name="surname" id="surname" type="text" required>
        </div>
         <div class="form-group">
            <label class="form-label" for="phone">Телефон:</label>
            <input class="form-input" name="phone" id="phone" type="number" required>
        </div>
        `);
    const btnGroup = createButtonsGroup([
        {
            className:'btn btn-primary mr-3',
            type:'submit',
            text:'Добавить',
        },
        {
            className:'btn btn-danger close-btn',
            type:'reset',
            text:'Отмена',
        },
    ]);
    form.append(...btnGroup.btns);
    overlay.append(form);
    const closeBtn = form.querySelector('.close');
    return {
        overlay,
        form,
        closeBtn


    }

};
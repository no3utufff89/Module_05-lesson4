'use strict';
const data = [
    {
        name: 'Иван',
        surname: 'Петров',
        phone: '+79514545454',
    },
    {
        name: 'Игорь',
        surname: 'Семёнов',
        phone: '+79999999999',
    },
    {
        name: 'Семён',
        surname: 'Иванов',
        phone: '+79800252525',
    },
    {
        name: 'Мария',
        surname: 'Попова',
        phone: '+79876543210',
    },
];
import createContainer from './modules/createContainer.js';
import createHeader from  './modules/createHeader.js';
import createFooter from './modules/createFooter.js';
import createFooterInfo from './modules/createFooterInfo.js';
{
    const createLogo = (title) => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефоннный справочник ${title}`;
        return h1;
    };
    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;
        return main;
    }
    const createButtonsGroup = (params) => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');
        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.type = type;
            button.textContent = text;
            button.className = className;
            return button;
        })
        btnWrapper.append(...btns);
        return {
            btnWrapper,
            btns,
        };
    };
    const creteTable = () => {
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

    const createForm = () => {
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
    const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const btnGroup = createButtonsGroup([
        {
            className:'btn btn-primary mr-3',
            type:'button',
            text:'Добавить',
        },
        {
            className:'btn btn-danger',
            type:'button',
            text:'Удалить',
        },
    ]);
    const table = creteTable();
    const form = createForm();
    const footer = createFooter();
    const footerInfo = createFooterInfo(title);
    header.headerContainer.append(logo)
    main.mainContainer.append(btnGroup.btnWrapper, table, form.overlay);
    footer.footerContainer.append(footerInfo);
    app.append(header, main, footer)

        return {
            list: table.tbody,
            listHead: table.tHead,
            logo,
            btnAdd: btnGroup.btns[0],
            btnDel:btnGroup.btns[1],
            formOverlay: form.overlay,
            form: form.form,
            closeBtn: form.closeBtn,



        }
    };

    const createRow = ({name:firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdControl = document.createElement('td');
    tdControl.classList.add('control');
    const btnDel = document.createElement('button');
    const btnChange = document.createElement('button');
    tdControl.append(btnDel,btnChange);
    btnDel.classList.add('mr-3','del-icon');
    btnDel.title = 'Удалить'
    btnChange.classList.add('changeBtn');
    btnChange.title = 'Редактировать';

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    tdName.classList.add('td-Name');
    const tdSurName = document.createElement('td');
    tdSurName.textContent = surname;
    tdSurName.classList.add('td-sur-name');
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    tr.append(tdControl, tdName,tdSurName,tdPhone);

    return tr;
}
    const renderContacts = (elem,data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);

        return allRow;
    };
    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    }


    const init = (selectorApp, tittle) => {
        const app = document.querySelector(selectorApp);
        const phoneBook = renderPhoneBook(app, tittle);
        const { list, logo, btnAdd, btnDel, formOverlay, form, closeBtn, listHead} = phoneBook;
        // Функционал
        const allRow = renderContacts(list, data);
       hoverRow(allRow, logo);



        btnAdd.addEventListener('click', () => {
            formOverlay.classList.add('is-visible');
        });


        listHead.addEventListener('click',(e)=>{
            let target = e.target;
            if (target.closest('.th-name')) {
                console.log('Кликкк')
            }
        });

        formOverlay.addEventListener('click', (e) => {
            let target = e.target;
            if (target === closeBtn) {
                formOverlay.classList.remove('is-visible')
            } else if (target === formOverlay || target.closest('.close-btn')) {
                formOverlay.classList.remove('is-visible')
            }
        });
        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.del-icon').forEach(elem => {
                elem.classList.toggle('del-icon_visible')
            })
        });
        list.addEventListener('click', (e) => {
            if (e.target.closest('.del-icon')) {
                e.target.closest('.contact').remove();

            }
        })


    };
    window.phoneBookInit = init;
}
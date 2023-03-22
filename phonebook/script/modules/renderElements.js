import {createFooter, createFooterInfo, createHeader, createLogo, createMain} from "./elementsBuilder.js";
import createButtonsGroup from "./createButtonsGroup.js";
import * as createInterface from "./createInterface.js";

export const renderPhoneBook = (app, title) => {
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
    const table = createInterface.creteTable();
    const {form, overlay} = createInterface.createForm();
    const footer = createFooter();
    const footerInfo = createFooterInfo(title);
    header.headerContainer.append(logo)
    main.mainContainer.append(btnGroup.btnWrapper, table, overlay);
    footer.footerContainer.append(footerInfo);
    app.append(header, main, footer)

    return {
        table,
        list: table.tbody,
        listHead: table.tHead,
        logo,
        btnAdd: btnGroup.btns[0],
        btnDel:btnGroup.btns[1],
        formOverlay: overlay,
        form,
        closeBtn: form.closeBtn,



    }

};

export const createRow = ({name:firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    // tr.id = phone;
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
    phoneLink.classList.add('phone-number')
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    tr.append(tdControl, tdName,tdSurName,tdPhone);

    return tr;
}
export const renderContacts = (elem,data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};

export const hoverRow = (allRow, logo,list) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
        contact.addEventListener('mouseenter', () => {
            logo.textContent = contact.phoneLink.textContent;
        });
        contact.addEventListener('mouseleave', () => {
            logo.textContent = text;
        });
    });

} ;
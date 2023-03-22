const data = [];

import {getStorage} from './modules/storageActions.js';
import {renderPhoneBook,
        renderContacts,
        hoverRow,} from './modules/renderElements.js'
import {modalControl,
        deleteControl,
        formControl,} from './modules/controls.js'
{
    const init = (selectorApp, tittle) => {
        const app = document.querySelector(selectorApp);
        const { list, logo, btnAdd, btnDel, formOverlay, form, closeBtn,table} = renderPhoneBook(app, tittle);
        // Функционал
        const allRow = renderContacts(list, getStorage('data'));
        const {closeModal} =  modalControl(btnAdd, formOverlay,closeBtn);

        deleteControl(btnDel, list);
        formControl(form, list, closeModal,allRow,logo);
        hoverRow(allRow, logo,list);
    };
    window.phoneBookInit = init;
}
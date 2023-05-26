import {removeStorage, setStorage} from "./storageActions.js";
import {createRow} from "./renderElements.js";

export const modalControl = (btnAdd, formOverlay, closeBtn) => {

    const openModal =() => {
        formOverlay.classList.add('is-visible');
    };
    const closeModal =() => {
        formOverlay.classList.remove('is-visible')
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
        let target = e.target;
        if (target === closeBtn) {
            closeModal();
        } else if (target === formOverlay ||
            target.closest('.close-btn') ||
            target.closest('.close')) {
            closeModal();
        }
    });
    return {
        closeModal,
    }
};
export const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.del-icon').forEach(elem => {
            elem.classList.toggle('del-icon_visible')
        })
    });
    list.addEventListener('click', (e) => {
        const target = e.target;
        if (target.closest('.del-icon')) {
            removeStorage(target.closest('.contact')
                .querySelector('a').textContent);
            target.closest('.contact').remove();
        };
    })
};
export const addContactPage =(newContact, list) => {
    list.append(createRow(newContact));
}
export const formControl = (form,list, closeModal) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);
        setStorage('data', JSON.stringify(newContact));
        addContactPage(newContact, list);
        form.reset();
        closeModal();
    })
}
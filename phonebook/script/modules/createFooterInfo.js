const createFooterInfo = (title) => {
    const h2 = document.createElement('h2');
    h2.classList.add('small');
    h2.textContent = `Все права защищены © ${title}`;
    return h2;
};
export  default createFooterInfo;
import image from '../../img/icon.svg';

export const createImageLogo = () => {
    const img = document.createElement('img');
    img.src = image;
    return img;
};
export const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
};

export const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
};

export const createFooterInfo = (title) => {
    const h2 = document.createElement('h2');
    h2.classList.add('small');
    h2.textContent = `Все права защищены © ${title}`;
    return h2;
};

export const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
};

export const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефоннный справочник ${title}`;
    return h1;
};

export const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
}

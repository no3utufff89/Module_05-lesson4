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
export  default createButtonsGroup;
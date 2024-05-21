// 썸네일 + 간략한설명 추출
const getContnets = (post: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post;

    return {
        getImg: () => {
            const imgSelect = tempDiv.querySelector('img');
            return imgSelect ? imgSelect.getAttribute('src') : null;
        },
        getText: () => {
            const text = tempDiv.textContent;
            if (text) {
                return text.slice(0, 200);
            }
        },
    };
};

export { getContnets };

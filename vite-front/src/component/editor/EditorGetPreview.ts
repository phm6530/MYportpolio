import { ENDPOINT_URL } from 'constants/apiUrl';

// 썸네일 + 간략한설명 추출
const EditorGetPreview = (post: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post;

    return {
        getImg: (): string | null => {
            const imgSelect = tempDiv.querySelector('img');
            if (imgSelect) {
                const selectThumbNail = imgSelect.getAttribute('src');
                if (selectThumbNail) {
                    return selectThumbNail.replace(`${ENDPOINT_URL}/`, '');
                }
                return null;
            }
            return null;
        },
        getText: () => {
            const text = tempDiv.textContent;
            if (text) {
                return text.slice(0, 200);
            }
        },
        getPost: () => {
            const imgs = tempDiv.querySelectorAll('img');
            imgs.forEach(img => {
                const src = img.getAttribute('src');
                if (src) {
                    img.setAttribute(
                        'src',
                        src.replace(`${ENDPOINT_URL}/`, ''),
                    );
                }
            });
            return tempDiv.innerHTML;
        },
    };
};

export { EditorGetPreview };

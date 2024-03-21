import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const useTextsnap = text => {
    const textRef = useRef(null);
    console.log(textRef.current);
    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { innerHTML: 0 },
                {
                    innerHTML: text,
                    duration: 2,
                    snap: { innerHTML: 1 },
                },
            );
        }
    }, [text]);

    return textRef;
};

export default useTextsnap;

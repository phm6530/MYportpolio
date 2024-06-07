import { useEffect } from 'react';

const Star = () => {
    class star {
        x: number;
        y: number;
        size: number;
        time: number;

        constructor(x = 0, y = 0, size = 0, time = 0) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.time = time;
        }

        set() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 12;
            this.time = Math.random() * 8;

            const background = document.getElementById('main');
            const starDiv = document.createElement('div');
            starDiv.className = 'star';

            starDiv.style.position = 'absolute';
            starDiv.style.left = this.x + 'px';
            starDiv.style.top = this.y + 'px';
            starDiv.style.width = this.size + 'px';
            starDiv.style.height = this.size + 'px';
            starDiv.style.backgroundColor = 'white';
            starDiv.style.filter = 'blur(5px)';
            starDiv.style.animation = `blink ${this.time}s steps(5) infinite`;

            background?.appendChild(starDiv);
        }
    }
    useEffect(() => {
        for (let i = 0; i < 15; i++) {
            const newStar = new star();
            newStar.set();
        }
    }, []);

    return <></>;
};

export default Star;

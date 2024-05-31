import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

type MotionChildren = ReactNode;

interface MotionProps {
    className?: string;
    children: MotionChildren;
    delay?: number;
}

export const FadeUp: React.FC<MotionProps> = ({
    className,
    children,
    delay = 0,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: delay, // delay 옵션 적용
                ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
            }}
        >
            {children}
        </motion.div>
    );
};

export const FadeInOut: React.FC<MotionProps> = ({ className, children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
            }}
        >
            {children}
        </motion.div>
    );
};

export const Page: React.FC<MotionProps> = ({ className, children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                // 여기에 예시 큐빅 베지어 값을 설정할 수 있습니다.
            }}
        >
            {children}
        </motion.div>
    );
};

const Motion: {
    FadeUp: React.FC<MotionProps>;
    FadeInOut: React.FC<MotionProps>;
    Page: React.FC<MotionProps>;
} = {
    FadeUp: FadeUp,
    FadeInOut: FadeInOut,
    Page: Page,
};

export default Motion;

Motion.FadeInOut = FadeInOut;
Motion.Page = Page;
Motion.FadeUp = FadeUp;

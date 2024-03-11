import { motion } from 'framer-motion';

export function Page({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{
                duration: 0.4,
                // ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
            }}
        >
            {children}
        </motion.div>
    );
}

export function FadeInOut({ children }) {
    return (
        <motion.div
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
}

export default function Motion({ children }) {
    return <>{children}</>;
}

Motion.FadeInOut = FadeInOut;
Motion.Page = Page;

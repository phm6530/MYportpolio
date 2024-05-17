import { motion } from 'framer-motion';

export function Page({ className, children }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                // 예시 큐빅 베지어 값
            }}
        >
            {children}
        </motion.div>
    );
}
export function FadeUp({ className, delay, children }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99], // 예시 큐빅 베지어 값
            }}
        >
            {children}
        </motion.div>
    );
}

export function FadeInOut({ className, children }) {
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
}

export default function Motion({ children }) {
    return <>{children}</>;
}

Motion.FadeInOut = FadeInOut;
Motion.Page = Page;
Motion.FadeUp = FadeUp;

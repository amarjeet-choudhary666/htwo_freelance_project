import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
    smooth?: boolean;
    delay?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
    smooth = true,
    delay = 0
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: smooth ? 'smooth' : 'auto'
            });
        };

        if (delay > 0) {
            // Add a small delay to ensure the page has rendered
            const timeoutId = setTimeout(scrollToTop, delay);
            return () => clearTimeout(timeoutId);
        } else {
            scrollToTop();
        }
    }, [pathname, smooth, delay]);

    return null;
};

export default ScrollToTop;
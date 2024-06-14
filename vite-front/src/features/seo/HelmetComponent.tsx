import { IMG_URL } from 'constants/apiUrl';
import { Helmet } from 'react-helmet-async';

interface HelmetProps {
    title?: string;
    ogImage?: string;
    description: string;
    keyword?: string;
}

const DEFAULT_META_IMG = `${IMG_URL}/metaImg.jpg`;
const currentUrl = window.location.href;
const defaultUrl =
    '프론트엔드, frontEnd , backend, 퍼블리셔 , 포트폴리오 , portpolio , 개발블로그';
const defaultTitle = 'FRONT END & Web Publisher';

const HelmetComponent: React.FC<HelmetProps> = ({
    title,
    ogImage,
    description,
    keyword,
}) => {
    const metaImg = ogImage ? `${IMG_URL}/${ogImage}` : DEFAULT_META_IMG;
    return (
        <Helmet>
            <title>{title || defaultTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keyword || defaultUrl} />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={defaultTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImg} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default HelmetComponent;

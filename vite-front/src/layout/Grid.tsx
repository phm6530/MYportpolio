import { device } from 'config/DeviceConfig';
import styled from 'styled-components';

const CenteredGrid = styled.div`
    max-width: 1180px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
`;

const BannerCenteredGrid = styled.div`
    padding-top: 12.5rem;
    padding-bottom: 6rem;
    /* padding-top: 10.5rem;
    padding-bottom: 2rem; */
    margin-left: 4rem;
    position: relative;
    margin: 0 auto;
    width: 1180px;

    @media ${device.laptop} {
        margin-left: 1rem;
    }
`;

const MainSpacer = styled.div`
    margin: 0 20px;
`;

const LayoutSpacer = styled.div`
    margin: 0 20px;
    flex-grow: 1;
    width: 100%;
    justify-content: space-between;
    display: flex;
    margin: 0 auto;
    align-items: flex-start;
`;

const BannerSpacer = styled.div`
    margin: 0 20px;
    flex-grow: 1;
    width: 100%;
`;

const PageCenteredGrid = styled(CenteredGrid)`
    display: flex;
    flex-direction: column;
`;

const PageWrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
`;

const Grid = ({ children }: { children: React.ReactNode }) => {
    return (
        <CenteredGrid>
            <MainSpacer>{children}</MainSpacer>
        </CenteredGrid>
    );
};

const PageGrid = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageCenteredGrid>
            <LayoutSpacer>{children}</LayoutSpacer>
        </PageCenteredGrid>
    );
};

const PageBannerGrid = ({ children }: { children: React.ReactNode }) => {
    return (
        <BannerCenteredGrid>
            <BannerSpacer>{children}</BannerSpacer>
        </BannerCenteredGrid>
    );
};

const FooterGrid = ({ children }: { children: React.ReactNode }) => {
    return (
        <CenteredGrid>
            <BannerSpacer>{children}</BannerSpacer>
        </CenteredGrid>
    );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return <PageWrapperStyle>{children}</PageWrapperStyle>;
};

export {
    Grid,
    FooterGrid,
    BannerCenteredGrid,
    LayoutSpacer,
    PageGrid,
    PageBannerGrid,
    PageWrapper,
};

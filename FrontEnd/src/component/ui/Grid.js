import styled from 'styled-components';

const CenteredGrid = styled.div`
    width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const BannerCenteredGrid = styled.div`
    width: 1280px;
    margin: 0 auto;
    padding-top: 12.5rem;
    position: relative;
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
`;

const BannerSpacer = styled.div`
    margin: 0 20px;
    flex-grow: 1;
    width: 100%;
`;

const PageCenteredGrid = styled(CenteredGrid)`
    display: flex;
    justify-content: space-between;
`;

const Grid = ({ children }) => {
    return (
        <CenteredGrid>
            <MainSpacer>{children}</MainSpacer>
        </CenteredGrid>
    );
};

const PageGrid = ({ children }) => {
    return (
        <PageCenteredGrid>
            <LayoutSpacer>{children}</LayoutSpacer>
        </PageCenteredGrid>
    );
};

const PageBannerGrid = ({ children }) => {
    return (
        <BannerCenteredGrid>
            <BannerSpacer>{children}</BannerSpacer>
        </BannerCenteredGrid>
    );
};

const FooterGrid = ({ children }) => {
    return (
        <CenteredGrid>
            <BannerSpacer>{children}</BannerSpacer>
        </CenteredGrid>
    );
};

export {
    Grid,
    FooterGrid,
    BannerCenteredGrid,
    LayoutSpacer,
    PageGrid,
    PageBannerGrid,
};

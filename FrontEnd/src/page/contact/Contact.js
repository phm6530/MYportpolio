import DashBoard from '../../component/ui/DashBoard';
import { PageGrid } from '../../component/ui/Grid';
import BannerCommon from '../../component/ui/BannerCommon';
import styled from 'styled-components';
import MailComponent from './component/MailComponent';
import CommonNav from '../common/CommonNav';

const ContentsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export default function Contact() {
    return (
        <>
            <DashBoard pageTitle={'CONTACT'} />
            <PageGrid>
                <ContentsWrap>
                    <CommonNav />
                    <MailComponent />
                </ContentsWrap>
            </PageGrid>
        </>
    );
}

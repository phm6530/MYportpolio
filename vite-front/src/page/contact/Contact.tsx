import DashBoard from 'component/ui/DashBoard';
import { PageGrid } from '@layout/Grid';
import styled from 'styled-components';
import MailComponent from '@features/contact/MailComponent';
import ContactAboutme from '@features/contact/ContactAboutme';

const ContentsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export default function Contact(): JSX.Element {
    return (
        <>
            <DashBoard pageTitle={'CONTACT'} />
            <PageGrid>
                <ContentsWrap>
                    <ContactAboutme />
                    <MailComponent />
                </ContentsWrap>
            </PageGrid>
        </>
    );
}

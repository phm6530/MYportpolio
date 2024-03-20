import SelectBox from 'component/ui/SelectBox';
import styled from 'styled-components';

const SummaryHeaderStyle = styled.div`
    width: 100%;
`;

const select = ['today', 'Week'];

const SummaryHeader = ({ setViewRage }) => {
    return (
        <SummaryHeaderStyle>
            <SelectBox option={select} setViewRage={setViewRage} />
        </SummaryHeaderStyle>
    );
};

export default SummaryHeader;

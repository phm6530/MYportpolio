import SelectBox from 'component/ui/SelectBox';
import styled from 'styled-components';

const SummaryHeaderStyle = styled.div`
    width: 100%;
`;

const select = ['Today', 'Week'];

const SummaryHeader = () => {
    return (
        <SummaryHeaderStyle>
            <SelectBox option={select} />
        </SummaryHeaderStyle>
    );
};

export default SummaryHeader;

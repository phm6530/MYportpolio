import SelectBox from 'component/ui/SelectBox';
import styled from 'styled-components';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ReactRouteDom } from 'lib/lib';
const { useNavigate } = ReactRouteDom;

const SummaryHeaderStyle = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const Button = styled.button`
    padding: 0.3rem 1.2rem;
    margin-right: 0.4rem;
    font-size: 12px;
    border-radius: 2rem;
    color: rgba(114, 100, 239, 1);
    border: 1px solid transparent;
    ${props =>
        props.$active &&
        'font-weight: bold; border: 1px solid rgba(114, 100, 239, .3);'};
`;

const Link = styled.div`
    display: inline-flex;
    align-items: center;
    color: rgb(29 6 231);
    font-size: 0.9rem;
    margin-right: 1rem;
    cursor: pointer;
`;

const MarginLeft = styled.div`
    margin-left: auto;
`;

const select = ['today', 'Week'];

const SummaryHeader = ({ viewRage, setViewRage }) => {
    return (
        <SummaryHeaderStyle>
            {select.map((e, idx) => {
                return (
                    <Button
                        type="button"
                        key={idx}
                        onClick={() => setViewRage(e)}
                        $active={viewRage === e}
                    >
                        {e === 'today' ? '오늘' : '이번주'}
                    </Button>
                );
            })}

            {/* <button>자세히보기</button> */}
            {/* {selectDays && selectDays.map(e => e)} */}
            {/* <SelectBox option={select} setViewRage={setViewRage} /> */}
        </SummaryHeaderStyle>
    );
};

export default SummaryHeader;

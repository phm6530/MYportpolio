import { FlexColumnDiv, SubTitleTextStyle } from 'features/CommonStyles';
import styled from 'styled-components';
import { PercentCalculator } from 'utils/Calculator';

import usePrograssbar from 'hooks/usePrograssbar';
import useTextsnap from 'hooks/useTextsnap';
import { FlexRow } from 'component/CommonStyle';
import { TbDeviceImacSearch } from 'react-icons/tb';
import { IoFitnessOutline } from 'react-icons/io5';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
// const getBackgroundColor = percent => {
//     if (percent < 30) return 'red';
//     else if (percent >= 30 && percent < 60) return 'orange';
//     else return 'green';
// };

const PrograssbarStyle = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 1rem;
    position: relative;
    background: #eeeeee;
    border-radius: 5px;

    .bar {
        border-radius: 1rem;
        height: 10px;
        position: absolute;
        left: 0;
        width: 0;
        z-index: 1;
        background: red;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
        background: linear-gradient(90deg, #b7a9ff 0%, #e594c7 100%);
        border-radius: 10px;
    }
`;

const Percent = styled.div`
    position: absolute;
    right: -20px;
    bottom: calc(100% + 10px);
    /* Rectangle 459 */

    box-sizing: border-box;
    ${props => props.$percentZero && 'display: none'};

    color: #fff;
    background: #3e3866;
    box-shadow: 4px 4px 12.4px rgba(228, 233, 237, 0.75);
    border-radius: 14px;
    width: 45px;
    text-align: center;
    font-size: 12px;
    span {
        color: #fff;
        display: inline-block;
    }
    .shape {
        width: 0;
        height: 0;
        position: absolute;
        left: 50%;
        top: calc(100% + 7px);
        transform: translate(-50%, -50%);
        border-top: 10px solid #3e3866; /* 왼쪽 테두리 */
        border-left: 5px solid transparent; /* 왼쪽 테두리 */
        border-right: 5px solid transparent; /* 오른쪽 테두리 */
        border-bottom: 10px solid transparent; /* 아래쪽 테두리 */
    }
`;

const CompleteStyle = styled.div`
    color: #4dacd2;
    font-size: 20px;
    display: inline-block;
    padding: 0 0.4rem;
    margin: 0;
    border-radius: 1rem;
    margin-right: auto;

    opacity: 0;
    transition: opacity 0.5s ease;
    ${props => {
        return props.$active && `opacity: 1`;
    }};
`;

const CategoryIconStyle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 5px solid rgba(0, 0, 0, 0.05);
    margin-right: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 21px;
    }
    ${props => {
        switch (props.$catecory) {
            case 'Study':
                return 'background : rgb(233 238 245); color: #748295;';
            case 'Fitness':
                return 'background : rgb(238 237 251); color: #748295;';
            case 'Coding':
                return 'background : rgb(254 234 241); color: #748295;';
            default:
                return 'red';
        }
    }};
`;

const CustumFlexRow = styled(FlexRow)`
    margin-bottom: 1rem;
`;

export default function PrograssBar({ tasks }) {
    const { result: percent } = PercentCalculator(tasks);

    const PrograssRef = usePrograssbar(percent);
    const textRef = useTextsnap(percent);
    // useEffect(() => {
    //     // console.log(ref);
    //     const io = new IntersectionObserver(
    //         entry => {
    //             if (entry[0].isIntersecting) {
    //                 // console.log('발견');
    //             }
    //         },
    //         { threshold: 0.1 },
    //     );
    //     if (ref) {
    //         io.observe(ref.current);
    //     }

    //     return () => {
    //         io.disconnect(ref.current);
    //     };
    // }, []);

    // console.log(tasks);
    const CategoryIcon = ({ catecory }) => {
        const Icon = catecory => {
            switch (catecory) {
                case 'Study':
                    return <HiOutlinePencilSquare />;
                case 'Fitness':
                    return <IoFitnessOutline />;
                case 'Coding':
                    return <TbDeviceImacSearch />;
            }
        };
        return (
            <CategoryIconStyle $catecory={catecory}>
                {Icon(catecory)}
            </CategoryIconStyle>
        );
    };
    return (
        <CustumFlexRow>
            <CategoryIcon catecory={tasks[0].category} />

            <FlexColumnDiv>
                <SubTitleTextStyle>
                    <span className="categoryTitle">{tasks[0].category}</span>
                    <CompleteStyle $active={percent === 100}>
                        <IoIosCheckmarkCircleOutline />
                    </CompleteStyle>
                </SubTitleTextStyle>

                <PrograssbarStyle $catecory={tasks[0].category}>
                    <div
                        ref={PrograssRef} //프로그래스바 커스텀훅
                        className="bar"
                        aria-valuenow={percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <Percent $percentZero={percent === 0}>
                            <span ref={textRef}></span>%
                            <span className="shape"></span>
                        </Percent>
                    </div>
                </PrograssbarStyle>
            </FlexColumnDiv>
        </CustumFlexRow>
    );
}

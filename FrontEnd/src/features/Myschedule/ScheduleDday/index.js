import SubTitle from 'component/ui/Subtitle';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdCancel } from 'component/icon/Icon';
import {
    Navigation,
    Pagination,
    Scrollbar,
    FreeMode,
    Autoplay,
    EffectCreative,
} from 'swiper/modules';
// Swiper modules 활성화

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useAuthCheck } from 'hooks/useAuthCheck';
import { fetchDeleteSchedule } from 'services/ScheduleService';
import useExcuteMutation from 'hooks/useExcuteMutation';
import usePopup from 'hooks/usePopup';

const SwiperStyle = styled(Swiper)`
    /* width: 200px; */
`;

const SummeryStyle = styled.div`
    overflow: hidden;
    border-radius: 1em;
    /* width: 772px; */
    background: #fff;
`;

const DdayArrtyle = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border-radius: 0.5em;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 14px;

    padding: 0.5rem 1rem;
    p {
        font-size: 14px;
        margin-top: 0.4rem;
    }
    span {
        font-weight: bold;
        font-size: 16px;
    }
`;

const DdayHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .countNum {
        font-size: 18px;
        letter-spacing: -0.07em;
        color: #565b68;
    }
    svg {
        cursor: pointer;
        opacity: 0.4;
        color: #8f9db8;
        &:hover {
            color: #384867;
        }
    }
`;

const ScheduleDdayList = ({ DdayArr }) => {
    const { clientAuthCheck } = useAuthCheck();
    const { showPopup, PopupComponent } = usePopup();
    const DdayTask = ({ task }) => {
        // const { modal, setModal, mutateAsync } = useProjectActions({
        //     type: 'Schedule',
        // });
        const { work, schedule_key, formatted_date } = task;
        const currentDate = new Date();
        const taskDate = new Date(formatted_date);
        const dayDifference = (currentDate - taskDate) / (1000 * 3600 * 24);
        const count = Math.ceil(dayDifference);

        // console.log(work);
        const { mutate: deleteMutate } = useExcuteMutation(
            fetchDeleteSchedule,
            ['Schedule'],
            '삭제',
        );

        const deleteHandler = () => {
            if (!clientAuthCheck('삭제')) {
                return;
            }
            deleteMutate(schedule_key);
        };

        return (
            <>
                <PopupComponent id="deleteSchedule" event={deleteHandler} />

                <DdayArrtyle>
                    {/* <img src="/img/calendar/talk.png" alt="" /> */}
                    <DdayHeader>
                        <span className="countNum">D {count}</span>
                        <span
                            onClick={() => {
                                showPopup(work);
                            }}
                        >
                            <MdCancel />
                        </span>
                    </DdayHeader>
                    <p>{work}</p>
                </DdayArrtyle>
            </>
        );
    };

    return (
        <>
            {/* <SubTitleSchedule>D - Day</SubTitleSchedule> */}
            <SummeryStyle>
                <SwiperStyle
                    modules={[
                        Navigation,
                        Pagination,
                        FreeMode,
                        Autoplay,
                        EffectCreative,
                    ]}
                    // spaceBetween={10}
                    slidesPerView={1}
                    // centeredSlides={true}
                    // slidesOffsetBefore={50} // 첫 슬라이드 앞의 여백
                    // slidesOffsetAfter={50} // 마지막 슬라이드 뒤의 여백
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={swiper => console.log(swiper)}
                    // navigation
                    // loop={true}
                    // freeMode={true}
                    // autoplay={true}
                    pagination={{ clickable: true }}

                    // scrollbar={{ draggable: true }}
                >
                    {DdayArr &&
                        DdayArr.map((task, idx) => {
                            return (
                                <SwiperSlide key={`DdayTask-${idx}`}>
                                    <DdayTask task={task} />
                                </SwiperSlide>
                            );
                        })}
                </SwiperStyle>
            </SummeryStyle>
        </>
    );
};

export default ScheduleDdayList;

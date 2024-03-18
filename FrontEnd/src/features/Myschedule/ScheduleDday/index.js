import SubTitle from 'component/ui/Subtitle';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import useProjectActions from 'hooks/useProjectActions';
import Popup from 'component/popup/Popup';
import Confirm from 'component/ui/Confirm';

const SwiperStyle = styled(Swiper)`
    overflow: visible;
    .swiper-slide {
        transition: width 0.3s; /* 너비 변경 시 부드럽게 전환되도록 설정 */
        flex-grow: 1;
    }

    .swiper-slide-active {
        width: 50% !important; /* 활성화된 슬라이드의 너비를 늘림 */
        div {
            width: 100%;
        }
    }
`;

const SummeryStyle = styled.div`
    overflow: hidden;
    border-radius: 1em;
    flex-grow: 1;
    background: #fff;
    margin-right: 1.5rem;
    padding: 1rem;
`;

const DdayTaskStyle = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border-radius: 0.5em;
    /* background: linear-gradient(90deg, #6f58b0 0%, #5147ab 100%); */
    padding: 1rem;
    /* border-radius: 32px; */
    /* Rectangle 33 */
    /* transition: width 1s; */

    p {
        font-size: 14px;
        padding-bottom: 6px;
    }
    span {
        font-weight: bold;
        font-size: 16px;
    }
`;
// const SwiperSlideStyled = styled.div`
//     .swiper-slide {
//         width: 100px; /* 기본 너비 */
//         transition: width 0.3s; /* 너비 변경 시 부드럽게 전환되도록 설정 */
//     }

//     .swiper-slide-active {
//         width: 150px; /* 활성화된 슬라이드의 너비를 늘림 */
//     }
// `;

const DdayHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .countNum {
        font-size: 22px;
        line-height: 27px;
        letter-spacing: -0.07em;
        color: #6859a4;
    }
`;

const ScheduleDdayList = ({ DdayTasks }) => {
    const DdayTask = ({ task }) => {
        const { modal, setModal, mutateAsync } = useProjectActions({
            type: 'schedule',
        });
        const { work, schedule_key, formatted_date } = task;
        const currentDate = new Date();
        const taskDate = new Date(formatted_date);
        const dayDifference = (currentDate - taskDate) / (1000 * 3600 * 24);
        const count = Math.ceil(dayDifference);

        return (
            <>
                {modal && (
                    <Popup closePopup={() => setModal(false)}>
                        <Confirm
                            confirm={() => mutateAsync(schedule_key)}
                        ></Confirm>
                    </Popup>
                )}

                <DdayTaskStyle>
                    {/* <img src="/img/calendar/talk.png" alt="" /> */}
                    <DdayHeader>
                        <span className="countNum">D {count}</span>
                        <span onClick={() => setModal(true)}>삭제</span>
                    </DdayHeader>
                    <p>{work}</p>
                </DdayTaskStyle>
            </>
        );
    };

    return (
        <>
            <SummeryStyle>
                {/* <SwiperStyle
                    modules={[Navigation, Pagination, FreeMode, Autoplay, EffectCreative]}
                    spaceBetween={30}
                    slidesPerView={3}
                    // centeredSlides={true}
                    // slidesOffsetBefore={50} // 첫 슬라이드 앞의 여백
                    slidesOffsetAfter={50} // 마지막 슬라이드 뒤의 여백
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={swiper => console.log(swiper)}
                    navigation
                    loop={true}
                    // freeMode={true}
                    // autoplay={true}
                    pagination={{ clickable: true }}

                    // scrollbar={{ draggable: true }}
                >
                      </SwiperStyle> */}
                {DdayTasks &&
                    DdayTasks.map((task, idx) => {
                        return <DdayTask key={`DdayTask-${idx}`} task={task} />;
                    })}
            </SummeryStyle>
        </>
    );
};

export default ScheduleDdayList;

import SubTitle from 'component/ui/Subtitle';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, FreeMode, Autoplay, EffectCreative } from 'swiper/modules';
// Swiper modules 활성화

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
    background: #fff;
    overflow: hidden;
    border-radius: 1em;
    flex-grow: 1;
    padding: 2rem;
    width: 60%;
    margin-left: 1rem;
`;

const DdayTaskStyle = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 15px;
    border-radius: 0.5em;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

    /* background: linear-gradient(90deg, #6f58b0 0%, #5147ab 100%); */
    box-shadow: 13px 20px 25.9px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    /* Rectangle 33 */
    transition: width 1s;
    /* 옅은 */
    background: linear-gradient(45deg, #9070eb 0%, #7a2e87 100%);
    background: linear-gradient(45deg, #786ea1 -17%, #353a55, #353a55 100%);
    width: 173px;
    height: 197px;
    img {
        width: 40px;
        filter: drop-shadow(2px 4px 6px black);
    }
    p {
        color: #fff;
        font-size: 14px;
        padding-bottom: 6px;
    }
    span {
        color: #fff;
        font-weight: bold;
        font-size: 25px;
    }
`;
const SwiperSlideStyled = styled.div`
    .swiper-slide {
        width: 100px; /* 기본 너비 */
        transition: width 0.3s; /* 너비 변경 시 부드럽게 전환되도록 설정 */
    }

    .swiper-slide-active {
        width: 150px; /* 활성화된 슬라이드의 너비를 늘림 */
    }
`;

const ScheduleDdayList = ({ DdayTasks }) => {
    const DdayTask = ({ task }) => {
        const { work, schedule_key, formatted_date } = task;
        const currentDate = new Date();
        const taskDate = new Date(formatted_date);
        const dayDifference = (currentDate - taskDate) / (1000 * 3600 * 24);
        const count = Math.ceil(dayDifference);
        return (
            <DdayTaskStyle>
                <img src="/img/calendar/talk.png" alt="" />
                <span>D {count}</span>
                <p>{work}</p>
                {/* <span>{formatted_date}</span> */}
            </DdayTaskStyle>
        );
    };

    return (
        <>
            <SummeryStyle>
                <SubTitle>
                    <div className="subText">
                        <div className="point">MY SCHEDULES</div>
                    </div>
                </SubTitle>

                <SwiperStyle
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
                    {DdayTasks &&
                        DdayTasks.map((task, idx) => {
                            return (
                                <SwiperSlide key={idx}>
                                    <DdayTask key={`DdayTask-${idx}`} task={task} />
                                </SwiperSlide>
                            );
                        })}
                </SwiperStyle>
            </SummeryStyle>
        </>
    );
};

export default ScheduleDdayList;

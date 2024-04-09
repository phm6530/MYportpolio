import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactQuery } from 'lib/lib';

import BoardCommentForm from './component/BoardCommentForm/BoardCommentForm';
import BannerCommon from '../../component/ui/BannerCommon';
import Grid from '../../component/ui/Grid';

import DashBoard from '../../component/ui/DashBoard';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import SubTitle from '../../component/ui/Subtitle';
import UserProfile from 'component/profile/UserProfile';
import BoardCommentList from './component/BoardCommentList/BoardCommentList';

import { fetchData } from './BoardFetch';
import { SpinnerLoading } from 'component/ui/loading/SpinnerLoading';

const { useQuery } = ReactQuery;

const PageText = styled.div`
    word-break: keep-all;
    margin-top: 10px;
    color: #222;
    font-size: 14px;
    padding-bottom: 20px;
`;

const BoardDashBoard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    .tester {
        width: 15rem;
        border-radius: 1em;
        height: 350px;
        margin-right: 3rem;
        box-shadow: 3px 21px 17px rgb(0 0 0 / 25%);
    }
`;

const BoardGrid = styled(Grid)`
    padding-top: 25rem;
    display: flex;
    justify-content: space-between;
`;

const RightWrap = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
    transition: all 0.5s ease;
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    /* box-shadow: 50px 80px 15px rgba(0,0,0,0.1); */
    flex-direction: column;
`;

export default function Board() {
    // 초기데이터 + 페이징 데이터 로드
    const [userFetchData, setUserFetchData] = useState([]);
    const [moreFetchData, setFetchMoreData] = useState(true);
    const [total, setTotal] = useState(0);
    const [lastPageIdx, setLastPageIdx] = useState(null);

    console.log(lastPageIdx);

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['board', lastPageIdx],
        queryFn: () => fetchData(lastPageIdx),
    });

    console.log('data::', data);

    useEffect(() => {
        if (isSuccess) {
            if (data.pageData.length === 0) {
                setFetchMoreData(false);
            }
            setTotal(data.counter);
            setUserFetchData(prev => {
                return [...prev, ...data.pageData];
            });
        }
    }, [data, isSuccess]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 부드러운 스크롤 효과 적용
        });
    }, []);

    return (
        <>
            {/* Header */}
            <DashBoard page={'board'}>
                <BannerCommon.BannerPoint>
                    <img src="img/board.png" alt="board" />
                    MY Board
                </BannerCommon.BannerPoint>
                <DashBoardTitle>
                    <b>MY PORTPOLIO, BOARD</b>
                </DashBoardTitle>
            </DashBoard>

            {/* Body */}
            <BoardGrid>
                {/* Prifile */}
                <UserProfile />

                <RightWrap id="parallex_form">
                    <BoardDashBoard>
                        <SubTitle>
                            {/* <img src="/img/board/talk.png" alt="" /> */}
                            <div className="subText">
                                <span className="point">GUEST BOARD</span>
                            </div>
                        </SubTitle>
                        <PageText>
                            brycpt를 이용하여 암호화 저장하고 있으며 해싱된
                            비밀번호 이외 어떠한 정보도 수집하지 않습니다.
                        </PageText>
                    </BoardDashBoard>

                    <BoardCommentForm
                        setTotal={setTotal}
                        setUserFetchData={setUserFetchData}
                    />

                    {/* BoardComment */}
                    {!isLoading && isError && 'error'}

                    {userFetchData && (
                        <BoardCommentList
                            userFetchData={userFetchData}
                            moreFetchData={moreFetchData}
                            total={total}
                            isLoading={isLoading}
                            setUserFetchData={setUserFetchData}
                            setLastPageIdx={setLastPageIdx}
                        />
                    )}
                    {isLoading && <SpinnerLoading />}
                </RightWrap>
            </BoardGrid>
        </>
    );
}

import styled from 'styled-components';
import { PageGrid } from '../../component/ui/Grid';
import { RightWrap } from 'features/CommonStyles';

import BoardCommentForm from 'features/Board/BoardCommentForm';
import BannerCommon from '../../component/ui/BannerCommon';

import DashBoard from '../../component/ui/DashBoard';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import SubTitle from '../../component/ui/Subtitle';
import UserProfile from 'component/profile/UserProfile';
import BoardCommentList from 'features/Board/BoardCommentList';

const PageText = styled.div`
    word-break: keep-all;
    margin-top: 10px;
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

export default function Board() {
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
            <PageGrid>
                {/* Prifile */}
                <UserProfile />

                <RightWrap>
                    <BoardDashBoard>
                        <SubTitle>
                            <div className="subText">
                                <span className="point">GUEST BOARD</span>
                            </div>
                        </SubTitle>
                        <PageText>
                            brycpt를 이용하여 암호화 저장하고 있으며 해싱된
                            비밀번호 이외 어떠한 정보도 수집하지 않습니다.
                        </PageText>
                    </BoardDashBoard>

                    {/* addForm  */}
                    <BoardCommentForm />

                    {/* BoardComment */}
                    <BoardCommentList />
                </RightWrap>
            </PageGrid>
        </>
    );
}

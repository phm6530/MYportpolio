import { BoardWrapper } from '@features/Blog/BlogStyle';
import { PageGrid, PageWrapper } from '@layout/Grid';
import Motion from 'component/animations/Motion';
import UserProfile from 'component/profile/UserProfile';
import DashBoard from 'component/ui/DashBoard';
import * as S from '@page/about/AboutStyle';
import * as ABOUTCONSTANS from 'constants/AboutConstancts';
import { SubTitle } from 'component/ui/Subtitle';
import Icon from 'component/icon/Icon';
import EmbosingButton from 'component/ui/EmbosingButton';
import { useNavigate } from 'react-router-dom';
import { HashTag } from '@style/commonStyle';

const About: React.FC = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper>
            <DashBoard
                pageTitle={'About'}
                subComment={'"퍼블리셔와 개발자 사이 그어딘가"'}
            />

            <Motion.FadeUp>
                <PageGrid>
                    <UserProfile />
                    <BoardWrapper>
                        <S.AboutMeDeps>
                            <SubTitle>
                                {/* <img src="/img/contact/dev_person_1.png" alt="dev_icon" className='dev_icon'/> */}
                                <div className="subText">
                                    <span className="point">HELLO!</span>
                                    <S.AniPoint
                                        className="point"
                                        style={{ marginRight: 'auto' }}
                                    >
                                        _
                                    </S.AniPoint>
                                </div>
                            </SubTitle>

                            <S.AboutMe>
                                <S.IconWrapper>
                                    <Icon
                                        src="/img/about/me2.png"
                                        alt="클라이언트"
                                        width={50}
                                    />
                                    안녕하세요! 퍼블리셔에서{' '}
                                    <span>FRONT END</span> 개발자를 꿈꾸는
                                    박현민입니다.
                                </S.IconWrapper>{' '}
                                <S.CertWrap>
                                    {ABOUTCONSTANS.SKILL_TAG.map((e, idx) => {
                                        return (
                                            <HashTag key={`cert_${idx}`}>
                                                # {e}
                                            </HashTag>
                                        );
                                    })}
                                </S.CertWrap>
                                <br></br>
                                <br></br>
                                <p>
                                    혼자서 능동적으로 해결하였던 문제 점들과
                                    퍼블리셔로서의 경험을 바탕으로 프론트엔드
                                    개발자로의 전환을 모색하고 있으며, 이를 통해
                                    사용자 경험을 개선하고 더 나은 사용자
                                    인터페이스를 제공하는 데 기여하고자 합니다.
                                </p>
                                <br></br>
                                <p>
                                    새로운 도전을 즐기며, 기술적 문제 해결에
                                    있어 유연한 접근을 지향합니다.
                                </p>
                                <p>
                                    이를 통해 조직의 기술적 성과를 끌어올릴 수
                                    있는 기회를 찾고자 도전하고 있습니다.
                                </p>
                                <br></br>
                                <br></br>
                                <EmbosingButton
                                    onClick={() => navigate('/board')}
                                >
                                    <Icon
                                        src="img/common/talk2.png"
                                        alt="클라이언트"
                                        width={20}
                                    />
                                    방명록에 한줄 남기기
                                </EmbosingButton>{' '}
                                <br></br>
                                <br></br>
                                <br></br>{' '}
                            </S.AboutMe>
                        </S.AboutMeDeps>
                        <S.AboutContentWrap>
                            <S.CertList>
                                <S.AboutContentsTitle>
                                    CERTIFICATE
                                </S.AboutContentsTitle>
                                <S.CertWrap>
                                    {ABOUTCONSTANS.CERTS.map((e, idx) => {
                                        return (
                                            <HashTag key={`cert_${idx}`}>
                                                {e}
                                            </HashTag>
                                        );
                                    })}
                                </S.CertWrap>
                            </S.CertList>{' '}
                            <S.CertList>
                                <S.AboutContentsTitle>
                                    Experience
                                </S.AboutContentsTitle>
                                {ABOUTCONSTANS.EXPERIENCE.map((e, idx) => {
                                    return (
                                        <S.CertItem key={`cert_${idx}`}>
                                            <S.CompanyTitle $idx={idx === 0}>
                                                {e.company}
                                            </S.CompanyTitle>
                                            <S.CompanyDate>
                                                {e.date}
                                            </S.CompanyDate>
                                            <S.WorkList>
                                                {e.workList.map((work, idx) => {
                                                    return (
                                                        <S.WorkItem
                                                            key={`work${idx}`}
                                                            style={{
                                                                marginTop:
                                                                    '10px',
                                                            }}
                                                        >
                                                            <S.Client>
                                                                {work.work}
                                                            </S.Client>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    flexDirection:
                                                                        'column',
                                                                }}
                                                            >
                                                                {work.summary.map(
                                                                    (
                                                                        item,
                                                                        idx,
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    idx
                                                                                }
                                                                            >
                                                                                {
                                                                                    item
                                                                                }
                                                                            </div>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </S.WorkItem>
                                                    );
                                                })}
                                            </S.WorkList>
                                        </S.CertItem>
                                    );
                                })}
                            </S.CertList>
                            <S.CertList>
                                <S.AboutContentsTitle>
                                    Education
                                </S.AboutContentsTitle>
                                {ABOUTCONSTANS.EDUCATION.map((e, idx) => {
                                    return (
                                        <HashTag key={`cert_${idx}`}>
                                            {e.name}
                                        </HashTag>
                                    );
                                })}
                            </S.CertList>
                            <S.CertList>
                                <S.AboutContentsTitle>
                                    AWARD
                                </S.AboutContentsTitle>
                                {ABOUTCONSTANS.AWARD.map((e, idx) => {
                                    return (
                                        <HashTag key={`cert_${idx}`}>
                                            {e}
                                        </HashTag>
                                    );
                                })}
                            </S.CertList>
                        </S.AboutContentWrap>
                    </BoardWrapper>
                </PageGrid>
            </Motion.FadeUp>
        </PageWrapper>
    );
};

export default About;

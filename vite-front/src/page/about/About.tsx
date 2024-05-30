import { BoardWrapper } from '@features/Blog/BlogStyle';
import { PageGrid } from '@layout/Grid';
import Motion from 'component/animations/Motion';
import DashBoard from 'component/ui/DashBoard';

const About: React.FC = () => {
    return (
        <>
            <DashBoard
                pageTitle={'About'}
                subComment={'"퍼블리셔와 개발자 사이 그어딘가"'}
            />
            <Motion.FadeUp>
                <PageGrid>
                    <BoardWrapper></BoardWrapper>
                </PageGrid>
            </Motion.FadeUp>
        </>
    );
};

export default About;

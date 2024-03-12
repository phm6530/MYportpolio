import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const CateGoryArea = styled.div`
    width: 100%;
`;

const Button = styled.button`
    padding: 0.4rem 1.4rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-right: 0.5rem;
    font-size: 14px;
    border-radius: 2px;
    ${props =>
        props.$active &&
        `
        
    background-color: rgba(114, 100, 239, 1);
    color: rgba(255, 255, 255, 1);

        `};
`;

export default function CateGoryButton() {
    const CateGory = ['All', '반응형', 'React', '참여율 100%'];

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [param] = useSearchParams(pathname);

    return (
        <CateGoryArea>
            {CateGory.map(e => {
                return (
                    <Button
                        $active={e === (param.get('seach') || 'All')}
                        key={`key-${e}`}
                        onClick={() => navigate(`${pathname}?seach=${e}`)}
                    >
                        {e}
                    </Button>
                );
            })}
        </CateGoryArea>
    );
}

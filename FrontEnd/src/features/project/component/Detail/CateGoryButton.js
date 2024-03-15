import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';

const CateGoryArea = styled.div`
    width: 100%;
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
                    <Button.SubmitButton
                        $active={e === (param.get('seach') || 'All')}
                        key={`key-${e}`}
                        onClick={() => navigate(`${pathname}?seach=${e}`)}
                    >
                        {e}
                    </Button.SubmitButton>
                );
            })}
        </CateGoryArea>
    );
}

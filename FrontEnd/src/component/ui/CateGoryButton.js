import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';

const CateGoryArea = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
`;

export default function CateGoryButton({ CateGory, type }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [param] = useSearchParams();

    const pathName = path => {
        // console.log(path);
        const arr = pathname.split('/');
        const lastIdx = arr.length - 1;
        if (arr.length <= 2) {
            return CateGory[0];
        }
        return arr[lastIdx];
    };

    // path
    const ParameterNav = path => {
        const arrPath = pathname.split('/');

        if (arrPath.length <= 2) {
            arrPath.push(path);
        } else {
            arrPath[arrPath.length - 1] = path;
        }
        const newPath = arrPath.join('/');

        return newPath;
    };

    const pageType = type === 'queryString';

    return (
        <CateGoryArea>
            {CateGory.map(e => (
                <Button.SubmitButton
                    key={`key-${e}`}
                    $active={
                        e ===
                        (pageType
                            ? param.get('seach') || CateGory[0]
                            : pathName(e) || CateGory[0])
                    }
                    onClick={() =>
                        navigate(
                            pageType
                                ? `${pathname}?seach=${e}`
                                : ParameterNav(e),
                        )
                    }
                >
                    {e}
                </Button.SubmitButton>
            ))}
        </CateGoryArea>
    );
}

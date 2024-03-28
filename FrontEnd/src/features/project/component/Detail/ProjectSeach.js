import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import styled from 'styled-components';

const Search = styled.div`
    display: flex;
    position: relative;
    font-size: 14px;
    border-bottom: 1px solid transparent;
    ${props => props.$view && 'border-bottom: 1px solid;'}

    form {
        display: flex;
    }
    input {
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
        color: #000;
        background: transparent;
        flex-grow: 1;
    }
    button {
        border-radius: 5rem;
        background: #fff;
        padding: 0.5rem;
        margin: 0.2rem;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.04);
    }
`;

export default function ProjectSeach() {
    const [input, setInput] = useState('');
    const [id, setId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState(false);

    const searchProject = e => {
        e.preventDefault();
        if (input.trim() !== '') {
            navigate(`${location.pathname}?seach=${input}`);
        }

        setId(null);
        setInput('');
    };
    useEffect(() => {
        return () => {
            setId(null);
            setInput('');
            setView(false);
        };
    }, [location.search]);

    return (
        <Search $view={view}>
            <form onSubmit={e => searchProject(e)}>
                {view && (
                    <input
                        type="text"
                        placeholder="검색어를 적어주세요..."
                        onChange={e => setInput(e.target.value)}
                        value={input}
                    />
                )}
                <button onClick={() => setView(prev => !prev)}>
                    <FaMagnifyingGlass />
                </button>
            </form>
        </Search>
    );
}

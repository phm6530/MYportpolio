import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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

export default function SearchForm() {
    const [input, setInput] = useState('');

    const [view, setView] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchProject = e => {
        e.preventDefault();
        if (!view) return;
        const newSearchParams = new URLSearchParams(searchParams);
        if (input.trim() !== '') {
            newSearchParams.set('search', input.trim());
            setSearchParams(newSearchParams);
        } else {
            newSearchParams.delete('search');
            setSearchParams(newSearchParams);
        }
    };

    return (
        <Search $view={view}>
            <select name="" id="">
                <option value="전체">전체</option>
                <option value="내용">내용</option>
            </select>

            <form onSubmit={e => searchProject(e)}>
                {view && (
                    <input
                        type="text"
                        placeholder="검색어를 적어주세요..."
                        onChange={e => setInput(e.target.value)}
                        value={input}
                    />
                )}

                <button onClick={() => setView(true)}>
                    <FaMagnifyingGlass />
                </button>
            </form>
        </Search>
    );
}

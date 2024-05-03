import styled from 'styled-components';

const Page = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
    flex-direction: column;

    .button {
        font-weight: 300;
        font-size: 1em;
        text-decoration: none;
        border: 1px solid #efefef;
        padding: 0.5em 2rem;
        border-radius: 3px;
        float: left;
        margin-top: 2rem;
        position: relative;
        border-radius: 5rem;
        transition: all 0.3s linear;
    }

    .button:hover {
        background-color: #007aff;
        color: #fff;
    }

    p {
        font-size: 1em;
        text-align: center;
        font-weight: 100;
    }

    h1 {
        text-align: center;
        font-size: 2em;
        font-weight: 100;
    }
`;

const NotfoundPage = () => {
    return (
        <Page>
            <h1>권한이 없거나 존재하지 않는 페이지입니다.</h1>
            <p>궁금하신 사항은 고객센터로 문의해 주시기 바랍니다</p>
            <a className="button" href="#">
                이전화면
            </a>
        </Page>
    );
};

export default NotfoundPage;

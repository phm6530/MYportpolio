import styled from 'styled-components';
import { Typography, Button, Container } from '@mui/material';

const Page = styled.div`
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
    color: red;

    .button {
        font-weight: 300;
        color: #fff;
        font-size: 1.2em;
        text-decoration: none;
        border: 1px solid #efefef;
        padding: 0.5em;
        border-radius: 3px;
        float: left;
        margin: 6em 0 0 -155px;
        left: 50%;
        position: relative;
        transition: all 0.3s linear;
    }

    .button:hover {
        background-color: #007aff;
        color: #fff;
    }

    p {
        font-size: 2em;
        text-align: center;
        font-weight: 100;
    }

    h1 {
        text-align: center;
        font-size: 15em;
        font-weight: 100;
    }
`;

const NotfoundPage = () => {
    return (
        <Page>
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <a className="button" href="#">
                <i className="icon-home"></i> Go back in initial page, is
                better.
            </a>
        </Page>
    );
};

export default NotfoundPage;

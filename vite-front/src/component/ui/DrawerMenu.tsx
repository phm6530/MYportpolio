import { device } from 'config/DeviceConfig';
import styled from 'styled-components';
const MenuToggle = styled.div`
    /* ALL */
    z-index: 999;
    .row .three {
        padding: 80px 30px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: var(--Nav-color);
        color: #ecf0f1;
        text-align: center;
    }

    .hamburger .line {
        width: 30px;
        height: 3px;
        background-color: #000000ea;
        display: block;
        margin: 5px auto;
        border-radius: 1rem;
        transition:
            transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
            background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
            opacity 0.55s ease;
    }

    .hamburger:hover {
        cursor: pointer;
    }

    /* ONE */
    #hamburger-1.is-active .line:nth-child(2) {
        opacity: 0;
    }

    #hamburger-1.is-active .line:nth-child(1) {
        -webkit-transform: translateY(8px) rotate(45deg);
        -ms-transform: translateY(8px) rotate(45deg);
        -o-transform: translateY(8px) rotate(45deg);
        transform: translateY(8px) rotate(45deg);
    }

    #hamburger-1.is-active .line:nth-child(3) {
        -webkit-transform: translateY(-9px) rotate(-45deg);
        -ms-transform: translateY(-9px) rotate(-45deg);
        -o-transform: translateY(-9px) rotate(-45deg);
        transform: translateY(-9px) rotate(-45deg);
    }
    display: none;
    @media ${device.laptopL} {
        display: block;
    }
`;

const DrawerMenu: React.FC<{
    drawerView: boolean;
    setDrawerView: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ drawerView, setDrawerView }) => {
    const className = drawerView ? 'hamburger is-active' : 'hamburger';

    return (
        <>
            <MenuToggle onClick={() => setDrawerView(prev => !prev)}>
                <div className="three col">
                    <div className={className} id="hamburger-1">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </MenuToggle>
        </>
    );
};

export default DrawerMenu;

import React, { forwardRef, useEffect, useState } from 'react';

import styled from 'styled-components';

const LabelStyle = styled.label`
    display: flex;
    cursor: pointer;
    padding: 0.3rem 0.3rem;
    margin-bottom: 1rem;
`;

const Checkbox = forwardRef((props, ref) => {
    const { label, isCheck, ...rest } = props;
    const [check, setCheck] = useState(isCheck);

    useEffect(() => {
        setCheck(isCheck);
    }, [isCheck]);

    // console.log({ ...rest });
    // const SkillComponent = SKILL_ICON[label];
    // console.log(label);
    const checkboxHandler = e => {
        setCheck(e.target.checked ? true : false);
    };

    return (
        <LabelStyle className={`skill_Item ${check && 'checked'}`}>
            <input
                type="checkbox"
                ref={ref}
                value={label}
                {...rest}
                onChange={checkboxHandler}
            />
            {label}
        </LabelStyle>
    );
});

export default Checkbox;

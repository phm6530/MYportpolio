const SelectBox = ({ option }) => {
    return (
        <>
            <select>
                {option.map(e => {
                    return <option key={e}>{e}</option>;
                })}
            </select>
        </>
    );
};

export default SelectBox;

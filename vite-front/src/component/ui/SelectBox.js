const SelectBox = ({ option, setViewRage }) => {
    return (
        <>
            <select onChange={e => setViewRage(e.target.value)}>
                {option.map(e => {
                    return (
                        <option value={e} key={e}>
                            {e}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default SelectBox;

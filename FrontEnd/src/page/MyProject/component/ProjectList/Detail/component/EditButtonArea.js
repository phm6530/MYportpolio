import alertThunk from '../../../../store/alertTrunk';

export const EditArea = ({ className }, key) => {
    const AuthCheck = text => {
        if (!login) {
            dispatch(alertThunk(`${text} 권한이 없습니다.`), 0);
            return false;
        }
        return true;
    };

    const projectChange = key => {
        if (!AuthCheck('수정')) {
            return;
        }
        setModal(true);
        navigate(`/project/add?type=edit&key=${key}`);
    };

    const projectMutation = async deleteKey => {
        //권한 확인
        if (!AuthCheck('삭제')) {
            return;
        }
        setModal(true);
    };
    return (
        <div className={className}>
            <button onClick={() => projectChange(key)}>
                <MdModeEdit />
            </button>
            <button onClick={() => projectMutation(key)}>
                <FaTrashAlt />
            </button>
        </div>
    );
};

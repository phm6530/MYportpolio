import { ReactRouteDom } from 'lib/lib';
import { clientAuthCheck } from 

const updateHandler = key => {
    if (!clientAuthCheck('수정')) {
        return;
    }
    navigate(`/project/add?type=edit&key=${key}`);
};

const deleteHandler = async deleteKey => {
    //권한 확인
    if (!clientAuthCheck('삭제')) {
        return;
    }
    setModal(true);
};


export {
    updateHandler,
    deleteHandler
}
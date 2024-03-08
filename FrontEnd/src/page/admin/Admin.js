import useAuthRedirect from 'hooks/useAuthRedirect';

export default function Admin() {
    useAuthRedirect('/');
    return <>Admin 관리자 페이지</>;
}

import * as Yup from 'yup';
const schema = Yup.object().shape({
    title: Yup.string().required('필수 입력란 입니다.'),
    skill: Yup.array().min(1, '한개 이상의 stack을 등록해주세요'),
    company: Yup.string().required('필수 입력란 입니다.'),
    hashtag: Yup.array().min(1, '한 개 이상의 해시태그를 등록해주세요.'),
    projectUrl: Yup.string()
        .required('필수 입력란 입니다.')
        .url('Url 형식으로 입력해주세요. 예)https://sitename.com'),
    startDate: Yup.date()
        .max(Yup.ref('endDate'), '시작일은 종료일보다 빨라야 합니다.')
        .required('시작일을 입력해주세요'),
    thumbnail: Yup.string().required('프로젝트 썸네일을 첨부해주세요.'),
    endDate: Yup.date()
        .min(Yup.ref('startDate'), '종료일은 시작일 이후로 설정해주세요')
        .required('종료일을 입력해주세요'),
    description: Yup.string()
        .required('필수 입력란 입니다.')
        .min(6, '6글자 이상써주세요..'),
    projectDescription: Yup.string().required('필수 입력란 입니다.'),
});

export default schema;

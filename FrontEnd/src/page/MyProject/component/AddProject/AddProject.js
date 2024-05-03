import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { InputStyle, TextAreaStyle } from '../../../../component/ui/TextArea';
import { MdCancel } from 'react-icons/md';

// Quill 에디터
import QuillEditor from './Detail/QuillEditor';

import { Controller, useForm, useFieldArray } from 'react-hook-form';
import Checkbox from './Detail/CheckBox';
import CustumDatePicker from './Detail/CustumDatePicker';

import alertThunk from '../../../../store/alertTrunk';
import SubTitle from '../../../../component/ui/Subtitle';

import {
    addProjectFetch,
    projectEdit,
    uploadImage,
} from 'services/projectService';
import styled from 'styled-components';
import { Button } from '../../../../component/ui/Button';

const projectStack = [
    'Html',
    'Css',
    'JavaScript',
    'Node',
    'React',
    'PHP',
    'jQuery',
    'Scss',
    'Mysql',
    'Next',
];

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

const AdminProjectStyle = styled.div`
    background: #fff;
    border-radius: 1em;
    padding: 2rem;
`;
const InputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const InputLabel = styled.div`
    font-weight: 500;
    color: #222;
    font-size: 14px;
    width: 8rem;
`;

const FormStyle = styled.form`
    margin-top: 30px;
`;

const ProjectSkillWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80%;
`;
const CustumInputWrap = styled(InputStyle)`
    flex-grow: 1;
`;

const CustumTextAreaStyle = styled(TextAreaStyle)`
    flex-grow: 1;
`;

const ButtonWrap = styled.div`
    display: flex;
`;

const UploadButton = styled.label`
    display: flex;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.2rem 1rem;
    border-radius: 0.2rem;
    color: #fff;
`;

const UPloadFileName = styled.div`
    font-size: 12px;
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
    margin-left: 1rem;
`;

const HashtagWrap = styled.div``;

export default function AddProject() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        reset,
        trigger,
        setError,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            skill: [],
            projectUrl: '',
            hashtag: [],
            description: '',
            projectDescription: '',
            thumbnail: '',
        },
    });

    const ref = useRef();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'hashtag',
    });

    const location = useLocation();

    const thumNail = watch('thumbnail');
    // console.log('thumNail::::::::::::::::::::::::', thumNail);

    // const ctx = useContext(DarkMode);
    // console.log(ctx);
    const [PROJECT_KEY, SETPROJECT_KEY] = useState(null);
    const [Params] = useSearchParams();
    // console.log('PROJECT_KEY ::::: ',PROJECT_KEY)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Type = Params.get('type');
    const ProjectKey = Params.get('key');

    // console.log(errors);
    // console.log(getValues());

    useEffect(() => {
        const fetching = async () => {
            SETPROJECT_KEY(ProjectKey); //기존 KEY
            return await projectEdit(ProjectKey);
        };

        if (Type === 'edit') {
            fetching()
                .then(res => {
                    console.log(' res :::::: ', res);
                    reset({
                        idx: res.project_key,
                        title: res.title,
                        company: res.company,
                        description: res.description.replaceAll('<br>', '\n'),
                        projectUrl: res.project_url,
                        skill: res.skill.split(','),
                        hashtag: res.hashtag.split(','),
                        startDate: new Date(res.startProject),
                        endDate: new Date(res.endProject),
                        projectDescription: res.project_description,
                        thumbnail: res.thumbnail,
                    });
                })
                .catch(error => {
                    dispatch(alertThunk(error.message, 0));
                });
        } else {
            SETPROJECT_KEY(uuidv4()); //신규 생성키
        }
    }, [ProjectKey, Type, dispatch, reset, Params]);

    const cancelEvent = () => {
        navigate(-1);
    };

    const onSubmitHandler = async data => {
        try {
            let setObj;
            if (Type === 'edit') {
                setObj = data;
            } else {
                setObj = { ...data, idx: PROJECT_KEY };
            }
            // const hash = setObj.hashtag;

            // const newHashArr = hash.flatMap(e => Object.values(e));

            // setObj = { ...setObj, hashtag: newHashArr };

            console.log('setObjsetObjsetObjsetObj :::: ', setObj);
            await addProjectFetch(setObj, Type);

            dispatch(
                alertThunk(
                    Type !== 'edit'
                        ? '프로젝트가 등록되었습니다.'
                        : '프로젝트가 수정되었습니다.',
                    true,
                ),
            );
            navigate('/project');
            reset(); // 서버 요청이 성공적일 때만 reset 호출
        } catch (error) {
            console.log(error);
            dispatch(alertThunk(error.message, false));
        }
    };

    const fileHandler = async e => {
        const ImgFile = e.target.files[0];
        if (!ImgFile) {
            return;
        }

        const imgSize = ImgFile.size / 1024 / 1024;
        if (imgSize.toFixed(2) > 5) {
            alert(`${imgSize} 는 너무 큼`);
            return;
        }
        if (!ImgFile.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return; // 이미지가 아닌 파일은 여기서 처리 중단
        }
        try {
            const formData = new FormData();
            formData.append('img', ImgFile);
            const { fileUrl } = await uploadImage(
                formData,
                ProjectKey,
                'thumNail',
            );
            setValue('thumbnail', fileUrl, { shouldValidate: true });
        } catch (error) {
            dispatch(alertThunk(error.message, 0));
        }

        // setValue('thumbnail', e.target.files[0], { shouldValidate: true });
    };

    const isCheck = value => {
        const skillArr = getValues('skill');
        const same = skillArr.some(skill => skill === value);
        return same;
    };

    const findText = (target, arr) => {
        const result = arr.includes(target);
        console.log(result);
    };

    const addHashtag = e => {
        e.preventDefault();

        const newValue = ref.current.value;
        if (!newValue) {
            setError('hashtag', {
                type: 'custom',
                message: '해시태그를 입력해주세요.',
            });
            return;
        }

        if (newValue && !fields.some(field => field.value === newValue)) {
            append(newValue);
            trigger('hashtag');
            ref.current.value = '';
        }
    };

    return (
        <AdminProjectStyle>
            <SubTitle>
                <span className="subText">PROJECT - Add</span>
            </SubTitle>

            <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
                {/* CustumInputWrap ,TextAreaStyle */}

                <InputWrap>
                    <InputLabel>프로젝트 명 </InputLabel>
                    <CustumInputWrap
                        type="text"
                        placeholder="프로젝트 명을 입력해주세요."
                        {...register('title')}
                    />
                    {errors.title && (
                        <p className="errorMessage">{errors.title.message}</p>
                    )}
                </InputWrap>

                <InputWrap>
                    <InputLabel>프로젝트 의뢰기관</InputLabel>
                    <CustumInputWrap
                        {...register('company')}
                        placeholder="프로젝트 의뢰 기간을 입력해주세요."
                    />
                    {errors.company && (
                        <p className="errorMessage">{errors.company.message}</p>
                    )}
                </InputWrap>

                <InputWrap>
                    {/* date Picker */}
                    <InputLabel>프로젝트 기간</InputLabel>
                    <CustumDatePicker
                        control={control}
                        errors={errors}
                        startDateName="startDate"
                        endDateName="endDate"
                    />
                </InputWrap>

                <InputWrap>
                    <InputLabel>프로젝트 기술스택 </InputLabel>
                    <ProjectSkillWrap>
                        {projectStack.map(e => (
                            <Checkbox
                                key={e}
                                label={e}
                                {...register('skill')}
                                isCheck={isCheck(e)}
                                // trigger={trigger}
                            />
                        ))}
                    </ProjectSkillWrap>
                    {errors.skill && (
                        <p className="errorMessage">{errors.skill.message}</p>
                    )}
                </InputWrap>

                <InputWrap>
                    <InputLabel>해시태그</InputLabel>
                    <div className="FlexColumn">
                        <InputWrap>
                            <CustumInputWrap
                                ref={ref}
                                placeholder="해시태그 추가"
                            />
                            <button onClick={addHashtag}>Add</button>
                        </InputWrap>
                        <HashtagWrap>
                            {getValues('hashtag').map((field, index) => (
                                <div className="hashTag" key={field.id}>
                                    {field}
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        <MdCancel />
                                    </button>
                                </div>
                            ))}
                        </HashtagWrap>
                    </div>
                    {errors.hashtag && (
                        <p className="errorMessage">{errors.hashtag.message}</p>
                    )}
                </InputWrap>

                <InputWrap>
                    <InputLabel>thumbnail</InputLabel>
                    <Button.UploadButton htmlFor="input-file">
                        ThumbNail
                    </Button.UploadButton>
                    <UPloadFileName>
                        {thumNail ? thumNail : '파일없음'}
                    </UPloadFileName>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        id="input-file"
                        onChange={e => fileHandler(e)}
                    />
                    {errors.thumbnail && (
                        <p className="errorMessage">
                            {errors.thumbnail.message}
                        </p>
                    )}
                </InputWrap>

                <InputWrap>
                    <InputLabel>Site Url</InputLabel>
                    <CustumInputWrap
                        placeholder="URL을 입력해주세요"
                        {...register('projectUrl')}
                    />

                    {errors.projectUrl && (
                        <p className="errorMessage">
                            {errors.projectUrl.message}
                        </p>
                    )}
                </InputWrap>

                <InputWrap>
                    <InputLabel>Contents</InputLabel>
                    <CustumTextAreaStyle
                        {...register('description')}
                    ></CustumTextAreaStyle>
                    {errors.description && (
                        <p className="errorMessage">
                            {errors.description.message}
                        </p>
                    )}
                </InputWrap>

                {/* Quill Editor */}
                {PROJECT_KEY && (
                    <>
                        <Controller
                            name="projectDescription"
                            control={control}
                            render={({ field }) => (
                                <QuillEditor
                                    {...field}
                                    PROJECT_KEY={PROJECT_KEY}
                                />
                            )}
                        />
                        {errors.projectDescription && (
                            <p className="errorMessage">
                                {errors.projectDescription.message}
                            </p>
                        )}
                    </>
                )}

                <ButtonWrap>
                    <Button.Submit>등록</Button.Submit>
                    <Button.Cancle type="button" onClick={cancelEvent}>
                        취소
                    </Button.Cancle>
                </ButtonWrap>
            </FormStyle>
        </AdminProjectStyle>
    );
}

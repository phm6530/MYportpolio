import React, { useEffect, useRef } from 'react';

import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Quill 에디터
import QuillEditor from 'page/MyProject/component/AddProject/Detail/QuillEditor';

import { Controller, useForm } from 'react-hook-form';
import CustumDatePicker from 'page/MyProject/component/AddProject/Detail/CustumDatePicker';

import SubTitle from 'component/ui/Subtitle';
import EditorInput from 'component/editor/EditorInput';
import { addProjectFetch, projectEdit } from 'services/projectService';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';

// Hard Coding
import EditorAddHash from 'component/editor/EditorAddHash';

import { PROJECT_STACK } from 'utils/constans';
import EditorChecklist from 'component/editor/EditorChecklist';
import EditorTextArea from 'component/editor/EditorTextArea';
import EditorUploader from 'component/editor/EditorUploader';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKey } from 'services/queryKey';
import { toast } from 'react-toastify';

const AdminProjectStyle = styled.div`
    background: var(--background-color-box);
    border: var(--border--btn-type-1);
    border-radius: 1em;
    padding: 2rem;
`;

const FormStyle = styled.form`
    margin-top: 30px;
`;

const ButtonWrap = styled.div`
    display: flex;
`;

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

export default function AddProject() {
    const initalFormValue = {
        title: '',
        skill: [],
        projectUrl: '',
        hashtag: [],
        description: '',
        projectDescription: '',
        thumbnail: '',
    };

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
        defaultValues: initalFormValue,
    });

    const ref = useRef();
    const [Params] = useSearchParams();
    const projectKey = Params.get('key') || uuidv4();
    const navigate = useNavigate();
    const Type = Params.get('type');

    const { data } = useQuery({
        queryKey: [queryKey.projectAdd],
        queryFn: () => projectEdit(projectKey),
    });

    const { mutate } = useMutation({
        mutationFn: data =>
            addProjectFetch(
                Type === 'edit' ? data : { ...data, idx: projectKey },
                Type,
            ),
        onSuccess: () => {
            toast.success(
                Type !== 'edit'
                    ? '프로젝트가 등록되었습니다.'
                    : '프로젝트가 수정되었습니다.',
                true,
            );
            navigate('/project');
        },
    });

    function mapDataToForm(data) {
        if (!data) return null; // 데이터가 없으면 null 반환
        return {
            idx: data.project_key,
            title: data.title,
            company: data.company,
            description: data.description,
            projectUrl: data.project_url,
            skill: data.skill ? data.skill.split(',') : [],
            hashtag: data.hashtag ? data.hashtag.split(',') : [],
            startDate: new Date(data.startProject),
            endDate: new Date(data.endProject),
            projectDescription: data.project_description,
            thumbnail: data.thumbnail,
        };
    }

    useEffect(() => {
        if (Type === 'edit' && data) {
            console.log(data);
            reset(mapDataToForm(data));
        }
    }, [projectKey, Type, reset, Params, data]);

    const cancelEvent = () => {
        navigate(-1);
    };

    const onSubmitHandler = async data => {
        mutate(data);
    };

    return (
        <AdminProjectStyle>
            <SubTitle>Add project --</SubTitle>

            <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
                <EditorInput
                    label="프로젝트 명"
                    type="text"
                    placeholder="프로젝트 명을 입력해주세요."
                    error={errors}
                    value="title"
                    register={register}
                />

                {/* 의뢰기간 */}
                <EditorInput
                    label="프로젝트 의뢰기관"
                    type="text"
                    placeholder="프로젝트 의뢰 기간을 입력해주세요."
                    error={errors}
                    value="company"
                    register={register}
                />

                {/* date Picker */}
                <CustumDatePicker
                    label="프로젝트 기간"
                    control={control}
                    errors={errors}
                    startDateName="startDate"
                    endDateName="endDate"
                />

                <EditorChecklist
                    label="프로젝트 기술스택"
                    error={errors}
                    value="skill"
                    list={PROJECT_STACK}
                    register={register}
                    getValues={getValues}
                />

                {/* 해시태그 */}
                <EditorAddHash
                    label={'해시태그'}
                    placeholder="해시태그 추가"
                    ref={ref}
                    error={errors}
                    control={control}
                    value="hashtag"
                    setError={setError}
                    trigger={trigger}
                    getValues={getValues}
                />

                {/* 썸네일  */}
                <EditorUploader
                    label="thumbnail"
                    value="thumbnail"
                    error={errors}
                    projectKey={projectKey}
                    setValue={setValue}
                    watch={watch}
                />

                <EditorInput
                    label="Site Url"
                    type="text"
                    placeholder="URL을 입력해주세요"
                    error={errors}
                    value="projectUrl"
                    register={register}
                />

                <EditorTextArea
                    label="Contents"
                    placeholder="썸네일 설명을 기재해주세요."
                    error={errors}
                    value="description"
                    register={register}
                />

                {/* Quill Editor */}
                {projectKey && (
                    <>
                        <Controller
                            name="projectDescription"
                            control={control}
                            render={({ field }) => (
                                <QuillEditor
                                    {...field}
                                    PROJECT_KEY={projectKey}
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

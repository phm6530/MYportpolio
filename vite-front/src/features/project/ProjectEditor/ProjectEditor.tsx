import { useEffect, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { yupResolver } from '@hookform/resolvers/yup';

// Quill 에디터
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CustumDatePicker from 'component/editor/CustumDatePicker';

import { SubTitle } from 'component/ui/Subtitle';
import EditorInput from 'component/editor/EditorInput';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';
import schema from './schema';

import EditorAddHash from 'component/editor/EditorAddHash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PROJECT_STACK } from 'constants/pageConstacts';

import EditorChecklist from 'component/editor/EditorChecklist';
import EditorTextArea from 'component/editor/EditorTextArea';
import ProjectThumbnailUploader from '@features/project/ProjectEditor/ProjectThumbnailUploader';
import useKey from 'hooks/useKey';
import useEditorFetchDetail from '@features/project/hooks/useEditorFetchDetail';
import useEditorAction from '@features/project/hooks/useEditorAction';
import { ProjectDetailProps } from '@type/ProjectTypes';
import TestQuillEditor from 'component/editor/TestQuillEditor';
import {
    EditorGetPreview,
    transImgSrc,
} from 'component/editor/EditorGetPreview';

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

export default function ProjectEditor() {
    const navigate = useNavigate();
    const [Params] = useSearchParams();
    const { key: projectKey } = useKey();
    const pageType = Params.get('type') || null;

    const initalFormValue: ProjectDetailProps = useMemo(
        () => ({
            title: '',
            company: '',
            skill: [],
            hashtag: [],
            projectUrl: '',
            startDate: null,
            endDate: null,
            thumbnail: '',
            description: '',
            projectDescription: '',
        }),
        [],
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        reset,
        trigger,
        formState: { errors },
        control,
    } = useForm<ProjectDetailProps>({
        /* eslint-disable @typescript-eslint/no-explicit-any */
        resolver: yupResolver(schema) as any, //초기값 null때문에 요것만 any 허용
        defaultValues: initalFormValue,
    });

    const { data } = useEditorFetchDetail(projectKey, pageType);
    const { mutate } = useEditorAction(pageType, projectKey);

    useEffect(() => {
        if (data && pageType === 'edit') {
            const updatedData = {
                ...data,
                projectDescription: transImgSrc(data.projectDescription),
            };
            const formData = updatedData || initalFormValue;
            reset(formData);
        }
    }, [data, pageType, reset, initalFormValue]);

    const cancelEvent = () => {
        navigate(-1);
    };

    const onSubmitHandler: SubmitHandler<ProjectDetailProps> = data => {
        const getItem = EditorGetPreview(data.projectDescription);
        const newProjectDescription = getItem.getPost();
        const updatedData = {
            ...data,
            projectDescription: newProjectDescription,
        };
        mutate(updatedData);
    };

    return (
        <AdminProjectStyle>
            <SubTitle>Add project --</SubTitle>

            <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
                <EditorInput
                    label="프로젝트 명"
                    placeholder="프로젝트 명을 입력해주세요."
                    error={errors}
                    value="title"
                    register={register}
                />

                {/* 의뢰기간 */}
                <EditorInput
                    label="프로젝트 의뢰기관"
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
                    error={errors?.skill}
                    value="skill"
                    list={PROJECT_STACK}
                    register={register}
                    getValues={getValues}
                />

                {/* 해시태그 */}
                <EditorAddHash
                    getValues={getValues}
                    error={errors}
                    setValue={setValue}
                    trigger={trigger}
                    label="hashtag"
                />

                {/* 썸네일  */}
                <ProjectThumbnailUploader
                    label="thumbnail"
                    error={errors.thumbnail}
                    projectKey={projectKey}
                    setValue={setValue}
                    watch={watch}
                />

                <EditorInput
                    label="Site Url"
                    placeholder="URL을 입력해주세요"
                    error={errors}
                    value="projectUrl"
                    register={register}
                />

                <EditorTextArea
                    label="Contents"
                    value="description"
                    placeholder="썸네일 설명을 기재해주세요."
                    error={errors}
                    register={register}
                />

                {/* Quill Editor */}
                {/* <CustomToolbar /> */}
                {projectKey && (
                    <>
                        <Controller
                            name="projectDescription"
                            control={control}
                            render={({ field }) => {
                                const { ref, ...restField } = field;
                                void ref; // `ref`를 제외하고 나머지 필드를 추출
                                return (
                                    <TestQuillEditor
                                        {...restField} // `ref`를 제외한 나머지 프로퍼티 전달
                                        page={'project'}
                                        postKey={projectKey}
                                    />
                                );
                            }}
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
                    <Button.Cancle onClick={cancelEvent}>취소</Button.Cancle>
                </ButtonWrap>
            </FormStyle>
        </AdminProjectStyle>
    );
}

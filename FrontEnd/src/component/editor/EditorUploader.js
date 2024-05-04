import styled from 'styled-components';
import InputErrorMessage from 'component/error/InputErrorMessage';
import { InputLabel } from 'component/ui/TextArea';
import { uploadImage } from 'services/projectService';
import { toast } from 'react-toastify';
import { Button } from 'component/ui/Button';
import { Wrapper } from './EditorStyle';

const UPloadFileName = styled.div`
    font-size: 12px;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;

    margin-left: 1rem;
`;

const WrapperFlex = styled.div`
    display: flex;
    align-items: center;
`;

const EditorUploader = ({
    label,
    value,
    error,
    projectKey,
    setValue,
    watch,
}) => {
    const thumNail = watch('thumbnail');
    const fileHandler = async e => {
        const ImgFile = e.target.files[0];
        if (!ImgFile) {
            return;
        }

        const imgSize = ImgFile.size / 1024 / 1024;
        if (imgSize.toFixed(2) > 5) {
            alert(`${imgSize} 는 너무 크네요.. 5mb이하만 가능합니다. `);
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
                projectKey,
                'thumNail',
            );
            setValue('thumbnail', fileUrl, { shouldValidate: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Wrapper>
            <InputLabel>{label}</InputLabel>
            <WrapperFlex>
                <Button.UploadButton htmlFor="input-file">
                    Upload a File
                </Button.UploadButton>

                <UPloadFileName>
                    {thumNail ? thumNail : '파일없음'}
                </UPloadFileName>
            </WrapperFlex>
            <input
                type="file"
                style={{ display: 'none' }}
                id="input-file"
                onChange={e => fileHandler(e)}
            />

            {error && error[value] && (
                <InputErrorMessage>{error[value]?.message}</InputErrorMessage>
            )}
        </Wrapper>
    );
};

export default EditorUploader;

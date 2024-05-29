export type ProjectKey = string;
export type HashTagType = string[];
export type skillType = string[];
export type startDate = Date | null;
export type endDate = Date | null;

export interface ProjectDetailProps {
    title: string;
    skill: skillType;
    company: string;
    hashtag: HashTagType;
    projectUrl: string;
    startDate: startDate;
    endDate: endDate;
    thumbnail: string;
    description: string;
    projectDescription: string;
}

export interface ProjectPostProps extends ProjectDetailProps {
    projectKey?: string | null;
}
export interface UploadThumbnailResponseProps {
    message: string;
    imgUrl: string;
}

export type ProjectKey = string;
export type HashTagType = string[];
export type skillType = string[];

export interface ProjectDetailProps {
    company: string;
    description: string;
    endProject: string;
    hashtag: HashTagType;
    id: number;
    project_key: string;
    project_url: string;
    skill: skillType;
    startProject: string;
    thumbnail: string;
    title: string;
    project_description: string;
}

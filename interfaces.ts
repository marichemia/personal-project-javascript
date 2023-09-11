export interface Subject {
    title: string;
    lessons: number;
    description?: string;
    id?: number;
}

export interface PhoneObj {
    phone: string;
    primary: boolean;
}

export interface EmailObj {
    email: string;
    primary: boolean;
}

export interface Pupil {
    name: {
        first: string;
        last: string;
    };
    dateOfBirth: string;
    phones: PhoneObj[];
    sex: 'male' | 'female';
    description?: string;
    id?: number;
}

export interface Teacher extends Pupil {
    emails: EmailObj[];
    subjects: {
        subject: string;
    }[];
}

export interface Group {
    room: number;
    id: number;
    pupils: Pupil[];
}

export interface RecordObj {
    pupilId: number;
    teacherId: number;
    subjectId: number;
    lesson: number;
    mark: number;
}

export interface Gradebook {
    id: number;
    groupId: number;
    records: RecordObj[];
}


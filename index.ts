interface Subject {
    title: string;
    lessons: number;
    description?: string;
    id?: number;
}

interface Pupil {
    name: {
        first: string;
        last: string;
    };
    dateOfBirth: string;
    phones: {
        phone: string;
        primary: boolean
    }[];
    sex: 'male' | 'female' | 'Male' | 'Female';
    description: string;
}

interface Teacher extends Pupil {
    emails: {
        email: string;
        primary: boolean;
    }[];
    subjects: {
        subject: string;
    }[];
}



class commonMethods {
    isPositive(num: number): boolean {
        if (num >= 0) {
            return true;
        } else {
            return false;
        }
    }
}

class Subjects extends commonMethods {
    subjects: Subject[];
    counter: number;

    constructor() {
        super();
        this.subjects = [];
        this.counter = 0;
    }

    verify(subject: Subject): boolean {
        return this.subjects.some((item) => item.title === subject.title);
    }

    add(subject: Subject): number {

        if (!this.isPositive(subject.lessons)) {
            throw new Error('lessons property should be a positive number');
        } else if (this.verify(subject)) {
            throw new Error('subject with this name already exists');
        }

        subject.id = this.counter;
        this.subjects.push(subject);
        this.counter++;
        return subject.id;
    }

    remove(subjectId: number): boolean {
        let subjectIndex = this.subjects.findIndex(obj => obj.id === subjectId);

        if (subjectIndex !== -1 && this.verify(this.subjects[subjectIndex])) {
            this.subjects.splice(subjectIndex, 1)
            return true;
        } else {
            throw new Error('Invalid Input: Subject not found');
        }
    }

    readAll(): Subject[] {
        return this.subjects;
    }

}




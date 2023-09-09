interface Subject {
    title: string;
    lessons: number;
    description?: string;
    id?: number;
}

interface PhoneObj {
    phone: string;
    primary: boolean
}

interface Pupil {
    name: {
        first: string;
        last: string;
    };
    dateOfBirth: string;
    phones: PhoneObj[];
    sex: 'male' | 'female' | 'Male' | 'Female';
    description?: string;
    id?: number;
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



class CommonMethods {
    isPositive(num: number): boolean {
        if (num >= 0) {
            return true;
        } else {
            return false;
        }
    }

    validateDOB(str: string): boolean {

        //(YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(str);

    }

    validatePhones(arr: PhoneObj[]): boolean {

        //(+1 000-000-0000)

        const phoneRegex = /^\+1\s\d{3}-\d{3}-\d{4}$/;
        let primary = 0;

        !arr.map((item: PhoneObj) => {
            if (item.primary === true) primary++;
        })

        if (arr.length === 0) {
            throw new Error('phone array is empty')
        } else if (!arr.every((item: PhoneObj) => phoneRegex.test(item.phone))) {
            throw new Error('phone format is wrong')
        } else if (primary > 1) {
            throw new Error('primary phone number already exists')
        }

        primary = 0;

        return true;
    }

    validateEmail(str: string): boolean {
        return true;
    }
}

class Subjects extends CommonMethods {
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

class Pupils extends CommonMethods {

    arr: Pupil[];
    counter: number;

    constructor() {
        super();
        this.arr = [];
        this.counter = 0;
    }

    add(object: Pupil): number {

        this.arr.push(object);
        object.id = this.counter;
        this.counter++;

        return object.id;
    }

}




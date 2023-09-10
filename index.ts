interface Subject {
    title: string;
    lessons: number;
    description?: string;
    id?: number;
}

interface PhoneObj {
    phone: string;
    primary: boolean;
}

interface EmailObj {
    email: string;
    primary: boolean;
}

interface Pupil {
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

interface Teacher extends Pupil {
    emails: EmailObj[];
    subjects: {
        subject: string;
    }[];
}

interface Group {
    room: number;
    id: number;
    pupils: Pupil[];
}

class CommonMethods {
    isPositive(num: number): boolean {
        if (num >= 0) {
            return true;
        } else {
            return false;
        }
    }

    validateDOB(str: string): void {

        //(YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(str)) {
            throw new Error('wrong format DOB')
        }
    }

    validatePhones(arr: PhoneObj[]): void {

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
    }

    validateEmails(arr: EmailObj[]): void {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let primary = 0;

        !arr.map((item: EmailObj) => {
            if (item.primary === true) primary++;
        })

        if (arr.length === 0) {
            throw new Error('Emails array is empty');
        } else if (!arr.every((item: EmailObj) => emailRegex.test(item.email))) {
            throw new Error('email format is wrong');
        } else if (primary > 1) {
            throw new Error('primary email already exists');
        }

        primary = 0;

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

    add(object: Pupil): Pupil | number {

        this.validatePhones(object.phones);
        this.validateDOB(object.dateOfBirth);

        this.arr.push({ ...object, id: this.counter });
        this.counter++;

        return this.arr[this.arr.length - 1];
    }

    read(objectId: number | undefined): Pupil {

        //validate id, check if person with this id exists
        if (objectId === undefined || objectId >= this.counter || objectId < 0) {
            throw new Error('Invalid Id');
        } else if (!this.arr.find(obj => obj.id === objectId)) {
            throw new Error('Person with provided Id does not exist');
        }

        return this.arr.find(obj => obj.id === objectId)!;
    }

    update(objectId: number | undefined, updatedData: Pupil): number {

        this.read(objectId);
        this.validatePhones(updatedData.phones);
        this.validateDOB(updatedData.dateOfBirth);

        const index = this.arr.findIndex(obj => obj.id === objectId);
        Object.assign(this.arr[index], updatedData);

        return this.arr[index].id!;
    }

    remove(objectId: number | undefined): boolean {
        return !!this.arr.splice(this.arr.findIndex((item) => item.id === objectId), 1)
    }

}

class Teachers extends Pupils {

    constructor() {
        super();
    }

    add(object: Teacher): number {
        this.validatePhones(object.phones);
        this.validateDOB(object.dateOfBirth);
        this.validateEmails(object.emails);

        this.arr.push({ ...object, id: this.counter });
        this.counter++;

        return this.arr[this.arr.length - 1].id!;
    }

    update(objectId: number | undefined, updatedData: Teacher): number {

        this.read(objectId);
        this.validatePhones(updatedData.phones);
        this.validateDOB(updatedData.dateOfBirth);
        this.validateEmails(updatedData.emails);


        const index = this.arr.findIndex(obj => obj.id === objectId);
        Object.assign(this.arr[index], updatedData);

        return this.arr[index].id!;
    }

}

class Groups extends CommonMethods {

    groups: Group[];
    counter: number;

    constructor() {
        super();
        this.groups = [];
        this.counter = 0;
    }

    add(room: number): number {
        if (room < 0) {
            throw new Error('room number is invalid');
        }

        this.groups.push({ 'room': room, 'id': this.counter, 'pupils': [] });
        this.counter++;

        return this.groups[this.groups.length - 1].id;
    }

    addPupil(groupId: number, pupil: Pupil): number {

        const group = this.groups.find(obj => obj.id === groupId);

        if (!group) {
            throw new Error('group with provided id does not exist')
        }

        group.pupils.push(pupil);

        return group.id;
    }

    removePupil(groupId: number, pupilId: number): boolean {

        const group = this.groups.find(obj => obj.id === groupId);
        const groupIndex = this.groups.findIndex(obj => obj.id === groupId);
        const pupil = group!.pupils.find(obj => obj.id === pupilId);
        const pupilIndex = group!.pupils.findIndex(obj => obj.id === pupilId);

        if (groupId < 0 || typeof groupId !== 'number') {
            throw new Error('groupId invalid or missing');
        } else if (pupilId < 0 || typeof pupilId !== 'number') {
            throw new Error('pupilId invalid or missing');
        } else if (!group) {
            throw new Error('group with provided id does not exist');
        } else if (!pupil) {
            throw new Error('pupil with provided id does not exist');
        }

        this.groups[groupIndex].pupils.splice(pupilIndex, 1);

        return true;

    }



}





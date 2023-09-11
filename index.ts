import { Subject, PhoneObj, EmailObj, Pupil, Teacher, Group, RecordObj, Gradebook } from "./interfaces";

abstract class CommonMethods {
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

    isPhoneObj(obj: PhoneObj | EmailObj): obj is PhoneObj {
        return (obj as PhoneObj).phone !== undefined;
    }

    validateContacts<T extends PhoneObj | EmailObj>(arr: T[]): void {
        let primary = 0;

        arr.forEach((item: T) => {
            if (item.primary === true) primary++;
        });

        if (arr.length === 0) {
            throw new Error('array is empty');
        } else if (!arr.every((item: T) => {
            if (this.isPhoneObj(item)) {
                return /^\+1\s\d{3}-\d{3}-\d{4}$/.test(item.phone);
            } else {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(item.email);
            }
        })) {
            throw new Error('format is wrong');
        } else if (primary > 1) {
            throw new Error('primary contact already exists');
        }

        primary = 0;
    }

}

class Subjects extends CommonMethods {
    subjects: Subject[];
    protected counter: number;

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

    public arr: Pupil[];
    protected counter: number;

    constructor() {
        super();
        this.arr = [];
        this.counter = 0;
    }

    add(object: Pupil): Pupil | any {


        this.validateContacts<PhoneObj>(object.phones);
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
        this.validateContacts<PhoneObj>(updatedData.phones);
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
        this.validateContacts<PhoneObj>(object.phones);
        this.validateDOB(object.dateOfBirth);
        this.validateContacts<EmailObj>(object.emails);

        this.arr.push({ ...object, id: this.counter });
        this.counter++;

        return this.arr[this.arr.length - 1].id!;
    }

    update(objectId: number | undefined, updatedData: Teacher): number {

        this.read(objectId);
        this.validateContacts<PhoneObj>(updatedData.phones);
        this.validateDOB(updatedData.dateOfBirth);
        this.validateContacts<EmailObj>(updatedData.emails);


        const index = this.arr.findIndex(obj => obj.id === objectId);
        Object.assign(this.arr[index], updatedData);

        return this.arr[index].id!;
    }

}

class Groups extends CommonMethods {

    public groups: Group[];
    private counter: number;

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

    update(groupId: number, object: { room: number }): boolean {

        const groupIndex = this.groups.findIndex(obj => obj.id === groupId);

        if (object.room < 0) {
            throw new Error('room number invalid');
        }

        this.groups[groupIndex].room = object.room;

        return true;

    }

    read(groupId: number): Group {

        if (groupId < 0 || groupId >= this.counter) {
            throw new Error('Invalid group id');
        }

        const groupIndex = this.groups.findIndex(obj => obj.id === groupId);

        if (groupIndex === -1) {
            throw new Error('group with provided id does not exist');
        }

        return this.groups[groupIndex];

    }

    readAll(): Group[] {
        return this.groups;
    }

}

class Gradebooks extends CommonMethods {

    groups: Groups;
    teachers: Teachers;
    subjects: Subjects;
    gradebooks: Map<number, Gradebook>;
    private counter: number;

    constructor(groups: Groups, teachers: Teachers, subjects: Subjects) {

        super()
        this.groups = groups;
        this.teachers = teachers;
        this.subjects = subjects;
        this.gradebooks = new Map();
        this.counter = 0;

    }

    add(groupId: number): number {

        if (!this.groups.read(groupId)) {
            throw new Error('groupId invalid');
        }


        this.gradebooks.set(this.counter, {
            id: this.counter,
            groupId: groupId,
            records: []
        });

        this.counter++;
        return this.gradebooks.get(this.counter - 1)!.id;
    }

    clear(): boolean {
        this.gradebooks = new Map();
        return true;
    }

    addRecord(gradebookId: number, record: RecordObj) {

        const gradebook = this.gradebooks.get(gradebookId);
        if (!gradebook) {
            throw new Error('invalid gradebookId');
        }

        gradebook.records.push(record);

    }

    read(gradebookId: number, pupilId: number): { name: string, records: RecordObj[] } {

        const gradebook = this.gradebooks.get(gradebookId);

        if (!gradebook) {
            throw new Error('Gradebook with provided id not found');
        }

        const group = this.groups.read(gradebook.groupId);
        const pupil = group.pupils.find(pupil => pupil.id === pupilId);

        if (!pupil) {
            throw new Error(`Pupil with ID ${pupilId} not found in gradebook ${gradebookId}.`);
        }

        const pupilName = `${pupil.name.first} ${pupil.name.last}`;
        const records = gradebook.records.filter((record: RecordObj) => record.pupilId === pupilId);


        return {
            name: pupilName,
            records: records
        }

    }

    readAll(gradebookId: number): { name: string, records: RecordObj[] }[] {

        const gradebook = this.gradebooks.get(gradebookId);

        if (!gradebook) {
            throw new Error('Gradebook with provided id not found');
        }

        const group = this.groups.read(gradebook.groupId);
        const pupils = group.pupils;

        return pupils.map((pupil) => {
            const pupilName = `${pupil.name.first} ${pupil.name.last}`;
            const records = gradebook.records.filter((record: RecordObj) => record.pupilId === pupil.id);

            return {
                name: pupilName,
                records: records
            };
        })

    }
}




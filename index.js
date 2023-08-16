class Subjects {

    constructor() {
        this.subjects = [];
        this.counter = 1;
    }

    add(subject) {
        this._validate(subject);
        subject.id = this.counter;
        this.subjects.push(subject);
        this.counter++;
        return subject.id;
    }

    verify(subject) {
        return this.subjects.some((item) => item.id === subject.id);
    }

    remove(subjectId) {
        let subject = this.subjects.find(obj => obj.id === subjectId);

        if (subject && this.verify(subject)) {
            this.subjects.splice(this.subjects.findIndex((item) => item.id === subjectId), 1)
            return true;
        } else {
            throw new Error('Invalid Input: Subject not found');
        }
    }

    readAll() {
        return this.subjects;
    }

    _validate(subject) {

        if (this.verify(subject)) {
            throw new Error('subject already exists')
        }

        if (!(subject instanceof Object) || Array.isArray(subject)) {
            throw new Error('Invalid Input: wrong argument type');
        } else if (!subject.title || !subject.lessons) {
            throw new Error('Invalid Input: required parameter(s) missing');
        } else if (typeof subject.title !== 'string' || typeof subject.lessons !== 'number' || subject.lessons <= 0) {
            throw new Error('Invalid Input: wrong property type');
        } else if (subject.description && typeof subject.description !== 'string') {
            throw new Error('Invalid Input: wrong property type');
        }
    }

}





class Person {

    constructor(data) {

        this.arr = [];
        this.counter = 1;
    }

    add(object) {
        this._validate(object);

        //validate subjects arr

        this.arr.push(object);
        object.id = this.counter;
        this.counter++;

        return object.id;
    }

    read(objectId) {
        //validate passed value
        if (!objectId || typeof objectId !== 'number' || objectId >= this.counter) {
            throw new Error('id invalid or missing')
            //check if a teacher with the id exists
        } else if (!this.arr.find(obj => obj.id === objectId)) {
            throw new Error('person with provided id not found')
        } else {
            //return teacher info
            return this.arr.find(obj => obj.id === objectId);
        }
    }

    update(objectId, objectInfo) {
        this._validate(objectInfo);
        if (this.read(objectId)) {
            const index = this.arr.findIndex(obj => obj.id === objectId);

            this.arr[index] = objectInfo;

            return this.arr[index];
        }
    }

    remove(objectId) {
        if (this.read(objectId)) {
            return `person with id #${this.arr.splice(this.arr.findIndex((item) => item.id === objectId), 1)[0].id} removed;`
        }
    }

    _validate(data) {

        //validate data

        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('input missing or invalid')
        }

        // validate name

        if (!data.name || typeof data.name !== 'object' || Array.isArray(data.name)) {
            throw new Error('name property invalid or missing')
        } else if (!data.name.first || !data.name.last || typeof data.name.first !== 'string' || typeof data.name.last !== 'string') {
            throw new Error('name property(ies) invalid or missing');
        }

        // validate dob (YYYY-MM-DD)

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!data.dateOfBirth || typeof data.dateOfBirth !== 'string' || !dateRegex.test(data.dateOfBirth)) {
            throw new Error('dateOfBirth property invalid or missing')
        }

        //validate phones arr (+1 000-000-0000)

        const phoneRegex = /^\+1\s\d{3}-\d{3}-\d{4}$/;

        if (!data.phones || !Array.isArray(data.phones)) {
            throw new Error('phones property invalid or missing');
        } else if (data.phones.length === 0) {
            throw new Error('phones array is empty')
        } else {
            for (let i = 0; i < data.phones.length; i++) {
                if (!data.phones[i].phone || typeof data.phones[i].phone !== 'string' || !phoneRegex.test(data.phones[i].phone)) {
                    throw new Error(`phones property phone invalid or missing on phone number #${i + 1}`);
                } else if (!data.phones[i].primary || typeof data.phones[i].primary !== 'boolean') {
                    throw new Error(`phones property primary invalid or missing on phone number #${i + 1}`);
                }
            }
        }

        //validate sex

        if (!data.sex) {
            throw new Error('sex property missing')
        } else if (data.sex !== 'male' && data.sex !== 'female') {
            throw new Error('sex property invalid')
        }

        //validate description

        if (!data.description || typeof data.description !== 'string') {
            throw new Error('description property invalid or missing')
        }

    }

}

class Teachers extends Person {

    constructor() {
        super();
    }

}

class Pupils extends Person {

    constructor() {
        super();
    }

}

class Groups {

    constructor() {
        this.groups = [];
        this.counter = 1;
    }

    add(room) {
        if (!room || typeof room !== 'number' || room <= 0) {
            throw new Error('room number invalid or missing')
        }


        this.groups.push({ 'room': room, 'id': this.counter, 'pupils': [] });
        this.counter++;

        return this.groups[this.counter - 2].id

    }

    addPupil(groupId, pupil) {

        const group = this.groups.find(obj => obj.id === groupId);

        if (!group) {
            throw new Error('group with provided id does not exist')
        }

        group.pupils.push(pupil);

        return group;
    }



}
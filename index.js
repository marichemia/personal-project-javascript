class Subjects {

    constructor() {
        this.subjects = [];
        this.counter = 0;
    }

    add(subject) {
        this._validate(subject);
        subject.id = this.counter;
        this.subjects.push(subject);
        this.counter++;
        return subject.id;
    }

    verify(subject) {
        if (!subject || typeof subject !== 'object' || Array.isArray(subject)) {
            throw new Error('subject parameter invalid or missing')
        }
        return this.subjects.some((item) => item.title === subject.title);
    }

    remove(subjectId) {
        let subjectIndex = this.subjects.findIndex(obj => obj.id === subjectId);

        if (subjectIndex !== -1 && this.verify(this.subjects[subjectIndex])) {
            this.subjects.splice(subjectIndex, 1)
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
        this.counter = 0;
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
        if (typeof objectId !== 'number' || objectId >= this.counter) {
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

        if (this.read(objectId)) {
            const index = this.arr.findIndex(obj => obj.id === objectId);
            //allowing partial updates?
            Object.assign(this.arr[index], objectInfo);
            this._validate(this.arr[index]);
            return this.arr[index].id;
        }
    }

    remove(objectId) {
        if (this.read(objectId)) {
            return !!this.arr.splice(this.arr.findIndex((item) => item.id === objectId), 1)
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
        let primary = 0;

        if (!data.phones || !Array.isArray(data.phones)) {
            throw new Error('phones property invalid or missing');
        } else if (data.phones.length === 0) {
            throw new Error('phones array is empty')
        } else {
            for (let i = 0; i < data.phones.length; i++) {
                if (!data.phones[i].phone || typeof data.phones[i].phone !== 'string' || !phoneRegex.test(data.phones[i].phone)) {
                    throw new Error(`phones property phone invalid or missing on phone number #${i + 1}`);
                } else if (typeof data.phones[i].primary !== 'boolean') {
                    throw new Error(`phones property primary invalid or missing on phone number #${i + 1}`);
                } else if (!data.phones[i].primary && data.phones[i].primary !== false) {
                    throw new Error(`phones property primary missing on phone number #${i + 1}`)
                }

                if (data.phones[i].primary) {
                    primary++;
                }
            }

            if (primary > 1) {
                throw new Error('primary number already exists');
            }
        }

        // Validate emails arr
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let primaryEmail = 0; // To keep track of primary email count

        if (!data.emails || !Array.isArray(data.emails)) {
            throw new Error('emails property invalid or missing');
        } else if (data.emails.length === 0) {
            throw new Error('emails array is empty');
        } else {
            for (let i = 0; i < data.emails.length; i++) {
                if (!data.emails[i].email || typeof data.emails[i].email !== 'string' || !emailRegex.test(data.emails[i].email)) {
                    throw new Error(`emails property email invalid or missing on email #${i + 1}`);
                } else if (typeof data.emails[i].primary !== 'boolean') {
                    throw new Error(`emails property primary invalid or missing on email #${i + 1}`);
                } else if (!data.emails[i].primary && data.emails[i].primary !== false) {
                    throw new Error(`emails property primary value missing on email #${i + 1}`)
                }

                // Count primary emails
                if (data.emails[i].primary) {
                    primaryEmail++;
                }
            }

            // Check if there's more than one primary email
            if (primaryEmail > 1) {
                throw new Error('primary email already exists');
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

    add(object) {
        this._validate(object);

        this.arr.push(object);
        object.id = this.counter;
        this.counter++;

        return object;
    }

}

class Groups {

    constructor() {
        this.groups = [];
        this.counter = 0;
    }

    add(room) {
        if (typeof room !== 'number' || room < 0) {
            throw new Error('room number invalid or missing')
        }


        this.groups.push({ 'room': room, 'id': this.counter, 'pupils': [] });
        this.counter++;

        return this.groups[this.counter - 1].id

    }

    addPupil(groupId, pupil) {

        const group = this.groups.find(obj => obj.id === groupId);

        if (!group) {
            throw new Error('group with provided id does not exist')
        }

        group.pupils.push(pupil);

        return group.id;
    }

    removePupil(groupId, pupilId) {
        const group = this.groups.find(obj => obj.id === groupId);
        const groupIndex = this.groups.findIndex(obj => obj.id === groupId);
        const pupil = group.pupils.find(obj => obj.id === pupilId);
        const pupilIndex = group.pupils.findIndex(obj => obj.id === pupilId);

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

    update(groupId, obj) {
        const groupIndex = this.groups.findIndex(obj => obj.id === groupId);

        if (!obj.room || typeof obj.room !== 'number' || obj.room <= 0) {
            throw new Error('room number invalid or missing')
        }

        this.groups[groupIndex].room = obj.room;

        return true;
    }

    read(groupId) {

        if (typeof groupId !== 'number' || groupId < 0) {
            throw new Error('groupId invalid or missing');
        }

        const groupIndex = this.groups.findIndex(obj => obj.id === groupId);

        if (groupIndex === -1) {
            throw new Error('group with provided id does not exist');
        }

        return this.groups[groupIndex];
    }

    readAll() {
        return this.groups;
    }

}

class Gradebooks {
    constructor(groups, teachers, subjects) {

        if (!groups || !teachers || !subjects) {
            throw new Error('paramater(s) missing');
        } else if (typeof groups !== 'object' || Array.isArray(groups)) {
            throw new Error('groups parameter invalid')
        } else if (typeof teachers !== 'object' || Array.isArray(teachers)) {
            throw new Error('teachers parameter invalid')
        } else if (typeof subjects !== 'object' || Array.isArray(subjects)) {
            throw new Error('subjects parameter invalid')
        }

        this.gradebooks = [];
        this.groups = groups;
        this.teachers = teachers;
        this.subjects = subjects;
        this.counter = 1;
    }


    add(groupId) {
        if (!groupId || typeof groupId !== 'number' || groupId <= 0) {
            throw new Error('groupId invalid or missing');
        }


        this.gradebooks.push({
            id: this.counter,
            groupId: groupId,
            records: []
        });
        this.counter++;
        return this.gradebooks[this.counter - 2].id

    }

    clear() {
        this.gradebooks = [];
        return true;
    }

    addRecord(gradebookId, obj) {
        if (!gradebookId || typeof gradebookId !== 'number' || gradebookId <= 0) {
            throw new Error('gradebookId invalid or missing');
        } else if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
            throw new Error('record parameter invalid or missing')
        } else if (!obj.pupilId || !obj.teacherId || !obj.subjectId || !obj.lesson || !obj.mark) {
            throw new Error('property(ies) are missing from the record')
        } else if (typeof obj.pupilId !== 'number' || typeof obj.teacherId !== 'number' || typeof obj.subjectId !== 'number' || typeof obj.lesson !== 'number' || typeof obj.mark !== 'number') {
            throw new Error('invalid property(ies) in record')
        }

        const gradebook = this.gradebooks.findIndex(obj => obj.id === gradebookId);

        this.gradebooks[gradebookId].records.push(obj);

        return true;
    }

    read(gradebookId, pupilId) {
        const gradebook = this.gradebooks.find(gradebook => gradebook.id === gradebookId);

        if (!gradebook) {
            throw new Error('Gradebook not found');
        }

        const group = this.groups.find(group => group.id === gradebook.groupId);
        const pupil = group ? group.pupils.find(pupil => pupil.id === pupilId) : undefined;

        if (!pupil) {
            throw new Error('Pupil not found in the specified group');
        }

        const records = gradebook.records.filter(record => record.pupilId === pupilId)
            .map(record => {
                const teacher = this.teachers.find(teacher => teacher.id === record.teacherId);
                const subject = this.subjects.find(subject => subject.id === record.subjectId);

                return {
                    teacher: teacher ? teacher.name : undefined,
                    subject: subject ? subject.name : undefined,
                    lesson: record.lesson,
                    mark: record.mark
                };
            });

        const result = {
            name: pupil.name,
            records: records
        };

        return result;
    }







}
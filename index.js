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

    remove(subject) {
        if (this.verify(subject)) {
            return `${this.subjects.splice(this.subjects.findIndex((item) => item.id === subject.id), 1)[0].title} removed;`
        } else {
            throw new Error('Invalid Input: Subject not found');
        }
    }

    readAll() {
        return this.subjects;
    }

    _validate(subject) {

        if (typeof subject !== 'object' || Array.isArray(subject)) {
            throw new Error('Invalid Input: wrong argument type');
        } else if (!subject.title || !subject.lessons) {
            throw new Error('Invalid Input: required parameter(s) missing');
        } else if (typeof subject.title !== 'string' || typeof subject.lessons !== 'number') {
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

    add(teacher) {
        this._validate(teacher);

        //validate subjects arr

        if (!teacher.subjects || !Array.isArray(teacher.subjects)) {
            throw new Error('subjects property invalid or missing')
        } else {
            for (let i = 0; i < teacher.subjects.length; i++) {
                if (teacher.subjects.lengths === 0) {
                    break;
                } else if (typeof teacher.subjects[i] !== 'object' || Array.isArray(teacher.subjects[i])) {
                    throw new Error(`subject #${i + 1} invalid`);
                } else if (!teacher.subjects[i].subject || typeof teacher.subjects[i].subject !== 'string') {
                    throw new Error(`subject #${i + 1} invalid or missing`);
                }
            }
        }

        this.arr.push(teacher);
        teacher.id = this.counter;
        this.counter++;

        return teacher.id;
    }


}
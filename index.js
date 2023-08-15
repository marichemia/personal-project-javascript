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
            throw new Error('Invalid Input: subject does not exist');
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


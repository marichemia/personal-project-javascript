var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CommonMethods = /** @class */ (function () {
    function CommonMethods() {
    }
    CommonMethods.prototype.isPositive = function (num) {
        if (num >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    CommonMethods.prototype.validateDOB = function (str) {
        //(YYYY-MM-DD)
        var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(str)) {
            throw new Error('wrong format DOB');
        }
    };
    CommonMethods.prototype.validatePhones = function (arr) {
        //(+1 000-000-0000)
        var phoneRegex = /^\+1\s\d{3}-\d{3}-\d{4}$/;
        var primary = 0;
        !arr.map(function (item) {
            if (item.primary === true)
                primary++;
        });
        if (arr.length === 0) {
            throw new Error('phone array is empty');
        }
        else if (!arr.every(function (item) { return phoneRegex.test(item.phone); })) {
            throw new Error('phone format is wrong');
        }
        else if (primary > 1) {
            throw new Error('primary phone number already exists');
        }
        primary = 0;
    };
    CommonMethods.prototype.validateEmails = function (arr) {
        return true;
    };
    return CommonMethods;
}());
var Subjects = /** @class */ (function (_super) {
    __extends(Subjects, _super);
    function Subjects() {
        var _this = _super.call(this) || this;
        _this.subjects = [];
        _this.counter = 0;
        return _this;
    }
    Subjects.prototype.verify = function (subject) {
        return this.subjects.some(function (item) { return item.title === subject.title; });
    };
    Subjects.prototype.add = function (subject) {
        if (!this.isPositive(subject.lessons)) {
            throw new Error('lessons property should be a positive number');
        }
        else if (this.verify(subject)) {
            throw new Error('subject with this name already exists');
        }
        subject.id = this.counter;
        this.subjects.push(subject);
        this.counter++;
        return subject.id;
    };
    Subjects.prototype.remove = function (subjectId) {
        var subjectIndex = this.subjects.findIndex(function (obj) { return obj.id === subjectId; });
        if (subjectIndex !== -1 && this.verify(this.subjects[subjectIndex])) {
            this.subjects.splice(subjectIndex, 1);
            return true;
        }
        else {
            throw new Error('Invalid Input: Subject not found');
        }
    };
    Subjects.prototype.readAll = function () {
        return this.subjects;
    };
    return Subjects;
}(CommonMethods));
var Pupils = /** @class */ (function (_super) {
    __extends(Pupils, _super);
    function Pupils() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.counter = 0;
        return _this;
    }
    Pupils.prototype.add = function (object) {
        this.validatePhones(object.phones);
        this.validateDOB(object.dateOfBirth);
        this.arr.push(object);
        object.id = this.counter;
        this.counter++;
        return object;
    };
    Pupils.prototype.read = function (objectId) {
        //validate id, check if person with this id exists
        if (!objectId || objectId >= this.counter || objectId < 0) {
            throw new Error('Invalid Id');
        }
        else if (!this.arr.find(function (obj) { return obj.id === objectId; })) {
            throw new Error('Person with provided Id does not exist');
        }
        return this.arr.find(function (obj) { return obj.id === objectId; });
    };
    Pupils.prototype.update = function (objectId, updatedData) {
    };
    return Pupils;
}(CommonMethods));

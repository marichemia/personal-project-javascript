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
var commonMethods = /** @class */ (function () {
    function commonMethods() {
    }
    commonMethods.prototype.isPositive = function (num) {
        if (num >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return commonMethods;
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
}(commonMethods));

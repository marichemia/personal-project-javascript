#### Personal project JavaScript

**Name**: Module for school management

Implement a school management system.

**List of Models ( Classes )**

- Subjects
- Teachers
- Pupils
- Groups
- Gradebooks

**Subjects**

```json
// Subject's Schema
{
  "title": "string", //  required string property.
  "lessons": "number", //  required number property.
  "description": "string" // optional string property.
}

// example of creating Subject's instance:
const history = {
  title: 'History',
  lessons: 24
};

const subjects = new Subjects();
const subjectId = subjects.add(history); // should add subject. Returns subject id
subjects.remove(subjectId); // should remove subject from subjects

// will return true or false. Answer will be true if such subject exists in subjects.
subjects.verify(history);

// will return array of registered subjects
// each subject must contain: id, title, lessons and description propertties.        
subjects.readAll();
[
  {
    id: '0',
    title: 'History',
    lessons: 24      
  }
]

```

**Teachers** 

```json
// Teacher's schema
{
  "name": {
    "first": "string",
    "last": "string"
  },
  "dateOfBirth": "string", // format date
  "emails": [
    {
      "email": "string",
      "primary": "boolean"
    }
  ],
  "phones": [
    {
      "phone": "string",
      "primary": "boolean"
    }
  ],
  "sex": "string", // male or female
  "subjects": [
    {
      "subject": "string" // just name property of subject.
    }
  ],
  "description": "string",
}
// all fields are required, except description

// Create new Teachers class.
const teachers = new Teachers();

// Create a new teacher
const teacherId = teachers.add(data);

// will return Teachers data including teacher's id
teachers.read(teacherId)

// will update Teacher. This method should use the same validation as a add method
const teacherId = teachers.update(teacherId, updatedProfile)

// will remove teacher
teachers.remove(teacherId)
```

**Pupils**

```json
// Pupil's Schema
{
  "name": {
    "first": "string",
    "last": "string"
  },
  "dateOfBirth": "string", // format date
  "phones": [
    {
      "phone": "string",
      "primary": "boolean"
    }
  ],
  "sex": "string", // male OR female
  "description": "string"
}
// all fields are required, except description

// Create new Pupil from Pupil's data
const pupils = new Pupils();

// Create a new pupil
const pupil = pupils.add(data);

pupil.id // should return pupil ID

// will return Pupils data including pupil's id
pupils.read(pupil.id)

// will update Pupil. This method should use the same validation as a add method
pupils.update(pupil.id, updatedProfile)

// will remove pupil
pupils.remove(pupil.id)
```

**Groups**

```json
const room = 236;
const groups = new Groups();

        
// Create a new group. add methods takes integer as a parameter. returns id of group
const groupId = groups.add(room);


// Add this pupil to this group
groups.addPupil(groupId, pupil);

// Remove this pupil from this group
groups.removePupil(groupId, pupil.id);

// Update room for this group
groups.update(groupId, {
  room: 237
});

// Read information about group
groups.read(groupId);
{
  id: 'JEF5H43H'
  room: 237,
  pupils:[] // array of pupils.     
}

// It will return array of groups
groups.readAll() 

```

**Gradebooks**

```javascript
const gradebooks = new Gradebooks(groups, teachers, subjects);

// Create a new gradebook.
const gradebookId = gradebooks.add(group.id);

// Destroy all data inside this gradebook
gradebooks.clear();

// shceme of a record. all fields are required.
const record = {
  pupilId: pupilId,
  teacherId: teacherId,
  subjectId: subjectId,
  lesson: 1,
  mark: 9
};

gradebooks.addRecord(gradebookId, record);

// Read information about oliver results
const oliver = gradebooks.read(gradebookId, pupilId);
{
  name: 'Oliver Black',
  records: [
    {
      teacher: 'Elizabeth Holms',
      subject: 'History',
      lesson: 1,
      mark: 9
    }
  ]
}

// Read information about all students in this gradebook
const students = gradebooks.readAll(gradebookId); // It will return the array of objects
```

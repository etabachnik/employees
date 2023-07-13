export const persons=[
    {id: 1, managerId: null,position: 'Manager', firstName: 'A1', lastName: 'B1',address: 'Ashdod', picture:'1.svg', tasks: [], reports:[]},
    {id: 2,  managerId: null,position: 'Manager', firstName: 'A2', lastName: 'B2',address: 'Ashdod', picture:'2.svg', tasks: [], reports:[]},
    {id: 3,  managerId: 1,position: 'Employee', firstName: 'A3', lastName: 'B3',address: 'Ashdod', picture:'3.svg', 
    tasks: [{text: 'Upload 3 files', date: '7/11/2023'},{text: 'Clean office', date: '7/11/2023'},{text: 'blaaaaaaa blaaaaaaa blaaaaaaa blaaaaaa', date: '7/11/2023'}], 
    reports:[]},
    {id: 4,  managerId: 2,position: 'Employee', firstName: 'A4', lastName: 'B4',address: 'Ashdod', picture:'4.svg', tasks: [], reports:[]},
    {id: 5,  managerId: 1,position: 'Employee', firstName: 'A5', lastName: 'B5',address: 'Ashdod', picture:'5.svg', tasks: [], reports:[]},
    {id: 6,  managerId: 1,position: 'Employee', firstName: 'A6', lastName: 'B6',address: 'Ashdod', picture:'6.svg', tasks: [], reports:[]},
    {id: 7,  managerId: 2,position: 'Employee', firstName: 'A7', lastName: 'B7',address: 'Ashdod', picture:'7.svg', tasks: [], reports:[]},
    {id: 8,  managerId: 2,position: 'Employee', firstName: 'A8', lastName: 'B8',address: 'Ashdod', picture:'8.svg', tasks: [], reports:[]},
    {id: 9,  managerId: 1,position: 'Employee', firstName: 'A9', lastName: 'B9',address: 'Ashdod', picture:'9.svg', tasks: [], reports:[]},
    {id: 10,  managerId: 2,position: 'Employee', firstName: 'A10', lastName: 'B10',address: 'Ashdod', picture:'10.svg', tasks: [], reports:[]},
    ]

export const ReportTypes = {
    1: 'Business Goal',
    2: 'Personal Goal'
}
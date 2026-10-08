function App() {
  let isTeacher: boolean = true;
const name: string = "Rob";
let age: number = 39;

let colors:string[] = ["red", "orange", "purple"];
 
let student = new Person();

student.name = name;
student.age = age;
student.isTeacher = isTeacher;

let people: Person[] = [
  {name: "rob", age: 39, isTeacher: true},
  {name: "jane", age: 28, isTeacher: false},
  {name: "Sam", age: 42, isTeacher: false}
];

return people[2].name + people[2].age
}





class Person {
  name!: string;
  age!: number;
  isTeacher!: boolean;
}
  export default App;

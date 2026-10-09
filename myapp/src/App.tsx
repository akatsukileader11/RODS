function App() {
  let isTeacher: boolean = true;
  const name: string = "Rob";
  let age: number = 39;

  let colors: string[] = ["red", "orange", "purple"];

  let student = new Person();
 
  student.name = name;
  student.age = age;
  student.isTeacher = isTeacher;

  let people: Person[] = [
    { name: "rob", age: 39, isTeacher: true },
    { name: "jane", age: 28, isTeacher: false },
    { name: "Sam", age: 42, isTeacher: false }
  ];
  let message: string = "Start";

  let score: number = 70;
  if (score >= 60) {
    message = "You passed!";
  } else {
    message = "You failed!";
  }

  let isActive: boolean = true;

  while (isActive) {
    message = "Loop";
    isActive = false;
  }
  
  let loops : number = 0;
  for (; loops < 3;) {
    loops = loops + 1;
  }

  //Loop #1 - start --> Loops = 0, 0 < 3 = true, end --> loops = 1
  //Loop #2 - start --> Loops = 1, 1 < 3 = true, end --> loops = 2
  //Loop #3 - start --> Loops = 2, 2 < 3 = true, end --> loops = 3
  //Loop #4 - start --> Loops = 3, 3 < 3 = false, end --> loops = 3

  let product: number = Multiply(8, 7);

  return printScore("70");
}

class Person {
  name!: string;
  age!: number;
  isTeacher!: boolean;
  }

function Multiply(number1: number, number2: number): number {
    return number1 * number2;
}

function printScore(parameter: string): string {
  try {
    let score: number = Number(parameter);

    if (isNaN(score)) {
      throw new Error("not a number!");
    }

    return String(score);
  } catch (error) {
    return String(error);
  }
}

export default App
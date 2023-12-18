// class and incapsulation

class Rectangle {
  constructor(public width: number, private height: number) {
    this.width = width;
    this.height = height;
  }
  calcArea() {
    return this.width * this.height;
  }

  get rectHeigth() {
    return this.height;
  }

  set rectHeigth(num: number) {
    this.height = num;
  }
}

const rect = new Rectangle(12, 15);
const rectArea = rect.calcArea();

console.log("class example: ", Rectangle);
console.log("object examle: ", rect);
console.log("public property example: ", rect.width);
// console.log("private property example: ", rect.height);

rect.rectHeigth = 2;
console.log("getter property example: ", rect.rectHeigth);
console.log("object examle: ", rect);

// extending
class Person {
  constructor(
    private _firstName: string,
    private _lastName: string,
    private _age: number
  ) {}

  public get fullName() {
    return `Name - ${this._firstName}, LastName - ${this._lastName}`;
  }

  public greet() {
    console.log(`Hi! I'm a person and my name is ${this._firstName}`);
  }

  get firstName() {
    return this._firstName;
  }
  set firstName(name: string) {
    this._firstName = name;
  }
  get lastName() {
    return this._lastName;
  }
  set lastName(lastName: string) {
    this._lastName = lastName;
  }
  get age() {
    return this._age;
  }
  set age(age: number) {
    this._age = age;
  }
}

const person = new Person("Vova", "Liapota", 18);
console.log("person object examle: ", person);

class Employee extends Person {
  constructor(
    firstName: string,
    lastName: string,
    age: number,
    private _number: string,
    private _snils: string
  ) {
    super(firstName, lastName, age);
  }

  public greet() {
    console.log(`Hi! I'm a EMPLOYEE and my name is ${this.firstName}`);
  }
}

const employee = new Employee(
  "EmployeeVova",
  "Liapota",
  24,
  "0968586824",
  "snils"
);
console.log("employee object examle: ", employee);

class Developer extends Employee {
  constructor(
    firstName: string,
    lastName: string,
    age: number,
    number: string,
    snils: string,
    private level: string
  ) {
    super(firstName, lastName, age, number, snils);
  }

  public greet() {
    console.log(`Hi! I'm a DEVELOPER and my name is ${this.firstName}`);
  }
}

const developer = new Developer(
  "developerVova",
  "developerLiapota",
  27,
  "0968586824",
  "snils developer",
  "junior"
);
console.log("developer object examle: ", developer.fullName);

// polymorphism

// person.greet();
// employee.greet();
// developer.greet();

const personList: Person[] = [person, employee, developer];

personList.forEach((person: Person) => person.greet());

// composition and agregation
class Engine {
  drive() {
    console.log("Engine is working");
  }
}

class Wheel {
  drive() {
    console.log("Wheel is working");
  }
}

class Freshener {
  fresh() {
    console.log("fresh air");
  }
}

class Car {
  engine: Engine;
  wheels: Wheel[] = [];
  freshener: Freshener;

  constructor(freshener: Freshener) {
    // composition
    this.engine = new Engine();
    this.wheels.push(new Wheel());
    this.wheels.push(new Wheel());
    this.wheels.push(new Wheel());
    this.wheels.push(new Wheel());

    this.freshener = freshener;
  }
  // delegating
  drive() {
    this.engine.drive();
    this.wheels.forEach((wheel: Wheel) => wheel.drive());
  }
}

const freshener = new Freshener();
const car = new Car(freshener);

car.drive();
car.freshener.fresh();

// interfaces and abstract classes

class User {
  constructor(public username: string, public password: string) {}
}
interface IRepository<T> {
  create: (obj: T) => T;
  get: () => void;
  delete: (obj: T) => T;
  update: (obj: T) => T;
}

class UserRepo implements IRepository<User> {
  create(user: User) {
    return user;
  }
  get() {
    return;
  }
  delete(user: User) {
    return user;
  }
  update(user: User) {
    return user;
  }
}

class CarRepo implements IRepository<Car> {
  create(car: Car) {
    return car;
  }
  get() {
    return;
  }
  delete(car: Car) {
    return car;
  }
  update(car: Car) {
    return car;
  }
}

// dependency injection

interface IUserRepo {
  getUsers: () => User[];
}

class UserMongoDBRepo implements IUserRepo {
  getUsers(): User[] {
    console.log("connect to MongoDB and gett all users");
    return [new User("vova", "123"), new User("vova", "234")];
  }
}

class UserPostgresDBRepo implements IUserRepo {
  getUsers(): User[] {
    console.log("connect to PostgressDB and get all users");
    return [new User("vova2", "345"), new User("vova3", "456")];
  }
}

class UserService {
  constructor(private userRepo: IUserRepo) {}

  filterUsersByName(name: string) {
    const users = this.userRepo.getUsers();
    const filteredUsers = users.filter((user: User) => user.username === name);
    console.log(filteredUsers);
  }
}

const mongoDB = new UserMongoDBRepo();
const userService = new UserService(mongoDB);

userService.filterUsersByName("vova");

// singleton

class Database {
  url: number;
  private static instance: Database;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.url = Math.random();
    Database.instance = this;
  }
}

const db1 = new Database();
const db2 = new Database();

console.log("db1: ", db1.url);
console.log("db2: ", db2.url);

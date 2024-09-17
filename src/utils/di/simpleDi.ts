// Без DI
class Dog {
  bark(message: string) {
    const cliOutput = new CliOutput();
    cliOutput.print(message);
  }
}

class CliOutput {
  print(message: string) {
    process.stdout.write(message);
  }
}

const dog = new Dog();

dog.bark("woof");

// С простешим DI

interface IOutput {
  print(message: string): void;
}

class CliOutputTwo implements IOutput {
  print(message: string) {
    process.stdout.write(message);
  }
}

class DogTwo {
  output: IOutput;
  constructor(output: IOutput) {
    this.output = output;
  }

  bark(message: string) {
    this.output.print(message);
  }
}

const newDog = new DogTwo(new CliOutputTwo());
newDog.bark("woof");

// С интерфейсов и простешим DI

class DogService {
  createDog() {
    const output: IOutput = new CliOutputTwo();
    const dog = new DogTwo(output);
    return dog;
  }
}

const dogService = new DogService();
const dogThree = dogService.createDog();
dogThree.bark("woof");

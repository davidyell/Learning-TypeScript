import { sayHello } from "./greet";

console.log(sayHello("TypeScript"));

function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
}
hello("TypeScript");

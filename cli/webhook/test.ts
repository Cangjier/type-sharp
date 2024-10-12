import { args } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Guid } from "../.tsc/System/Guid";
import { Path } from "../.tsc/System/IO/Path";
import { Xml } from "../.tsc/TidyHPC/LiteXml/Xml";

let person=()=>{
    let sayHello=()=>{
        console.log("Hello, my name is John");
        console.log("I'm 25 years old");
    };
    return {
        sayHello
    };
};

let p=person();
p.sayHello();
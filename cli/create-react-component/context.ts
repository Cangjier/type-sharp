export const args: string[] = [];

export const exec: (path:string,...args: string[]) => number = (...args: string[]) => {
    return 0 as number;
}

export const cmd:(workingDirectory:string,commandLine:string)=>number=(workingDirectory:string,commandLine:string)=>{
    return 0 as number;
}

export const script_path:string = "";
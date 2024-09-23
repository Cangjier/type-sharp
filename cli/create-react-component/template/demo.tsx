import { forwardRef } from "react";

export const demo=forwardRef<{},{}>((props,ref)=>{
    return <div>
        {"hello world"}
    </div>
});
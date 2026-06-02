import { useRef, useState } from "react";

export const useUpdate = <T>(value: T) => {
    const [state, setstate] = useState<T>(value)
    const ref = useRef<T>(value)
    const update = (value: React.SetStateAction<T>, onNewValue?: (value: T) => void) => {
        if (typeof value == "function") {
            let func = value as (prevState: T) => T;
            setstate(old => {
                let newState = func(old);
                ref.current = newState;
                onNewValue?.(newState);
                return newState;
            });
        }
        else {
            ref.current = value
            setstate(value)
            onNewValue?.(value);
        }

    }
    return [state, update, ref] as const
}

export const InjectStyle = (value: string) => {
    const id = `rand_${Math.random().toString(36).substr(2, 9)}`
    if (document.getElementById(id) === null) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = id;
        style.innerHTML = value;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}
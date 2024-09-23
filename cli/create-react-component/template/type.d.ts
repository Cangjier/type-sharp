declare module '*.svg' {
    import React = require('react');

    const src: string;
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    export default src;
    export { ReactComponent };
}
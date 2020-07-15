export class AudioPlayer {
static apply(p0: any,p1: any): any;
static bind(p0: any): any;
static call(p0: any): any;
static displayName: string;
static options: {
defaultTheme: {
breakpoints: {
between: any;
down: any;
keys: any;
only: any;
up: any;
values: any;
width: any;
};
direction: string;
mixins: {
gutters: any;
toolbar: any;
};
overrides: {};
palette: {
action: any;
augmentColor: any;
background: any;
common: any;
contrastThreshold: any;
divider: any;
error: any;
getContrastText: any;
grey: any;
primary: any;
secondary: any;
text: any;
tonalOffset: any;
type: any;
};
props: {};
shadows: any[];
shape: {
borderRadius: any;
};
spacing: {
unit: any;
};
transitions: {
create: any;
duration: any;
easing: any;
getAutoHeightDuration: any;
};
typography: {
body1: any;
body1Next: any;
body2: any;
body2Next: any;
button: any;
buttonNext: any;
caption: any;
captionNext: any;
display1: any;
display2: any;
display3: any;
display4: any;
fontFamily: any;
fontSize: any;
fontWeightLight: any;
fontWeightMedium: any;
fontWeightRegular: any;
h1: any;
h2: any;
h3: any;
h4: any;
h5: any;
h6: any;
headline: any;
overline: any;
pxToRem: any;
round: any;
subheading: any;
subtitle1: any;
subtitle2: any;
title: any;
useNextVariants: any;
};
zIndex: {
appBar: any;
drawer: any;
mobileStepper: any;
modal: any;
snackbar: any;
tooltip: any;
};
};
withTheme: boolean;
};
constructor(props: any,context: any);
attach(theme: any): void;
componentDidMount(): void;
componentDidUpdate(): void;
componentWillUnmount(): void;
createSheet(theme: any): any;
detach(theme: any): void;
forceUpdate(callback: any): void;
getClasses(): any;
render(): any;
setState(partialState: any,callback: any): void;
}
export namespace AudioPlayer {
class Naked {
static defaultProps: {
classNames: {};
classes: {};
elevation: number;
height: string;
rounded: boolean;
showLoopIcon: boolean;
width: string;
};
static displayName: string;
constructor(args: any);
componentDidMount(): void;
componentWillUnmount(): void;
forceUpdate(callback: any): void;
render(): any;
setState(partialState: any,callback: any): void;
}
namespace contextTypes {
function d4bd0baacbc52bbd48bbb9eb24344ecd(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
namespace d4bd0baacbc52bbd48bbb9eb24344ecd {
function isRequired(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
}
function muiThemeProviderOptions(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
namespace muiThemeProviderOptions {
function isRequired(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
}
}
namespace propTypes {
function classes(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
namespace classes {
function isRequired(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
}
function innerRef(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
namespace innerRef {
function isRequired(p0: any,p1: any,p2: any,p3: any,p4: any,p5: any): any;
}
}
}

let useLine = ""

const setuseLine = (input) => {
    useLine = input;
    console.log("useLine input: ", input)
}
const getuseLine = () => {
    return useLine;
}

const cleanuseLine = () => {
    useLine = "";
    console.log("clean useLine: ", useLine);
}

export{useLine, setuseLine, getuseLine, cleanuseLine};
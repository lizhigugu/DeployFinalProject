let useLine = ""

const setuseLine = (input) => {
    useLine = input;
}

const getuseLine = () => {
    return useLine;
}

const cleanuseLine = () => {
    useLine = "";
}

export{useLine, setuseLine, getuseLine, cleanuseLine};
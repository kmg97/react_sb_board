export default function (event, [...args]){
    for (const el of args) {
        if (el.length === 0){
            return false;
        }
    }

    return event.keyCode === 13;
}
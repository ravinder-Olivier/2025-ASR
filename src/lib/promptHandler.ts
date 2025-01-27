import genText from "./genText"

export default async function promptHandler (prompt: string, type: boolean) {
    return await genText(prompt,tester(type))
}

function tester (check) {
    if (check == 'true') {
        return true
    }
    else if (check == false) {
        return false
    }
    else {
        return false
    }

}
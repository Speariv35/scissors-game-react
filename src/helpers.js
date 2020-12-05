export const sendChoice = async (userChoice) => {
    
    const data = {
        userChoice
    }
    const url = 'https://scissors-game-back.herokuapp.com/play';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json()

}
export const getScore = async () => {
    const url = 'https://scissors-game-back.herokuapp.com/get-score';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json()

}
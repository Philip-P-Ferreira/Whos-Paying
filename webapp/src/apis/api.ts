const API_PREFIX = "http://localhost:5000" 

export async function loginApi(username: string, password: string) {

  try {
    const fullUrl = API_PREFIX + "/api/login?username=" + username + "&password=" + password
    const response = await fetch(fullUrl)

    return await response.text() === "Logged in"
  } catch (e) {
    console.error(e)
    return false
  }

}

export async function createLobbyApi(bill: number): Promise<String | null> {

  try {
    const fullUrl = API_PREFIX + "/api/create-lobby?bill=" + bill
    const response = await fetch(fullUrl)

    return await response.text()
  } catch(e) {
    console.error(e)
    return null
  }

}

export async function joinLobbyApi(lobbyCode: string) {

  try {
    const fullUrl = API_PREFIX + "/api/join-lobby/" + lobbyCode
    const response = await fetch(fullUrl)

    return await response.text() === "Joining lobby code " + lobbyCode
  } catch(e) {
    console.error(e)
    return false
  }

}

export async function lobbyStateApi(lobbyCode: string): Promise<JSON | null> {

  try {
    const fullUrl = API_PREFIX + "/api/lobby-state/" + lobbyCode
    const response = await fetch(fullUrl)

    return await response.json()
  } catch(e) {
    console.error(e)
    return null
  }

}

export async function leaveLobbyApi() {

  try {
    const fullUrl = API_PREFIX + "/api/leave-lobby"
    const response = await fetch(fullUrl)

    return await response.text() === ""
  } catch(e) {
    console.error(e)
    return false
  }

}

export async function endLobbyApi() {

  try {
    const fullUrl = API_PREFIX + "/api/end-lobby"
    const response = await fetch(fullUrl)

    return await response.text() === ""
  } catch(e) {
    console.error(e)
    return false
  }

}

export async function readyApi(lobbyCode: string) {
  
  try {
    const fullUrl = API_PREFIX + "/api/ready/" + lobbyCode
    const response = await fetch(fullUrl)

    return await response.text() === "Ready"
  } catch(e) {
    console.error(e)
    return false
  }

}

export async function countdownGameApi(lobbyCode: string): Promise<JSON | null> {
  
  try {
    const fullUrl = API_PREFIX + "/api/countdown-game/" + lobbyCode
    const response = await fetch(fullUrl)

    return await response.json()
  } catch(e) {
    console.error(e)
    return null
  }

}

export async function balanceApi(): Promise<string | null> {

  try {
    const fullUrl = API_PREFIX + "/api/balance"
    const response = await fetch(fullUrl)

    return await response.text()
  } catch(e) {
    console.error(e)
    return null
  }

}

export async function countdownSubmitApi(lobbyCode: string, solution: number) {

  try {
    const fullUrl = API_PREFIX + "/api/countdown-submit/" + lobbyCode + "?solution=" + solution
    const response = await fetch(fullUrl)

    return await response.text() === ""
  } catch(e) {
    console.error(e)
    return false
  }
  
}
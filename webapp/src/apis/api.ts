const API_PREFIX = "http://localhost:5000" 

export async function loginApi(username: string, password: string) {

  try {
    const fullUrl = API_PREFIX + "/api/login?username=" + username + "&password=" + password
    const response = await fetch(fullUrl)
    console.log(response)

    if (await response.text() === "Logged in") {
      return true
    }
    return false
  } catch (e) {
    console.error(e)
    return false
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
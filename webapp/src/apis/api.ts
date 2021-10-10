const API_PREFIX = "" 

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

export async function balanceApi(): Promise<number | null> {
  try {
    const fullUrl = API_PREFIX + "/api/balance"
    const response = await fetch(fullUrl, {
      credentials: "include",
    })

    return parseInt(await response.text())
  } catch(e) {
    console.error(e)
    return null
  }

}
import { hitCoda, Result } from '../utils'

export default async function ml(id: number, zone: number): Promise<Result> {
  try {
    const url = `https://cekid.sarjanatopup.com/mlud.php?id=${id}&zone=${zone}`
    const headers = {
      'accept': 'application/json',
      'User -Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36', // Corrected User-Agent header
    }

    // Fetch data using GET request
    const response = await fetch(url, { method: 'GET', headers })

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data = await response.json()

    // Log the raw data to inspect it
    console.log('API response:', data)

    // Check if the API response is successful
    if (data.status !== true) {
      throw new Error(data.msg || 'Error occurred while fetching data')
    }

    // Extract relevant data from the response
    const nickname = data.data.nickname
    const country = data.data.country // Assuming the country field exists in the response

    // Check if nickname and country exist in the response
    if (!nickname) {
      throw new Error('Nickname is missing in the response')
    }
    if (!country) {
      throw new Error('Country is missing in the response')
    }

    return {
      success: true,
      game: 'Mobile Legends: Bang Bang',
      id: String(id), // Ensure id is a string
      server: String(zone), // Ensure zone is a string
      name: nickname,
      country: country, // Include country in the response
    }
  } catch (error) {
    console.error('Error in ml function:', error)
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    }
  }
}

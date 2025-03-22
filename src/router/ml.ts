import { hitCoda, Result } from '../utils'

export default async function ml(id: number, zone: number): Promise<Result> {
  try {
    const url = `https://api.ryzendesu.vip/api/stalk/ml?userId=${id}&zoneId=${zone}`
    const headers = {
      'accept': 'application/json',
    }

    // Fetch data using GET request
    const response = await fetch(url, { method: 'GET', headers })
    const data = await response.json()

    // Check if the API response is successful
    if (data.status !== 'success') {
      throw new Error(data.message || 'Error occurred while fetching data')
    }

    // Extract relevant data from the response
    const username = data.data.username
    const accountAge = data.accountAge
    const createRoleCountry = data.data.create_role_country
    const thisLoginCountry = data.data.this_login_country

    // Check if username exists in the response
    if (!username) {
      throw new Error('Username is missing in the response')
    }

    return {
      success: true,
      game: 'Mobile Legends: Bang Bang',
      id,
      server: zone,
      name: username,
      accountAge: `${accountAge.years} years, ${accountAge.months} months, ${accountAge.days} days`,
      createRoleCountry,
      thisLoginCountry
    }
  } catch (error) {
    console.error('Error in ml function:', error)
    return {
      success: false,
      message: 'An error occurred while processing the request',
    }
  }
}

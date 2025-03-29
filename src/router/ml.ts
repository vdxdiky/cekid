import { hitCoda, Result } from '../utils';

export default async function ml(game: string, userId: number, server?: number): Promise<Result> {
  // Construct the URL
  let url = `https://cekid.sarjanatopup.com/${game}.php?id=${userId}`;
  if (server) url += `&zone=${server}`;

  try {
    // Make the GET request using fetch
    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json; charset=utf-8" }, // Set Content-Type header
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Log the raw data to inspect it
    console.log('API response:', data);

    // Check if the API response is successful
    if (data.status !== true) {
      throw new Error(data.msg || 'Error occurred while fetching data');
    }

    // Extract relevant data from the response
    const nickname = data.data.nickname;
    const country = data.data.country; // Assuming the country field exists in the response

    // Check if nickname and country exist in the response
    if (!nickname) {
      throw new Error('Nickname is missing in the response');
    }
    if (!country) {
      throw new Error('Country is missing in the response');
    }

    return {
      success: true,
      game: 'Mobile Legends: Bang Bang',
      id: String(userId), // Ensure id is a string
      server: server ? String(server) : undefined, // Ensure zone is a string if provided
      name: nickname,
      country: country, // Include country in the response
    };
  } catch (error) {
    console.error('Error in ml function:', error);
    return {
      success: false,
      message: `An error occurred: ${error.message}`,
    };
  }
}

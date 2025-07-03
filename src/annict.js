import axios from "axios";
import { ANNICT_TOKEN } from "./config.js"

export async function getMyWorks(status, page = 1) {
  const url = "https://api.annict.com/v1/me/works";
  const params = {
    filter_status: status,
    page: page,
    per_page: 50,
    sort_season: "desc",
  }

  try {
    console.log(`Fetching works with status: ${status}, page: ${page}`);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${ANNICT_TOKEN}`,
      },
      params,
    });

    if (response.data.next_page) {
      return [...response.data.works, ...await getMyWorks(status, response.data.next_page)];
    } else {
      return response.data.works;
    }

  } catch (error) {
    console.error(`Annict API error: ${error.response?.status} ${error.response?.statusText}`);
    throw error;
  }
}
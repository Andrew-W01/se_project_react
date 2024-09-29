const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const request = (url, headerInfo) => {
  return fetch(url, headerInfo).then(checkResponse);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const postItem = (name, link, weather) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: link,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  }).then(checkResponse);
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  }).then(checkResponse);
};

export { baseUrl };

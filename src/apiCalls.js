export function getData(file) {
  return fetch(`http://localhost:3001/api/v1/${file}`).then(response => response.json());
}

export function postData(body) {
  return fetch(`http://localhost:3001/api/v1/trips`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
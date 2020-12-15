export function getList() {
    return fetch('http://localhost:8888/listMajors')
      .then(data => data.json())
  }
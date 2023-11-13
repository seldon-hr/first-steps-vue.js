async function connectToAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

let result = connectToAPI("https://jsonplaceholder.typicode.com/todos/1");
console.log(result);

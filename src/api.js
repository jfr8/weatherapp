export const getData = (urlBase, inputLocation, api_key) =>
  fetch(`${urlBase}weather?q=${inputLocation}&APPID=${api_key}`).then(
    (response) => {
      //console.log('response: ',response.body)
      return response.json();
    }
  );

export default class api {
  constructor(options) {
    //constructor body
  }

  getInitialCards() {
    fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "d2cb5c42-088c-4f10-972a-3d1426bf2382",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }
}

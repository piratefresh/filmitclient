// ES Modules syntax
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: "39872873607d048423410df6a30980d6581157fe3bc6267f4e4285050b3a92fe"
});

export const fetchUnsplashImage = () => {
  unsplash.photos
    .getRandomPhoto({ query: "abstract pattern" })
    .then(toJson)
    .then(data => {
      return data;
    });
};

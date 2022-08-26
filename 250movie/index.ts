import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.34-alpha/deno-dom-wasm.ts";

export default async function getMovie() {
  const res = await fetch("https://www.imdb.com/chart/top/?ref_=nv_mv_250", {
    headers: {
      "Accept-Language": "en-US",
    },
  });

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html")!;
  const table = doc.querySelector("table[data-caller-name='chart-top250movie']");
  const list = table?.querySelectorAll("tr > td[class='titleColumn'] > a");
  const movies: string[] = [];
  list?.forEach((a: any) => movies.push(a.textContent));
  return movies[Math.floor(Math.random() * movies.length)];
}

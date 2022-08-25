import { DOMParser } from 'deno-dom';

const res = await fetch('https://www.imdb.com/chart/top/?ref_=nv_mv_250', {
  headers: {
    'Accept-Language': 'en-US',
  },
});
const html = await res.text();
const doc = new DOMParser().parseFromString(html, 'text/html')!;
const table = doc.querySelector('table[data-caller-name="chart-top250movie"]');
const list = table?.querySelectorAll('tr > td[class="titleColumn"] > a');
const movies: string[] = [];
list?.forEach((a: any) => movies.push(a.textContent));
console.log(movies[Math.floor(Math.random() * movies.length)]);

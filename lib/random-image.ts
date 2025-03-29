import jinwoo from "@/public/jinwoo.jpg";
import car from "@/public/car.jpg";
import bulbasor from "@/public/bulbasaur-pokemon-4k-wallpaper-uhdpaper.com-97@2@a.jpg";
import anime from "@/public/anime.jpg";

const images = [jinwoo, car, bulbasor, anime];
export const randomImage = images[Math.floor(Math.random() * images.length)];

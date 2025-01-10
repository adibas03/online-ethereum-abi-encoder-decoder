import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { title, description } from "app/config/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title },
    {
      name: "description",
      content: description,
    },
  ];
}

export default function Home() {
  return <Welcome />;
}

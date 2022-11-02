import { HomeLayout } from "~/layout";
import { HomePage } from "~/page";
const router = [
  {
    path: "/",
    component: HomePage,
    layout: HomeLayout,
  },
];
export { router };

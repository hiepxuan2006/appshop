import { Home } from "~/app/Home/Home"
import { HistoryAccount } from "~/app/homePage/HistoryAccount"
import { HomeAccount } from "~/app/homePage/HomeAccount"
import { OfferAccount } from "~/app/homePage/OfferAccount"
import { RankAccount } from "~/app/homePage/RankAccount"
import { Cart } from "~/app/order/Cart"
import { PaymentCard } from "~/app/payment/PaymentCard"
import { PaymentComplete } from "~/app/payment/PaymentComplete"
import { PaymentInfo } from "~/app/payment/PaymentInfo"
import { ProductDetail } from "~/app/productDetail/ProductDetail"
import { Login } from "~/components/auth/login/Login"
import { Register } from "~/components/auth/register/Register"
import { BlogLayout, HomeLayout } from "~/layout"
import { CheckOrder } from "~/app/order/CheckOrder"
import { ProductHomePage } from "~/app/store/ProductHomePage"
import { HomeBlog } from "~/app/blog/HomeBlog"
import { PostDetail } from "~/app/blog/PostDetail"

const router = [
  {
    path: "/",
    component: Home,
    layout: HomeLayout,
  },
  {
    path: "/account",
    component: Login,
    layout: HomeLayout,
  },
  {
    path: "/account/register",
    component: Register,
    layout: HomeLayout,
  },

  {
    path: "/san-pham/:slug",
    component: ProductDetail,
    layout: HomeLayout,
  },
  {
    path: "/cart",
    component: Cart,
    layout: HomeLayout,
  },

  {
    path: "/payment",
    component: PaymentInfo,
    layout: HomeLayout,
  },
  {
    path: "/payment-card",
    component: PaymentCard,
    layout: HomeLayout,
  },
  {
    path: "/payment-complete",
    component: PaymentComplete,
    layout: HomeLayout,
  },
  {
    path: "/tra-cuu-don-hang",
    component: CheckOrder,
    layout: HomeLayout,
  },
  {
    path: "/san-pham/danh-muc/:category",
    component: ProductHomePage,
    layout: HomeLayout,
  },
  {
    path: "/hx-blog/home",
    component: HomeBlog,
    layout: BlogLayout,
  },
  {
    path: "/hx-blog/:topic",
    component: HomeBlog,
    layout: BlogLayout,
  },
  {
    path: "/hx-blog/bai-viet/:title",
    component: PostDetail,
    layout: BlogLayout,
  },
]

const routerPrivate = [
  {
    path: "/account/homepage",
    component: HomeAccount,
    layout: HomeLayout,
  },
  {
    path: "/account/order",
    component: HistoryAccount,
    layout: HomeLayout,
  },
  {
    path: "/account/promotion",
    component: OfferAccount,
    layout: HomeLayout,
  },
  {
    path: "/account/user-info",
    component: RankAccount,
    layout: HomeLayout,
  },
  {
    path: "/account/rank",
    component: RankAccount,
    layout: HomeLayout,
  },
]
export { router, routerPrivate }

import { Footer } from "~/components/footer/Footer"
import { HeaderBlog } from "./HeaderBlog"
import { BlogLayoutLeft } from "./BlogLayoutLeft"

const BlogLayout = ({ children }) => {
  return (
    <div className="WrapperBlog">
      <HeaderBlog />
      <div className="ContainerBlog">
        <div className="row">
          <div className="col col-md-3">
            <BlogLayoutLeft />
          </div>
          <div className="col col-md-9">
            <div className="BlogLayoutRight">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default BlogLayout

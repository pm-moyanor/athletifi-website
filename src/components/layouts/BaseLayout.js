import Header from "@/components/shared/Header";

// This is for components that appear on all pages of the website, such as the top menu bar.
// The children prop is used to render the content of the page.
const BaseLayout = props => {
  const { className, children } = props;
  return (
    <div className="layout-container">
      <Header />
      <main className={`cover ${className}`}>
        <div className="wrapper">
          {children}
        </div>
      </main>
    </div>
  )
}

export default BaseLayout;




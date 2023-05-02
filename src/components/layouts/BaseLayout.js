import Header from "../shared/Header";

// This is for components that appear on all pages of the website, such as the top menu bar.

const BaseLayout = props => {

  return (
    <>
      <Header />
      {props.children}
    </>
  )
}


export default BaseLayout;
import "./src/styles/components/loader.scss"
import "./src/styles/components/text-info.scss"
import "./src/styles/layout/layout.scss"
import "./src/styles/layout/reset.scss"
import "./src/styles/layout/footer.scss"
import "./src/styles/pages/index.scss"
import "./src/styles/pages/ficus.scss"
import "./src/styles/pages/partitions.scss"
import "./src/styles/pages/beer.scss"

// All this mess is to try to move the page to the corresponding anchor.

export const onRouteUpdate = ({ location }) => {
  anchorScroll(location);
  return true;
}

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  anchorScroll(location);
  return true;
}

function anchorScroll(location) {
  // Check for location so build does not fail
  if (location && location.hash) {
    setTimeout(() => {
      document.querySelector(`${location.hash}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
      // const item = document.querySelector(`${location.hash}`).offsetTop;
      // const mainNavHeight = document.querySelector(`#header-section`).offsetHeight;
      // console.log("TOP IS", item)
      // window.scrollTo({ top: item, left: 0, behavior: 'smooth' });
    }, 0);
  }
}
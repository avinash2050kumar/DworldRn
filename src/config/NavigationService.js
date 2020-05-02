import { NavigationActions,StackActions} from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function pop(count=1) {
  _navigator.dispatch(
      StackActions.pop(count)
  );
}
function popToTop() {
    _navigator.dispatch(StackActions.popToTop())
}

// add other navigation functions that you need and export them

export default {
  navigate,pop,popToTop,
  setTopLevelNavigator
};

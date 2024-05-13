import { Provider } from "react-redux";
import Home from "./pages/home";
import store from "./redux/store/store";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigators/stackNavigation";
import BottomNav from "./navigators/bottomNavbar";

export default function App() {
  return (
    <NavigationContainer theme={{ colors: { background: "#14213d" } }}>
      <Provider store={store}>
        {/* <BottomNav></BottomNav> */}
        <StackNavigation></StackNavigation>
      </Provider>
    </NavigationContainer>
  );
}

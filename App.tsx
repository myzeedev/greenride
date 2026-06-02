import 'react-native-gesture-handler';
import PageNavigator from "./src/nav/PageNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PageNavigator />
        </GestureHandlerRootView>
    );
}
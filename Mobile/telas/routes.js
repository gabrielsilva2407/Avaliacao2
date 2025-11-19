import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Home";
import Descricao from "./Descricao";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Descricao" component={Descricao} />
    </Stack.Navigator>
  );
}
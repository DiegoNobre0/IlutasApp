import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EventoPage,
  HomePage,
  LoginPage,
  ProfilePage,
  AllEventsPage
} from "../../screens";
import { HeaderHome, HeaderMenu, TabBar } from "../../components";
import { useAuth } from "..";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BuyEventPage } from "src/screens/buyEvent";
import { PaymentEventPage } from "src/screens/paymentEvent";


const Tab = createBottomTabNavigator();


const Routes = () => {
  const { currentAccount } = useAuth();
  const Stack = createNativeStackNavigator();

  const AuthenticationNavigator = () => (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );

  const SystemNavigator = () => (
    <Tab.Navigator initialRouteName="Início"
      tabBar={
        (props) => (
          <TabBar {...props} />
        )
      }
    >
      <Tab.Screen
        name="Início"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Eventos"
        component={EventoPage as any}
        options={{
          headerShown: false,
        }}
        getId={({ params }) => {
          return (params as { id?: string })?.id
        }}
      />
      <Tab.Screen
        name="AllEvents"
        component={AllEventsPage as any}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="BuyEvent"
        component={BuyEventPage as any}
        options={{
          headerShown: false,
        }}
        getId={({ params }) => {
          return (params as { id?: string })?.id
        }}
      />
      <Tab.Screen
        name="PaymentEvent"
        component={PaymentEventPage as any}
        options={{
          headerShown: false,
        }}
        getId={({ params }) => {
          return (params as { id?: string })?.id
        }}
      />

      <Tab.Screen
        name="Inscrições"
        component={HomePage}
      />
      <Tab.Screen
        name='perfil'
        options={{
          headerShown: false,
        }}
        component={ProfilePage}
      />
      <Tab.Screen
        name="Atletas"
        component={HomePage}
      />
      <Tab.Screen
        name="Filiação"
        component={HomePage}
      />
      <Tab.Screen
        name="Serviços"
        component={HomePage}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!(!!currentAccount) ? (
          <Stack.Screen
            name="AuthScreens"
            component={AuthenticationNavigator}
          />
        ) : (
          <Stack.Screen name="SystemScreens" component={SystemNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

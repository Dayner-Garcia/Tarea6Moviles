import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import ToolboxScreen from "./Components/ToolScreen";
import GenderScreen from "./Components/GenderScreen";
import AgePredictionScreen from "./Components/AgePredictionScreen";
import UniversitiesScreen from "./Components/UniversitiesScreen";
import WeatherScreen from "./Components/WeatherRdScreen";
import PokemonScreen from "./Components/PokemonScreen";
import NewsScreen from "./Components/NewsScreen";
import AboutMe from "./Components/AboutMe";

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName={"ToolboxScreen"}>
                <Drawer.Screen name={"ToolboxScreen"} component={ToolboxScreen}/>
                <Drawer.Screen name={"Predecir mi genero"} component={GenderScreen}/>
                <Drawer.Screen name={"Predecir mi edad"} component={AgePredictionScreen}/>
                <Drawer.Screen name={"Buscar universidades por pais"} component={UniversitiesScreen}/>
                <Drawer.Screen name={"Tiempo en Republica Dominicana"} component={WeatherScreen}/>
                <Drawer.Screen name={"Buscar pokemones"} component={PokemonScreen}/>
                <Drawer.Screen name={"Noticias"} component={NewsScreen}/>
                <Drawer.Screen name={"Acerca de mi"} component={AboutMe}/>
            </Drawer.Navigator>
        </NavigationContainer>
);
}

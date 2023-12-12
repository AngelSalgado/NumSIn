import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../style/colors";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TabLocalizationNavigation from "../../tabNavegations/tabNav";

const Tab = createBottomTabNavigator();


export default function ScreenUnidades({ route, navigation }) {
  const mapRef = useRef(null);
  const [activeChangeMapType, setActiveChangeMapType] = useState(false);
 
 return (
    
    <View style={styles.container2}>
     
      
      <View>
        <View
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
          }}
          paddingTop={5}
        >
          <LinearGradient
            start={{ x: 0.2, y: 2 }}
            end={{ x: 2.3, y: 0.5 }}
            colors={["#19bdd3", "#19d3c0", "#19d3c0"]}
            style={styles.linearGradientTecnico}
          >
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.titutecnico}>
                  sss
                </Text>
                <Text style={styles.Titutec}>TÉCNICO</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>


    </View>
  ); 
}
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 2,
    color: "#F9FAFC",
    borderColor: "#E3E3E3",
    borderRadius: 3,
  },
  cardContainer: {
    flex: 1,
    width: responsiveWidth(93),
    height: responsiveHeight(9),
    shadowRadius: 1,
    borderRadius: 15,
    elevation: 5,
  },
  container2: {
    flex: 2,
    width: responsiveWidth(93),
    height: responsiveHeight(9),
  },
  mapView: {
    width: responsiveHeight(80),
    height: responsiveHeight(75.1),
  },
  container3: {
    width: responsiveWidth(93),
    height: responsiveHeight(9),
  },
  TituloCuidarAuto: {
    fontSize: 15,
    textAlign: "center",
    color: "#676464",
    fontWeight: "bold",
  },
  TituloNuevosProd: {
    fontSize: responsiveFontSize(1.9),
    color: "white",
    fontWeight: "bold",
  },
  Contador: {
    fontSize: responsiveFontSize(2),
    color: "white",
    fontWeight: "bold",
  },
  TituloCalendar: {
    fontSize: 19,
    marginTop: 7.5,
    paddingLeft: 20,
    color: "#676464",
    fontWeight: "bold",
  },
  TitulocitaTipo: {
    fontSize: 19,
    marginTop: 11,
    color: "white",
    fontWeight: "bold",
  },
  TitTurnAct: {
    paddingTop: 7,
    fontSize: 19,
    alignSelf: "center",
    color: "#676464",
    fontWeight: "bold",
  },
  TituInstalacRevi: {
    paddingTop: 7,
    fontSize: responsiveFontSize(1.6),
    color: "#006BAD",
    fontWeight: "bold",
  },
  Titutec: {
    paddingRight: 15,
    fontSize: responsiveFontSize(2),
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  TitTurnActEstatus: {
    paddingTop: 7,
    fontSize: responsiveFontSize(1.5),
    alignSelf: "center",
    color: "#676464",
    fontWeight: "bold",
  },
  DesCitHoy: {
    paddingTop: 7,
    fontSize: responsiveFontSize(2),
    color: "#25AEFF",
    fontWeight: "bold",
  },
  fecha: {
    paddingTop: 7,
    fontSize: responsiveFontSize(1.6),
    color: "#006BAD",
    fontWeight: "bold",
  },
  titutecnico: {
    paddingTop: 5,
    paddingRight: 15,
    fontSize: responsiveFontSize(2.4),
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  Titulotec: {
    padding: 35,
    fontSize: responsiveFontSize(2),
    color: "white",
    fontWeight: "bold",
  },
  logoNuevoPro: {
    flex: 1,
    width: responsiveWidth(29),
  },
  progress: {
    margin: 0,
  },
  logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(50),
  },
  linearGradientControlCombus: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    margin: 6,
    width: responsiveWidth(39),
    height: responsiveHeight(12),
    borderRadius: 13,
    borderBottomWidth: 0.5,
    borderStartWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderWidth: 0.5,
    borderColor: colors.Secundario,
  },
  linearGradientNuevosProductos: {
    marginStart: 22,
    marginEnd: 22,
    margin: 14,
    paddingTop: 8,
    width: responsiveWidth(88),
    height: responsiveHeight(5),
    borderRadius: 13,
  },
  linearGradiencitashoy: {
    flex: 1,
    marginStart: 22,
    marginEnd: 22,
    marginTop: 10,
    width: responsiveWidth(88),
    height: responsiveHeight(15),
    borderRadius: 13,
  },
  linearGradienCitaHoyCard: {
    flex: 1,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 5,
    width: responsiveWidth(89),
    height: responsiveHeight(20),
    borderRadius: 13,
    borderWidth: 0.8,
    borderColor: colors.Secundario,
  },
  linearGradientTecnico: {
    flex: 1,
    marginStart: 22,
    marginEnd: 22,
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    borderRadius: 100,
  },
  Styletext: {
    flex: 1,
    marginStart: 22,
    marginEnd: 22,
    width: responsiveWidth(50),
    height: responsiveHeight(4),
    borderRadius: 100,
  },
  linearGradiProgress: {
    marginStart: 22,
    marginEnd: 22,
    marginTop: 10,
    width: responsiveWidth(75),
    height: responsiveHeight(4),
    borderRadius: 13,
  },
  linearGradiContador: {
    marginStart: 22,
    marginEnd: 22,
    width: responsiveWidth(12),
    height: responsiveHeight(5),
    borderRadius: 20,
  },
  linearGradientCuidadoAuto: {
    flex: 1,
    marginLeft: 5,
    marginBottom: 5,
    margin: 10,
    width: responsiveWidth(24),
    height: responsiveHeight(17),
    borderRadius: 10,
  },
  tinyLogoChek: {
    width: 30,
    height: 30,
  },
  tinyLogoControlCombus: {
    width: wp("20%"),
    height: hp("10%"),
  },
  tecimage: {
    marginTop: 15,
    width: wp("12%"),
    height: hp("16%"),
  },
  tinyLogoMantenimiento: {
    width: wp("20%"),
    height: hp("11%"),
  },
  tinyLogoSeguroAuto: {
    width: responsiveWidth(16.2),
    height: responsiveHeight(9),
  },
  tinyLogoFinanciamiento: {
    width: wp("20%"),
    height: hp("10%"),
  },
  styleEquipo: {
    marginTop: 9,
    marginLeft: 5,
    width: wp("17%"),
    height: hp("8%"),
    borderRadius: 35,
    borderColor: "#c5c5c5",
  },
  styleCita: {
    marginTop: 2,
    marginLeft: 15,
    marginRight: 15,
    width: wp("17%"),
    height: hp("14%"),
    borderColor: "#c5c5c5",
  },
  styleRevision: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: wp("24%"),
    height: hp("12%"),
    borderColor: "#c5c5c5",
  },
  styletecnico: {
    marginTop: 2,
    marginStart: 20,
    width: wp("11.5%"),
    height: hp("9.5%"),
    borderColor: "#c5c5c5",
  },
  stylePalomita: {
    width: wp("6%"),
    height: hp("3%"),
    borderColor: "#c5c5c5",
  },
  stylePalomitamedio: {
    marginLeft: 50,
    marginRight: 50,
    width: wp("6%"),
    height: hp("3%"),
    borderColor: "#c5c5c5",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  paginationContainer: {
    paddingVertical: 2,
  },
  BotonGuardar: {
    marginTop: 14,
    margin: 9,
    marginLeft: 30,
    color: "white",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.1),
  },
  linearGradientButonGuardar: {
    alignSelf: "center",
    width: responsiveWidth(50),
    height: responsiveHeight(7),
    borderRadius: 20,
  },
  tinyLogoCalendarSigueme: {
    borderRadius: 20,
    alignSelf: "center",
    marginLeft: 15,
    width: responsiveWidth(85),
    height: responsiveHeight(75),
    margin: 5,
  },
});

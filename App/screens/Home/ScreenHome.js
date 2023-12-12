import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { Icon,Tab,TabView} from "@rneui/themed";
import { Buffer } from 'buffer';
import { inflate } from 'pako';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../style/colors";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Auth,API, graphqlOperation,Storage } from 'aws-amplify';
import { QueryClient, QueryClientProvider,useQueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { useQuery } from "@tanstack/react-query";
import { LIST_TRACKABLES,LIST_TRACKABLE_WITH_DEVICE } from "../../src/queries";

import {
  onCreateFeature,
  onDeleteFeature,
  onUpdateFeature,
} from "../../src/subscription";

import awsConfig from '../../../aws-exports';
import { Amplify } from "aws-amplify";
Auth.configure(awsConfig);
import { CognitoIdToken } from 'amazon-cognito-identity-js'; 




Amplify.configure({ awsConfig, ssr: true });

export const getGraphqlHeader = async () => {
  try {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken();
    const cognitoIdToken = new CognitoIdToken({ IdToken: idToken.jwtToken });
    const jwtToken = cognitoIdToken.getJwtToken();

    return jwtToken ? { Authorization: jwtToken } : {};
  } catch (error) {
    return {};
  }
};

Amplify.configure({
  aws_appsync_graphqlEndpoint: 'https://level3-api.dev.easytrack.mx/graphql',
  aws_appsync_region: 'us-west-2',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  graphql_headers: async () => await getGraphqlHeader(),
});

export default function ScreenHome({ route, navigation, initialFeatures = [], setActiveFeature }) {
  
  
  const [trackableItems, setTrackableItems] = useState([]);
  const [itemNames, setItemNames] = useState([]);
  const list = useRef(null);
  const { username, password } = route.params;
  const [index, setIndex] = useState(0);
  const mapRef = useRef(null);
  const [activeChangeMapType, setActiveChangeMapType] = useState(false);
  const [messages, setMessages] = useState([]);

  const ON_UPDATE_TRACKER = `subscription onUpdateTracker{
    onUpdateTracker {
      accountId
      payload
    }
  }`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await API.graphql({
          authMode: "AMAZON_COGNITO_USER_POOLS",
          query: LIST_TRACKABLE_WITH_DEVICE,
        });
  
        if (result.data.listTrackableWithDevice && result.data.listTrackableWithDevice.items) {
          const trackableItems = result.data.listTrackableWithDevice.items;
          setTrackableItems(trackableItems);
  
          const names = trackableItems.map((item) => JSON.parse(item.data));
          setItemNames(names);
        } else {
          setTrackableItems([]); // Inicializar como un array vacío si no hay datos
          setItemNames([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    const subscription = API.graphql({
      authMode: 'AMAZON_COGNITO_USER_POOLS',
      query: ON_UPDATE_TRACKER,
    }).subscribe({
      next: async (data) => {
        try {
          const base64Data = data.value.data.onUpdateTracker.payload;
          const binaryData = Buffer.from(base64Data, 'base64');

          // Descomprimir usando pako (o cualquier otra biblioteca compatible)
          const decompressed = inflate(binaryData, { to: 'string' });

          console.log(JSON.parse(decompressed));
        } catch (error) {
          console.error('Error en la suscripción:', error);
        }
      },
      error: (error) => {
        console.error('Subscription error:', error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);



  const ItemView = ({ item }) => {
    //console.log(item);
    return (
      <View>
          <TouchableOpacity
            onPress={() => {
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 1.5 }}
                end={{ x: 3, y: 0.3 }}
                colors={["#F5F5F5", "#F5F5F5", "#F5F5F5"]}
                style={styles.linearGradienCitaHoyCard}
              >
                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      paddingTop: 20,
                      paddingLeft:10
                    }}
                  >
                      <Image
                      style={styles.tinyLogoCalendarSigueme2}
                      source={require("../../../assets/tesla.png")}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-around",
                      flexDirection: "column",
                      marginEnd: 10,
                      paddingLeft:15
                    }}
                  >
                  <Text style={styles.DesCitHoy}>{item.name}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
      </View>
    );
  };

  const memoizedValue = useMemo(() => ItemView, []);
  return (
      <View style={styles.container2}>

    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'orange',
        height: 2,
      }}
      variant="primary"
    
    >
      <Tab.Item
        title="Mapa"
        titleStyle={{ fontSize: 15 }}
        icon={{ name: 'map', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="Unidades"
        titleStyle={{ fontSize: 15 }}
        icon={{ name: 'car', type: 'ionicon', color: 'white' }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item>
        <View style={{ flex:1 }}>
        <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.mapView}
            showsUserLocation={true}
            showsCompass={true}
            mapType={activeChangeMapType === true ? "hybrid" : "standard"}
            initialRegion={{
              latitude: 21.752538,
              longitude: -93.141926,
              latitudeDelta: 25,
              longitudeDelta: 30,
            }}
          >
            {/* Renderizar marcadores en el mapa */}
            {trackableItems.map((item) => {
              const deviceData = JSON.parse(item.device.data);
              const latitude = deviceData.s_latitude;
              const longitude = deviceData.s_longitude;

              return (
                <Marker
                  key={item.id}
                  coordinate={{ latitude, longitude }}
                  title={item.name}
                  description={item.description}
                />
              );
            })}
            </MapView>
        </View>
      
      </TabView.Item>
      {/* SEGUNDO SLIDE / TAB */}
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
      <View style={styles.container2}>
    
      
    <View>
     {/*  <View
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
                Lista de Unidades
              </Text>
            </View>
            <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
            <View style={{ transform: [{ rotate: '25deg' }],paddingRight:50,margin:-80 }}>
            <LinearGradient
                start={{ x: 0.2, y: 0.08 }}
                end={{ x: 2, y: 0.5}}
                colors={["#6373cf", "#22b4bf", "#6373cf"]}
                    locations={[0.0, 0.35, 0.99]}
                style={styles.linearGradientConsultar}
              >
                <View style={{
                  justifyContent:"center",
                  alignContent:"center",
                  alignItems:"center",
                  alignItems:"center",
                  flexDirection:"row",
                  transform: [{ rotate: '-25deg' }]
                }}>
                  <View style={{
                 justifyContent:"center",
                 alignContent:"center",
                 alignItems:"center",
                 alignItems:"center",
                 flexDirection:"column",
                 paddingTop:60,
                 paddingLeft:30
                }}>
                </View>
                <View style={{
                 justifyContent:"flex-start",
                 alignContent:"flex-start",
                 alignItems:"flex-start",
                 flexDirection:"row",
                 paddingLeft:140,
                 paddingTop:110
                }}>
                   <Image
                      style={styles.tinyLogoCalendarSigueme}
                      source={require("../../../assets/tesla.png")}
                    />
                </View>
                  
                   
                  </View>
          </LinearGradient>
          
          </View>
          <View style={{
                  justifyContent:"center",
                  alignContent:"center",
                  alignItems:"center",
                  alignItems:"center",
                  flexDirection:"column",
                  paddingTop:120,
                  paddingRight:180
                }}>

             
           
          </View>
        </View>
          </View>
        </LinearGradient>
      </View> */}
      <View style={{
               paddingTop:15
              }}>
      <FlatList
        ref={list}
        data={itemNames}
        horizontal={false}
       keyExtractor={(item, index) => index.toString()}
          renderItem={memoizedValue}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />
            {messages.map((message, index) => (
          <Text key={index}>{message.content}</Text>
        ))}
      </View>
    </View>

    </View>
      </TabView.Item>
    </TabView>

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
  linearGradientConsultar: {
    alignSelf: "center",
    width: responsiveWidth(70),
    height: responsiveHeight(17),
    borderRadius: 50,
    borderWidth: 0.1,
  },
  container2: {
    flex: 1,
  },
  mapView: {
    flex:1,
    width: responsiveHeight(80),
    height: responsiveHeight(75.1),
  },
  DesCitHoy: {
    paddingTop: 15,
    fontSize: responsiveFontSize(2.3),
    color: "#25AEFF",
    fontWeight: "bold",
  },
  titutecnico: {
    paddingTop: 5,
    paddingLeft: 50,
    fontSize: responsiveFontSize(2.4),
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: responsiveWidth(100),
    height: responsiveHeight(50),
  },
  linearGradienCitaHoyCard: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 5,
    width: responsiveWidth(89),
    height: responsiveHeight(8),
    borderRadius: 13,
    borderWidth: 0,
    borderColor: colors.Secundario,
  },
  linearGradientTecnico: {
    flex: 1,
    marginStart: 5,
    marginEnd: 5,
    height: responsiveHeight(10),
    borderRadius: 20,
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
    width: 100,
    height: 50,
  },
  tinyLogoCalendarSigueme2: {
    width: 70,
    height: 35,
  },
});

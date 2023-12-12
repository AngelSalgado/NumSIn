import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Alert, Text,Image} from 'react-native';
import React, { useState ,useEffect} from 'react';
import { Auth } from 'aws-amplify';
import awsConfig from './aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackHome from './App/stack/StackHome';
import { Button, } from "@rneui/base";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


Auth.configure(awsConfig);

const Stack = createStackNavigator();
   

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
      try {
        await Auth.signIn(username, password);
        Alert.alert('Correcto', 'Inicio de sesión exitoso');
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        navigation.navigate('Home', { username: authenticatedUser.username });
  
      } catch (error) {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
        console.error('Error en el inicio de sesión:', error);
      }
  };
  

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();        
        navigation.navigate('Home', { username: authenticatedUser.username });
    
      } catch (notAuthenticatedError) {
        try {
          await Auth.signIn(username, password);
          Alert.alert('Correcto', 'Inicio de sesión exitoso');
          const authenticatedUser = await Auth.currentAuthenticatedUser();
          navigation.navigate('Home', { username: authenticatedUser.username });
    
        } catch (error) {
          Alert.alert('Error', 'Usuario o contraseña incorrectos');
          console.error('Error en el inicio de sesión:', error);
        }
      }
    };
    handleLogin();
  }, []); 




  return (
    <View style={styles.container}>
      <View style={{
        paddingTop:200
      }}>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <LinearGradient
           start={{ x: 0.3, y: 1.2}}
           end={{ x: 0.2, y: 0.05}}
          colors={["#3274ba", "#18325a", "#18325a"]}
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  paddingTop:60
                }}
              >
                  <View style={{ transform: [{ rotate: '-58deg' }],marginTop:-240,paddingLeft:40 }}>
                  <LinearGradient
                      start={{ x: 0.2, y: 0.08 }}
                      end={{ x: 2, y: 0.5}}
                      colors={["#3274ba", "#3274ba", "#3274ba"]}
                          locations={[0.0, 0.35, 0.99]}
                      style={styles.linearGradientConsultar}
                    >
                      <View style={{ transform: [{ rotate: '-70deg' }],paddingRight:40 }}>
                        
                  <LinearGradient
                      start={{ x: 0.2, y: 0.08 }}
                      end={{ x: 2, y: 0.5}}
                      colors={["#ffffff", "#ffffff", "#ffffff"]}
                          locations={[0.0, 0.35, 0.99]}
                      style={styles.linearGradientConsultar2}
                    >                      
                      <View style={{
                        justifyContent:"center",
                        alignContent:"center",
                        alignItems:"center",
                        alignItems:"center",
                        transform: [{ rotate: '129deg' }]
                      }}>
                          <View style={{
                          justifyContent:"center",
                          alignContent:"center",
                          alignItems:"center",
                          paddingLeft:250,
                          }}>
                            <Image
                                style={styles.tinyLogoCalendarSigueme}
                                source={require("../NumSIn/assets/numaris.png")}
                              />
                          </View>     
                          <View style={{
                          justifyContent:"center",
                          alignContent:"center",
                          alignItems:"center",
                          paddingTop:80,
                          }}>
                          </View>            
                </View>
                    </LinearGradient>
                    </View>
                      
                </LinearGradient>
                
                </View>
                <View style={{
                        justifyContent:"center",
                        alignContent:"center",
                        alignItems:"center",
                        alignItems:"center",
                        flexDirection:"column",
                        paddingTop:140,
                      }}>
                        <View style={{
                        justifyContent:"center",
                        alignContent:"center",
                        alignItems:"center",
                        alignItems:"center",
                        flexDirection:"row",
                      }}>

                      <TextInput
                                placeholder="Usuario"
                                placeholderTextColor={"#FFFFFF"}
                                onChangeText={(text) => setUsername(text)}
                                value={username}
                                style={{
                                  height: 40,
                                  width:190,
                                  margin: 12,
                                  textShadowColor:"#ffffff",
                                  borderRadius:25,
                                  borderBlockStartColor:"#ffffff",
                                  borderBlockEndColor:"#ffffff",
                                  borderEndColor:"#ffffff",
                                  borderLeftColor:"#ffffff",
                                  borderWidth: 0.5,
                                  padding: 10,
                                  }}
                              />
                            <Icon name="account" size={25} color="#ffffff" />

                      </View>
                      <View style={{
                        justifyContent:"center",
                        alignContent:"center",
                        alignItems:"center",
                        alignItems:"center",
                        flexDirection:"row",
                      }}>

              <TextInput
                placeholder="Contraseña"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                placeholderTextColor={"#FFFFFF"}
                style={{
                  height: 40,
                  width:190,
                  margin: 12,
                  borderRadius:25,
                  borderBlockColor:"#ffffff",
                  borderBlockEndColor:"#ffffff",
                  borderEndColor:"#ffffff",
                  borderLeftColor:"#ffffff",
                  borderWidth: 0.5,
                  padding: 10,
                  }}
              />
              <Icon name="lock" size={25} color="#ffffff" />
              </View>
              <View style={{
                        justifyContent:"center",
                        alignContent:"center",
                        alignItems:"center",
                        alignItems:"center",
                        flexDirection:"row",
                        paddingTop:10
                      }}>

                      <Button       
                              buttonStyle={styles.btnLogin}
                              title="Ingresar" 
                              onPress={handleLogin} 
                              
                              />
                      </View>
            
                  
                
                </View>
            </View>
          </View>
          <View style={{
                  justifyContent:"center",
                  alignContent:"center",
                  alignItems:"center",
                  alignItems:"center",
                  flexDirection:"column",
                  paddingTop:60,
                }}>

                  <Text style={styles.Numaris24}>Numaris R® 2024</Text>


                </View>

        </LinearGradient>
      </View>

        
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}  // Oculta el header para esta pantalla
          />
        <Stack.Screen name="Home" component={StackHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Numaris24: {
    paddingTop: 15,
    fontSize: responsiveFontSize(1.6),
    color: "#FFFFFF",
  },
  
  btnLogin:{
    backgroundColor: "#3274ba",
    borderRadius: 25,
    width:200,
  },
  linearGradientTecnico: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  linearGradientConsultar: {
    alignSelf: "center",
    width: responsiveWidth(150),
    height: responsiveHeight(53),
    borderRadius: 100,
    paddingRight:50
  },
  linearGradientConsultar2: {
    alignSelf: "center",
    width: responsiveWidth(100),
    height: responsiveHeight(50),
    borderRadius: 100,
  },
  tinyLogoCalendarSigueme: {
    width: responsiveWidth(62.4),
    height: responsiveHeight(6.7),
  },
});

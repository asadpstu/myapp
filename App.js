import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './src/onboarding/Onboarding';
import DashboardHome from './src/tab/DashboardHome';
import DashboardReport from './src/tab/DashboardReport';
import DashboardFind from './src/tab/DashboardFind';
import DashboardProfile from './src/drawer/DashboardProfile';
import DashboardContact from './src/drawer/DashboardContact';
import HomeScreen from './src/apphome/HomeScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const CustomDrawer = props => {
  return (<View style={{ flex: 1 }}>
    <DrawerContentScrollView
      contentContainerStyle={{ backgroundColor: '#8200d6' }}>
      <View style={{ margin: 15, alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 100, borderColor: "#FFF", borderRadius: 50, borderWidth: 2 }}
          source={require('./asset/image/profile/profile.jpeg')}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            marginBottom: 5,
            marginTop: 5
          }}>
          Mr. John Doe.
        </Text>
      </View>

      <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 2 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>

    <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ccc', }}>
      <TouchableOpacity onPress={() => { props.navigation.navigate('AppHome') }} style={{ paddingVertical: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 18, height: 18 }}
            source={require('./asset/image/tabbar/dashboard-64.png')}
          />
          <Text
            style={{
              fontSize: 15,
              marginLeft: 25,
              color: "#000"
            }}>
            Dashboard
          </Text>
        </View>
      </TouchableOpacity>
    </View>

    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 18, height: 18 }}
            source={require('./asset/image/tabbar/account-logout-64.png')}
          />
          <Text
            style={{
              fontSize: 15,
              marginLeft: 25,
              color: "#000"
            }}>
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>

  </View>
  );
};

function DrawerScreen({ navigation }) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerStyle: {
          width: 250,
        },
      }}
      initialRouteName='Home'
    >
      <Drawer.Screen name="Home" component={BottomTabBar}
        options={{
          drawerIcon: ({ color }) => (
            <Image
              style={{ width: 18, height: 18 }}
              source={require('./asset/image/tabbar/home.png')}
            />
          ),
        }}
      />
      <Drawer.Screen name="Profile" component={DashboardProfile}
        options={{
          drawerIcon: ({ color }) => (
            <Image
              style={{ width: 18, height: 18 }}
              source={require('./asset/image/tabbar/user-2-64.png')}
            />
          ),
        }}
      />
      <Drawer.Screen name="Contact" component={DashboardContact}
        options={{
          drawerIcon: ({ color }) => (
            <Image
              style={{ width: 18, height: 18 }}
              source={require('./asset/image/tabbar/contacts-2-64.png')}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function BottomTabBar({ navigation }) {
  const [tab, setTab] = useState('home')
  const changeBackground = (tab) => {
    setTab(tab)
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#8200d6",
        tabBarStyle: {
          height: 50,
        }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardHome}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <TouchableOpacity
                onPress={() => { changeBackground('home'); navigation.navigate('Dashboard') }}
              >
                <View style={tab === 'home' ? style.selected : style.notSelected}>
                  <Image
                    style={{ width: 18, height: 18 }}
                    source={require('./asset/image/tabbar/home.png')}
                  />
                </View>

              </TouchableOpacity>
            )
          },
        }}
      />
      <Tab.Screen
        name="TabReport"
        component={DashboardReport}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <TouchableOpacity
                onPress={() => { changeBackground('report'); navigation.navigate('TabReport') }}
              >
                <View style={tab === 'report' ? style.selected : style.notSelected}>
                  <Image
                    style={{ width: 25, height: 25, }}
                    source={require('./asset/image/tabbar/report.png')}
                  />
                </View>
              </TouchableOpacity>

            )
          },
        }}
      />
      <Tab.Screen
        name="TabFind"
        component={DashboardFind}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <TouchableOpacity
                onPress={() => { changeBackground('find'); navigation.navigate('TabFind') }}
              >
                <View style={tab === 'find' ? style.selected : style.notSelected}>
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require('./asset/image/tabbar/search-2-64.png')}
                  />
                </View>
              </TouchableOpacity>
            )
          },
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AppHome" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const style = StyleSheet.create({
  notSelected: {
    height: 50,
    width: 50,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    height: 60,
    width: 60,
    backgroundColor: "#FFFFFF",
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 4,
  }
})

export default App;

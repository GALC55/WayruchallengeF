import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  Alert,
  View,
  StyleSheet,
  Text,
  NativeModules,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const {LocationModule} = NativeModules;

const requestLocationPermission = async (
  setPermissionStatus: (status: string) => void,
) => {
  if (Platform.OS === 'android') {
    // Solicitar permiso en Android
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'We need access to your location to provide better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      switch (granted) {
        case PermissionsAndroid.RESULTS.GRANTED:
          Alert.alert(
            'Permission Granted',
            'You can now use location services.',
          );
          setPermissionStatus(PermissionsAndroid.RESULTS.GRANTED);
          break;
        case PermissionsAndroid.RESULTS.DENIED:
        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          Alert.alert('Permission Denied', 'You cannot use location services.');
          setPermissionStatus(PermissionsAndroid.RESULTS.DENIED);
          break;
        default:
          Alert.alert(
            'Unknown Permission Status',
            'The permission status is unknown.',
          );
          setPermissionStatus(PermissionsAndroid.RESULTS.UNKNOWN);
          break;
      }
    } catch (err) {
      console.warn(err);
    }
  } else if (Platform.OS === 'ios') {
    //Solicitar permisos en IOS
    try {
      const status = await LocationModule.requestLocationPermission();
      switch (status) {
        case 'granted':
          Alert.alert(
            'Permission Granted',
            'Thank you for allowing access to your location!',
          );
          setPermissionStatus(status);
          break;
        case 'denied':
          Alert.alert('Permission Denied', 'We cannot access your location.');
          setPermissionStatus(status);
          break;
        case 'requested':
          // Alert.alert('Permission Requested', 'Location request has been made.');
          break;
        default:
          Alert.alert('Unknown Status', `The permission status is: ${status}`);
          break;
      }
    } catch (error) {
      console.error('Cannot access to the location:', error);
      Alert.alert('Error', 'Cannot access to the location.');
    }
  } else {
    Alert.alert('Unsupported Platform', 'This platform is not supported.');
  }
};

const App = () => {
  const [permissionStatus, setPermissionStatus] = React.useState('');
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('./assets/wru.webp')}
          style={{width: '50%', height: '25%'}}
        />
        <Text style={styles.title}>Can we get access to your location?</Text>
        <Text style={styles.Btitle}>Status: {permissionStatus}</Text>
        <TouchableOpacity
          onPress={requestLocationPermission.bind(null, setPermissionStatus)}
          style={styles.button}>
          <Text style={styles.Btitle}>Request Location Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 5,
  },
  button: {
    backgroundColor: '#008000',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  Btitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;

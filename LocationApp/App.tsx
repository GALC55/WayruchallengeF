import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  Button,
  Alert,
  View,
  StyleSheet,
  Text,
  NativeModules,
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Granted', 'You can now use location services.');
      } else {
        Alert.alert('Permission Denied', 'You cannot use location services.');
      }
    } catch (err) {
      console.warn(err);
    }
  } else if (Platform.OS === 'ios') {
    //Solicitar permisos en IOS
    try {
      const status = await LocationModule.requestLocationPermission();
      setPermissionStatus(status);

      if (status === 'granted') {
        Alert.alert(
          'Permiso concedido',
          '¡Gracias por permitir el acceso a tu ubicación!',
        );
      } else if (status === 'denied') {
        Alert.alert('Permiso denegado', 'No podremos acceder a tu ubicación.');
      } else if (status === 'requested') {
        // Alert.alert('Permiso solicitado', 'Se solicito la ubicación.');
      } else {
        Alert.alert(
          'Estado desconocido',
          `El estado del permiso es: ${status}`,
        );
      }
    } catch (error) {
      console.error('Error al solicitar permisos de ubicación:', error);
      Alert.alert(
        'Error',
        'Ocurrió un error al solicitar permisos de ubicación.',
      );
    }
  } else {
    Alert.alert('Unsupported Platform', 'This platform is not supported.');
  }
};

const App = () => {
  const [permissionStatus, setPermissionStatus] = React.useState('');
  return (
    <View style={styles.container}>
      <Text>Status: {permissionStatus}</Text>
      <Button
        title="Request Location Permission"
        onPress={requestLocationPermission.bind(null, setPermissionStatus)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

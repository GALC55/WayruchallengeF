import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  Button,
  Alert,
  View,
  StyleSheet,
  NativeModules,
} from 'react-native';

const {LocationPermissionModule} = NativeModules;

const requestLocationPermission = async () => {
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
    // Llamar al módulo nativo en iOS
    try {
      const result = await LocationPermissionModule.requestLocationPermission();
      Alert.alert('iOS', result);
    } catch (error) {
      console.error(error);
      const errorMessage =
        (error as Error).message || 'Failed to request permission';
      Alert.alert('Error', errorMessage);
    }
  } else {
    Alert.alert('Unsupported Platform', 'This platform is not supported.');
  }
};

const App = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Request Location Permission"
        onPress={requestLocationPermission}
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

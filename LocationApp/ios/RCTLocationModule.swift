import Foundation
import CoreLocation

@objc(LocationModule)
class LocationPermissionModule: NSObject, CLLocationManagerDelegate {
  private var locationManager: CLLocationManager?

  
  @objc
  func requestLocationPermission(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    locationManager = CLLocationManager()
    locationManager?.delegate = self

    guard let locationManager = locationManager else {
      reject("NO_LOCATION_MANAGER", "Failed to initialize location manager", nil)
      return
    }

    let status = CLLocationManager.authorizationStatus()
    switch status {
    case .notDetermined:
        locationManager.requestWhenInUseAuthorization()
        resolve("requested")
    case .authorizedWhenInUse, .authorizedAlways:
        resolve("granted")
    case .restricted, .denied:
        resolve("denied")
    @unknown default:
        reject("ERROR", "Unknown authorization status", nil)
    }
  }
}

import Foundation
import CoreLocation

@objc(LocationPermissionModule)
class LocationPermissionModule: NSObject, CLLocationManagerDelegate {
    private var locationManager: CLLocationManager?

    @objc func requestLocationPermission(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        locationManager = CLLocationManager()
        locationManager?.delegate = self

        let status = CLLocationManager.authorizationStatus()
        switch status {
        case .notDetermined:
            locationManager?.requestWhenInUseAuthorization()
            resolve("Permission requested")
        case .authorizedWhenInUse, .authorizedAlways:
            resolve("Permission already granted")
        case .restricted, .denied:
            reject("ERROR", "Permission denied", nil)
        @unknown default:
            reject("ERROR", "Unknown authorization status", nil)
        }
    }
}

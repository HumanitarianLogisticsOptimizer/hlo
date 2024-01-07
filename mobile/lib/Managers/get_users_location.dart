import 'package:geolocator/geolocator.dart';

Future<Position?> getUserCurrentLocation() async {
  LocationPermission permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      return null; // Handle this case in the calling function
    }
  }
  if (permission == LocationPermission.deniedForever) {
    return null; // Handle this case in the calling function
  }
  return await Geolocator.getCurrentPosition();
}
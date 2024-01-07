import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hlo/Managers/network_manager.dart';
import 'package:hlo/Widgets/MainScreen/home_screen_button.dart';
import 'package:hlo/Managers/get_users_location.dart';

void main() => runApp(const MyApp());

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late GoogleMapController mapController;
  final LatLng _center = const LatLng(39.979544167948156, 32.71342393316577);

  bool _showAccMarkers = false;
  bool _showAdcMarkers = true;

  Set<Marker> _accMarkers = {};
  Set<Marker> _adcMarkers = {};
  Marker? _currentLocationMarker;

  @override
  void initState() {
    super.initState();
    _fetchData();
    _goToMyLocation();
  }

  void _goToMyLocation() async {
    print("Got to my location");
    Position? position = await getUserCurrentLocation();
    if (position != null) {
      LatLng currentPosition = LatLng(position.latitude, position.longitude);
      setState(() {
        _currentLocationMarker = Marker(
          markerId: const MarkerId('currentLocation'),
          position: currentPosition,
          infoWindow: const InfoWindow(),
        );
      });

      mapController.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(
            target: currentPosition,
            zoom: 15.0,
          ),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Location permission denied'),
        ),
      );
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
    _goToMyLocation();
  }

  void _fetchData() async {
    var networkManager = NetworkManager();
    var adcs = await networkManager.getAllAdcs();
    var accs = await networkManager.getAllAccs();

    var adcMarkers = await _createMarkersFromData(adcs, 'adc');
    var accMarkers = await _createMarkersFromData(accs, 'acc');

    setState(() {
      _accMarkers = accMarkers;
      _adcMarkers = adcMarkers;
    });
  }

  Future<BitmapDescriptor> _loadMarkerBitmap(String assetName) async {
    ByteData byteData = await rootBundle.load(assetName);
    Uint8List bytes = byteData.buffer.asUint8List();
    return BitmapDescriptor.fromBytes(bytes);
  }

  Future<Marker> _createMarker(
      int id, String name, String location, String type) async {
    var latLng =
        location.split(',').map((e) => double.parse(e.trim())).toList();
    BitmapDescriptor icon = type == 'acc'
        ? await _loadMarkerBitmap('assets/acc.png')
        : await _loadMarkerBitmap('assets/adc.png');

    return Marker(
      markerId: MarkerId(id.toString()),
      position: LatLng(latLng[0], latLng[1]),
      infoWindow: InfoWindow(title: name),
      icon: icon,
    );
  }

  Future<Set<Marker>> _createMarkersFromData(
      List<dynamic> items, String type) async {
    Set<Marker> markers = {};
    for (var item in items) {
      Marker marker =
          await _createMarker(item.id, item.name, item.location, type);
      markers.add(marker);
    }
    return markers;
  }

  @override
  Widget build(BuildContext context) {
    Set<Marker> combinedMarkers = {};

    if (_showAccMarkers) {
      combinedMarkers.addAll(_accMarkers);
    }
    if (_showAdcMarkers) {
      combinedMarkers.addAll(_adcMarkers);
    }
    if (_currentLocationMarker != null) {
      combinedMarkers.add(_currentLocationMarker!);
    }

    return MaterialApp(
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.green[700],
      ),
      home: Scaffold(
        body: Stack(
          children: [
            GoogleMap(
              onMapCreated: _onMapCreated,
              initialCameraPosition: CameraPosition(
                target: _center,
                zoom: 11.0,
              ),
              markers: combinedMarkers,
              myLocationButtonEnabled: false,
            ),
            Positioned(
              right: 16,
              bottom: 16,
              child: HomeScreenButton(
                name: 'myLocationButton',
                onPressed: _goToMyLocation,
                icon: Icons.pin_drop,
                backgroundColor: Colors.black,
              ),
            ),
            SafeArea(
              child: Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: Row(
                  children: [
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(right: 4.0, left: 8.0),
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              _showAccMarkers = true;
                              _showAdcMarkers = false;
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            primary:
                                _showAccMarkers ? Colors.green : Colors.black,
                            onPrimary: Colors.white,
                          ),
                          child: const Text("ACC"),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(right: 8.0, left: 4.0),
                        child: ElevatedButton(
                          onPressed: () {
                            setState(() {
                              _showAccMarkers = false;
                              _showAdcMarkers = true;
                            });
                          },
                          style: ElevatedButton.styleFrom(
                            primary:
                                _showAdcMarkers ? Colors.green : Colors.black,
                            onPrimary: Colors.white,
                          ),
                          child: const Text("ADC"),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

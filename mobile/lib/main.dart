import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hlo/Managers/colors.dart';
import 'package:hlo/Managers/favorites_manager.dart';
import 'package:hlo/Managers/network_manager.dart';
import 'package:hlo/Screens/profile_page.dart';
import 'package:hlo/Screens/tasks.dart';
import 'package:hlo/Widgets/MainScreen/home_screen_button.dart';
import 'package:hlo/Managers/get_users_location.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const MaterialApp(
    //home: TasksPage(),
    home: MyApp(),
  ));
}

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
  bool _showFavorites = false;

  Set<Marker> _accMarkers = {};
  Set<Marker> _adcMarkers = {};
  Marker? _currentLocationMarker;
  Map<String, String> markerTypes = {};

  @override
  void initState() {
    super.initState();
    FavoritesManager.init().then((_) {
      _fetchData();
      _goToMyLocation();
    });
  }

  void _displayProfile() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => ProfilePage(),
      ),
    );
  }

  void _goToMyLocation() async {
    print("Go to my location");
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
    _fetchData(); // Ensure markers are fetched after map is ready
  }

  void _fetchData() async {
    var networkManager = NetworkManager();
    var adcs = await networkManager.getAllAdcs();
    var accs = await networkManager.getAllAccs();

    var adcMarkers = await _createMarkersFromData(context, adcs, 'adc');
    var accMarkers = await _createMarkersFromData(context, accs, 'acc');

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

  Future<Marker> _createMarker(BuildContext context, int id, String name,
      String location, String type, Map<String, dynamic> item) async {
    var latLng =
        location.split(',').map((e) => double.parse(e.trim())).toList();
    BitmapDescriptor icon = await _loadMarkerBitmap(
        type == 'acc' ? 'assets/acc.png' : 'assets/adc.png');

    if (type == 'acc') {
      bool isUrgent = await NetworkManager().isUrgentAcc(id);
      if (isUrgent) {
        icon = await _loadMarkerBitmap('assets/urgentAcc.png');
      }
    }

    Marker marker = Marker(
      markerId: MarkerId(id.toString()),
      position: LatLng(latLng[0], latLng[1]),
      infoWindow: InfoWindow(title: name),
      icon: icon,
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => CenterDetailPage(item: item, type: type),
          ),
        );
      },
    );

    markerTypes[marker.markerId.value] =
        type; // Store the type associated with this marker
    return marker;
  }

  Future<Set<Marker>> _createMarkersFromData(
      BuildContext context, List<dynamic> items, String type) async {
    Set<Marker> markers = {};
    for (var item in items) {
      // Ensure 'item' includes all necessary data for DetailPage
      Map<String, dynamic> itemData = {
        'id': item.id,
        'name': item.name,
        'location': item.location,
        // Include other fields as necessary
      };
      Marker marker = await _createMarker(
          context, item.id, item.name, item.location, type, itemData);
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
    if (_showFavorites) {
      combinedMarkers.removeWhere((marker) => !FavoritesManager.isFavorite(
          markerTypes[marker.markerId.value] ??
              "default_type", // Provide a default type if null
          int.parse(marker.markerId.value)));
    }

    if (_currentLocationMarker != null) {
      combinedMarkers.add(_currentLocationMarker!);
    }

    return Scaffold(
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
            bottom:
                16, // This positions the whole column of buttons at the bottom right
            child: Column(
              mainAxisSize: MainAxisSize
                  .min, // Ensures the column only takes necessary space
              children: [
                FloatingActionButton(
                  onPressed: _displayProfile,
                  child: Icon(Icons.person),
                  backgroundColor: Colors.black,
                ),
                SizedBox(height: 16), // Space between buttons
                FloatingActionButton(
                  onPressed: () {
                    setState(() {
                      _showFavorites =
                          !_showFavorites; // Toggle showing favorites
                    });
                  },
                  child: Icon(_showFavorites ? Icons.star : Icons.star_border),
                  backgroundColor: Colors.black,
                ),
                SizedBox(height: 16), // Space between buttons
                FloatingActionButton(
                  onPressed: _goToMyLocation,
                  child: Icon(Icons.pin_drop),
                  backgroundColor: Colors.black,
                ),
              ],
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
                          primary: _showAccMarkers
                              ? colors.accentColor
                              : Colors.black,
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
                          primary: _showAdcMarkers
                              ? colors.accentColor
                              : Colors.black,
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
    );
  }
}

class CenterDetailPage extends StatefulWidget {
  final Map<String, dynamic> item;
  final String type;

  const CenterDetailPage({Key? key, required this.item, required this.type})
      : super(key: key);

  @override
  _CenterDetailPageState createState() => _CenterDetailPageState();
}

class _CenterDetailPageState extends State<CenterDetailPage> {
  List<InventoryItem> inventoryItems = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchInventory();
  }

  fetchInventory() async {
    try {
      NetworkManager networkManager = NetworkManager();
      if (widget.type == 'adc') {
        inventoryItems =
            await networkManager.getAdcInventory(widget.item['id']);
      } else {
        inventoryItems =
            await networkManager.getAccInventory(widget.item['id']);
      }
      setState(() {
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      print("Failed to load inventory: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.item['name']),
        backgroundColor: colors.accentColor,
        actions: [
          IconButton(
            icon: Icon(
              FavoritesManager.isFavorite(widget.type, widget.item['id'])
                  ? Icons.star
                  : Icons.star_border,
            ),
            onPressed: () {
              FavoritesManager.toggleFavorite(widget.type, widget.item['id'])
                  .then((_) {
                setState(() {});
              });
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text("Location: ${widget.item['location']}"),
            SizedBox(height: 8),
            Expanded(
              child: isLoading
                  ? Center(child: CircularProgressIndicator())
                  : buildInventoryTable(),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildInventoryTable() {
    return DataTable(
      columns: const [
        DataColumn(label: Text('Aid')),
        DataColumn(label: Text('Urgency')),
      ],
      rows: inventoryItems.map((item) {
        return DataRow(
          cells: [
            DataCell(
              FutureBuilder<String>(
                future: NetworkManager()
                    .getAidName(item.type), // Assuming `item.type` is the ID
                builder:
                    (BuildContext context, AsyncSnapshot<String> snapshot) {
                  if (snapshot.connectionState == ConnectionState.done) {
                    if (snapshot.hasError) {
                      return Text('Error');
                    } else if (snapshot.hasData) {
                      return Text(
                          snapshot.data ?? 'Unknown'); // Display the name
                    }
                  }
                  // Show a loading spinner while the data is fetching
                  return CircularProgressIndicator();
                },
              ),
            ),
            DataCell(Text(item.status)),
          ],
        );
      }).toList(),
    );
  }
}

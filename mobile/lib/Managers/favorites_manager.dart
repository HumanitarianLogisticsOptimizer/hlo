import 'package:shared_preferences/shared_preferences.dart';

class FavoritesManager {
  static SharedPreferences? _prefs;

  static Future init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  static Future toggleFavorite(String type, int id) async {
    final key = 'favorites_$type';
    final currentFavorites = _prefs?.getStringList(key) ?? [];
    if (currentFavorites.contains(id.toString())) {
      currentFavorites.remove(id.toString());
    } else {
      currentFavorites.add(id.toString());
    }
    await _prefs?.setStringList(key, currentFavorites);
  }

  static bool isFavorite(String type, int id) {
    final key = 'favorites_$type';
    final currentFavorites = _prefs?.getStringList(key) ?? [];
    return currentFavorites.contains(id.toString());
  }

  static List<int> getFavorites(String type) {
    final key = 'favorites_$type';
    return _prefs?.getStringList(key)?.map(int.parse).toList() ?? [];
  }
}

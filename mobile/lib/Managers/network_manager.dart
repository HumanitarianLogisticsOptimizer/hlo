import 'dart:convert';
import 'dart:ffi';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Adc {
  final int id;
  final String name;
  final String address;
  final String location;
  final int ema;

  Adc(this.id, this.name, this.address, this.location, this.ema);

  factory Adc.fromJson(Map<String, dynamic> json) {
    return Adc(
      json['id'] as int,
      json['name'] as String,
      json['address'] as String,
      json['location'] as String,
      json['ema'] as int,
    );
  }
}

class Acc {
  final int id;
  final String name;
  final String address;
  final String location;
  final int ema;

  Acc(this.id, this.name, this.address, this.location, this.ema);

  factory Acc.fromJson(Map<String, dynamic> json) {
    return Acc(
      json['id'] as int,
      json['name'] as String,
      json['address'] as String,
      json['location'] as String,
      json['ema'] as int,
    );
  }
}

class InventoryItem {
  final int id;
  final int quantity;
  final int standardStock;
  final String status;
  final int type;
  final int center;

  InventoryItem({
    required this.id,
    required this.quantity,
    required this.standardStock,
    required this.status,
    required this.type,
    required this.center,
  });

  factory InventoryItem.fromJson(Map<String, dynamic> json) {
    return InventoryItem(
      id: json['id'] as int,
      quantity: json['quantity'] as int,
      standardStock: json['standard_stock'] as int,
      status: json['status'] as String,
      type: json['type'] as int,
      center: json['center'] as int,
    );
  }
}

class AidType {
  final int id;
  final String name;

  AidType({required this.id, required this.name});

  factory AidType.fromJson(Map<String, dynamic> json) {
    return AidType(
      id: json['id'] as int,
      name: json['name'] as String,
    );
  }
}

class NetworkManager {
  final String baseUrl = 'http://24.133.52.46:8000/api/';

  Future<List<Adc>> getAllAdcs() async {
    try {
      final response = await http.get(Uri.parse('${baseUrl}adc'));
      if (response.statusCode == 200) {
        return (json.decode(response.body) as List)
            .map((i) => Adc.fromJson(i))
            .toList();
      } else {
        throw const HttpException('Failed to load ADCs');
      }
    } catch (e) {
      final response = await rootBundle.loadString('assets/adc.json');
      return (json.decode(response) as List)
          .map((i) => Adc.fromJson(i))
          .toList();
    }
  }

  Future<List<Acc>> getAllAccs() async {
    try {
      final response = await http.get(Uri.parse('${baseUrl}acc'));
      if (response.statusCode == 200) {
        return (json.decode(response.body) as List)
            .map((i) => Acc.fromJson(i))
            .toList();
      } else {
        throw const HttpException('Failed to load ACCs');
      }
    } catch (e) {
      final response = await rootBundle.loadString('assets/acc.json');
      return (json.decode(response) as List)
          .map((i) => Acc.fromJson(i))
          .toList();
    }
  }

  Future<List<InventoryItem>> getAdcInventory(int centerId) async {
    try {
      final response =
          await http.get(Uri.parse('${baseUrl}adcaids/?center=$centerId'));
      if (response.statusCode == 200) {
        return (json.decode(response.body) as List)
            .map((i) => InventoryItem.fromJson(i))
            .toList();
      } else {
        throw HttpException('Failed to load ADC inventory');
      }
    } catch (e) {
      throw HttpException('Failed to load ADC inventory: $e');
    }
  }

  Future<List<InventoryItem>> getAccInventory(int centerId) async {
    try {
      final response =
          await http.get(Uri.parse('${baseUrl}accaids/?center=$centerId'));
      if (response.statusCode == 200) {
        return (json.decode(response.body) as List)
            .map((i) => InventoryItem.fromJson(i))
            .toList();
      } else {
        throw HttpException('Failed to load ACC inventory');
      }
    } catch (e) {
      throw HttpException('Failed to load ACC inventory: $e');
    }
  }

  Future<bool> isUrgentAcc(int centerId) async {
    try {
      final response =
          await http.get(Uri.parse('${baseUrl}accaids/?center=$centerId'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        int highCount = 0;
        for (var item in data) {
          if (item['status'] == 'High') {
            highCount++;
            if (highCount > 4) {
              return true;
            }
          }
        }
        return false;
      } else {
        throw HttpException('Failed to load ACC inventory');
      }
    } catch (e) {
      throw HttpException('Failed to load ACC inventory: $e');
    }
  }

  Future<String> getAidName(int id) async {
    try {
      final response = await http.get(Uri.parse('${baseUrl}aid_type/$id'));
      if (response.statusCode == 200) {
        final aidType = AidType.fromJson(json.decode(response.body));
        return aidType.name;
      } else {
        throw HttpException('Failed to load aid name');
      }
    } catch (e) {
      throw HttpException('Failed to load aid name: $e');
    }
  }

  //Login function sends e-mail and password to the server api/login. Endpoint returns a token if the credentials are correct.
  //The token is then stored in the shared preferences.
  Future<bool> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('${baseUrl}login/'),
        body: {
          'email': email,
          'password': password,
        },
      );
      if (response.statusCode == 200) {
        //Set the token into a variable
        final token = json.decode(response.body)['token'];
        //Store the token in the shared preferences
        await SharedPreferences.getInstance().then((prefs) {
          prefs.setString('token', token);
        });
        return true;
      } else {
        throw HttpException('Failed to login');
      }
    } catch (e) {
      throw HttpException('Failed to login: $e');
    }
  }

  //Logout function deletes the token from the shared preferences and makes a post to the server api/logout endpoint with the token as a header: Authorization: Token <token>
  Future<bool> logout() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      final response = await http.post(
        Uri.parse('${baseUrl}logout/'),
        headers: {
          HttpHeaders.authorizationHeader: 'Token $token',
        },
      );
      if (response.statusCode == 200) {
        //Delete the token from the shared preferences
        await prefs.remove('token');
        return true;
      } else {
        throw HttpException('Failed to logout');
      }
    } catch (e) {
      throw HttpException('Failed to logout: $e');
    }
  }

  //Add a new function as isUserLoggedIn that checks if the token is stored in the shared preferences.
  Future<bool> isUserLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.containsKey('token');
  }

  //Add a new function as getProfileDetails that makes a get to http://24.133.52.46:8000/api/me/ endpoint with the token as a header: Authorization: Token
  //This endpoint returns user_type, email and center. The function should return a map with these values.
  Future<Map<String, dynamic>> getProfileDetails() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      final response = await http.get(
        Uri.parse('${baseUrl}me/'),
        headers: {
          HttpHeaders.authorizationHeader: 'Token $token',
        },
      );
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return {
          'user_type': data['user_type'],
          'email': data['email'],
          'center': data['center'],
        };
      } else {
        throw const HttpException('Failed to get profile details');
      }
    } catch (e) {
      throw HttpException('Failed to get profile details: $e');
    }
  }
}

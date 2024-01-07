import 'dart:convert';
import 'dart:io';
import 'package:flutter/services.dart' show rootBundle;
import 'package:http/http.dart' as http;

class Adc {
  final int id;
  final String name;
  final String address;
  final String location;

  Adc(this.id, this.name, this.address, this.location);

  factory Adc.fromJson(Map<String, dynamic> json) {
    return Adc(
      json['id'] as int,
      json['name'] as String,
      json['address'] as String,
      json['location'] as String,
    );
  }
}

class Acc {
  final int id;
  final String name;
  final String address;
  final String location;

  Acc(this.id, this.name, this.address, this.location);

  factory Acc.fromJson(Map<String, dynamic> json) {
    return Acc(
      json['id'] as int,
      json['name'] as String,
      json['address'] as String,
      json['location'] as String,
    );
  }
}

class NetworkManager {
  final String baseUrl = 'http://localhost:8000/api/';

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
}

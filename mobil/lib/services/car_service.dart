import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/car.dart';

class CarService {
  static const String baseUrl = 'http://10.0.2.2:3000';

  Map<String, String> get _headers => {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  Future<List<Car>> getCars() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/cars'),
        headers: _headers,
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => Car.fromJson(json)).toList();
      }

      final error = json.decode(response.body);
      throw Exception(error['message'] ?? 'Failed to load cars');
    } catch (e) {
      throw Exception('Failed to load cars: $e');
    }
  }

  Future<Car> getCarById(int id) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/cars/$id'),
        headers: _headers,
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return Car.fromJson(data);
      }

      final error = json.decode(response.body);
      throw Exception(error['message'] ?? 'Failed to load car details');
    } catch (e) {
      throw Exception('Failed to load car details: $e');
    }
  }
}
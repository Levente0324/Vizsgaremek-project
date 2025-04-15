import 'dart:convert';
import 'package:car_rental_mobile/models/protection.dart';
import 'package:http/http.dart' as http;
import '../models/booking.dart';
import '../models/extras.dart';
import '../utils/token_manager.dart';

class BookingService {
  static const String baseUrl = 'http://10.0.2.2:3000';

  Future<Map<String, dynamic>> createBooking({
    required int carId,
    required int userId,
    required DateTime startDate,
    required DateTime endDate,
    Protection? protection,
    List<Extra>? extras,
    required double totalPrice,
  }) async {
    final token = await TokenManager.getToken();
    if (token == null) throw Exception('Not authenticated');

    final bookingData = {
      'carId': carId,
      'userId': userId,
      'startDate': startDate.toIso8601String(),
      'endDate': endDate.toIso8601String(),
      'totalPrice': totalPrice,
      if (protection != null) 'protectionPlanId': protection.id,
      if (extras != null && extras.isNotEmpty) 
        'extraIds': extras.map((e) => e.id).toList(),
    };

    final response = await http.post(
      Uri.parse('$baseUrl/bookings'),
      headers: _getAuthHeaders(token),
      body: json.encode(bookingData),
    );

    if (response.statusCode == 201) {
      final responseData = json.decode(response.body) as Map<String, dynamic>;
      return {
        ...responseData,
        'protection': protection != null ? {
          'id': protection.id,
          'name': protection.name,
          'price': protection.price,
          'description': protection.description,
        } : null,
        'extras': extras?.map((e) => {
          'id': e.id,
          'name': e.name,
          'price': e.price,
          'description': e.description,
        }).toList(),
      };
    }
    
    final error = json.decode(response.body);
    throw Exception(error['message'] ?? 'Failed to create booking');
  }

  Future<List<Booking>> getUserBookings() async {
    final token = await TokenManager.getToken();
    final userId = await TokenManager.getUserId();

    if (userId == null) throw Exception('User ID not found');

    final response = await http.get(
      Uri.parse('$baseUrl/bookings'),
      headers: _getAuthHeaders(token),
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Booking.fromJson(json)).toList();
    }
    
    final error = json.decode(response.body);
    throw Exception(error['message'] ?? 'Failed to load bookings');
  }

  Future<List<Extra>> getExtras() async {
    final token = await TokenManager.getToken();
    if (token == null) throw Exception('Not authenticated');

    final response = await http.get(
      Uri.parse('$baseUrl/bookings/extras'),
      headers: _getAuthHeaders(token),
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Extra.fromJson(json)).toList();
    }
    
    if (response.statusCode == 401) throw Exception('Authentication failed');
    
    final error = json.decode(response.body);
    throw Exception(error['message'] ?? 'Failed to load extras');
  }

  Future<List<Protection>> getProtections() async {
    final token = await TokenManager.getToken();
    if (token == null) throw Exception('Not authenticated');

    final response = await http.get(
      Uri.parse('$baseUrl/bookings/protections'),
      headers: _getAuthHeaders(token),
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Protection.fromJson(json)).toList();
    }
    
    if (response.statusCode == 401) throw Exception('Authentication failed');

    final error = json.decode(response.body);
    throw Exception(error['message'] ?? 'Failed to load protections');
  }

  Future<void> cancelBooking(int bookingId) async {
    final token = await TokenManager.getToken();
    if (token == null) throw Exception('Not authenticated');

    final response = await http.delete(
      Uri.parse('$baseUrl/bookings/$bookingId'),
      headers: _getAuthHeaders(token),
    );

    if (response.statusCode != 200) {
      final error = json.decode(response.body);
      throw Exception(error['message'] ?? 'Failed to cancel booking');
    }
  }

  Map<String, String> _getAuthHeaders(String? token) => {
    'Authorization': 'Bearer $token',
    'Content-Type': 'application/json',
  };
}
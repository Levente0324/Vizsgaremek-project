import 'dart:convert';
import 'package:car_rental_mobile/utils/token_manager.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  static const String baseUrl = 'http://10.0.2.2:3000/auth';
  static const String _emailKey = 'saved_email';
  static const String _passwordKey = 'saved_password';
  static const String _tokenKey = 'auth_token';

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        await TokenManager.saveAuthData(
          data['token'],
          email,
          data['user']['id'],
        );

        await saveAuthData(
          email,
          password,
          data['token'],
        );

        return {
          'access_token': data['token'],
          'userId': data['user']['id'],
          'user': data['user']
        };
      }

      final error = json.decode(response.body);
      throw Exception(error['message'] ?? 'Login failed');
    } catch (e) {
      throw Exception('Login failed: ${e.toString()}');
    }
  }

  Future<void> saveAuthData(String email, String password, String token) async {
    final prefs = await SharedPreferences.getInstance();
    await Future.wait([
      prefs.setString(_emailKey, email),
      prefs.setString(_passwordKey, password),
      prefs.setString(_tokenKey, token),
    ]);
  }

  Future<Map<String, String?>> getSavedCredentials() async {
    final prefs = await SharedPreferences.getInstance();
    return {
      'email': prefs.getString(_emailKey),
      'password': prefs.getString(_passwordKey),
      'token': prefs.getString(_tokenKey),
    };
  }

  Future<void> clearCredentials() async {
    final prefs = await SharedPreferences.getInstance();
    await Future.wait([
      prefs.remove(_emailKey),
      prefs.remove(_passwordKey),
      prefs.remove(_tokenKey),
    ]);
  }

  Future<Map<String, dynamic>> register(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/register'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: json.encode({
          'email': email,
          'password': password,
          'plainPassword': true,
        }),
      );

      final data = json.decode(response.body);

      if (response.statusCode == 201) {
        return data;
      }
      throw Exception(data['message'] ?? 'Registration failed');
    } catch (e) {
      throw Exception('Registration failed: $e');
    }
  }

  Future<dynamic> authenticatedRequest(
    String url,
    String method,
    String token, {
    Map<String, dynamic>? body,
  }) async {
    try {
      final headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      final response = await _makeRequest(url, method, headers, body);
      final data = json.decode(response.body);

      if (response.statusCode == 200 || response.statusCode == 201) {
        return data;
      }
      if (response.statusCode == 401) {
        throw Exception('Unauthorized');
      }
      throw Exception(data['message'] ?? 'Request failed');
    } catch (e) {
      throw Exception('Request failed: $e');
    }
  }

  Future<http.Response> _makeRequest(
    String url,
    String method,
    Map<String, String> headers,
    Map<String, dynamic>? body,
  ) async {
    switch (method.toUpperCase()) {
      case 'GET':
        return http.get(Uri.parse(url), headers: headers);
      case 'POST':
        return http.post(
          Uri.parse(url),
          headers: headers,
          body: body != null ? json.encode(body) : null,
        );
      default:
        throw Exception('Unsupported HTTP method');
    }
  }
}
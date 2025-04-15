import 'package:shared_preferences/shared_preferences.dart';

class TokenManager {
  static const String _tokenKey = 'auth_token';
  static const String _emailKey = 'user_email';
  static const String _userIdKey = 'user_id';

  static Future<void> saveAuthData(String token, String email, int userId) async {
    final prefs = await SharedPreferences.getInstance();
    await Future.wait([
      prefs.setString(_tokenKey, token),
      prefs.setString(_emailKey, email),
      prefs.setInt(_userIdKey, userId),
    ]);
  }

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  static Future<String?> getUserEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_emailKey);
  }

  static Future<int?> getUserId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_userIdKey);
  }

  static Future<bool> isLoggedIn() async {
    final token = await getToken();
    return token != null;
  }

  static Future<void> clearAll() async {
    final prefs = await SharedPreferences.getInstance();
    await Future.wait([
      prefs.remove(_tokenKey),
      prefs.remove(_emailKey),
      prefs.remove(_userIdKey),
    ]);
  }
}
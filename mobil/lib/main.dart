import 'package:flutter/material.dart';
import 'screens/car_list_screen.dart';
import 'screens/login_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/welcome_screen.dart';
import 'utils/token_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) => MaterialApp(
    debugShowCheckedModeBanner: false,
    title: 'Car Rental',
    theme: ThemeData(
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFFAA4D2B),
      ),
      useMaterial3: true,
    ),
    home: const WelcomeScreen(),
  );
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  Future<void> _handleProfileNavigation() async {
    try {
      final isLoggedIn = await TokenManager.isLoggedIn();
      if (!mounted) return;
      
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => isLoggedIn 
            ? const ProfileScreen()
            : const LoginScreen(),
        ),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error checking login status'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Widget _buildLoginButton() => FutureBuilder<bool>(
    future: TokenManager.isLoggedIn(),
    builder: (context, snapshot) {
      if (snapshot.connectionState == ConnectionState.waiting) {
        return const SizedBox(
          width: 16,
          height: 16,
          child: CircularProgressIndicator(
            color: Colors.white,
            strokeWidth: 2,
          ),
        );
      }
      return Text(
        snapshot.data == true ? 'Profile' : 'Login',
        style: const TextStyle(
          color: Colors.white,
          fontSize: 16,
        ),
      );
    },
  );

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Car Rental'),
      backgroundColor: const Color(0xFFAA4D2B),
      actions: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: TextButton(
            onPressed: _handleProfileNavigation,
            child: _buildLoginButton(),
          ),
        ),
      ],
    ),
    body: const CarListScreen(),
  );
}
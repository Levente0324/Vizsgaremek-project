import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import 'login_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _authService = AuthService();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Register'),
      backgroundColor: const Color(0xFFAA4D2B),
    ),
    body: Padding(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildEmailField(),
            const SizedBox(height: 16),
            _buildPasswordField(),
            const SizedBox(height: 24),
            _buildRegisterButton(),
            _buildLoginLink(),
          ],
        ),
      ),
    ),
  );

  Widget _buildEmailField() => TextFormField(
    controller: _emailController,
    decoration: const InputDecoration(
      labelText: 'Email',
      border: OutlineInputBorder(),
      prefixIcon: Icon(Icons.email),
    ),
    keyboardType: TextInputType.emailAddress,
    validator: (value) {
      if (value == null || value.isEmpty) return 'Please enter your email';
      if (!value.contains('@')) return 'Please enter a valid email';
      return null;
    },
  );

  Widget _buildPasswordField() => TextFormField(
    controller: _passwordController,
    decoration: const InputDecoration(
      labelText: 'Password',
      border: OutlineInputBorder(),
      prefixIcon: Icon(Icons.lock),
    ),
    obscureText: true,
    validator: (value) {
      if (value == null || value.isEmpty) return 'Please enter your password';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return null;
    },
  );

  Widget _buildRegisterButton() => SizedBox(
    width: double.infinity,
    child: ElevatedButton(
      onPressed: _isLoading ? null : _handleRegister,
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFAA4D2B),
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: _isLoading
          ? const SizedBox(
              height: 20,
              width: 20,
              child: CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 2,
              ),
            )
          : const Text(
              'Register',
              style: TextStyle(fontSize: 16, color: Colors.white),
            ),
    ),
  );

  Widget _buildLoginLink() => TextButton(
    onPressed: () => Navigator.pop(context),
    child: const Text(
      'Already have an account? Login',
      style: TextStyle(color: Color(0xFFAA4D2B)),
    ),
  );

  Future<void> _handleRegister() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);

      try {
        final email = _emailController.text.trim();
        final password = _passwordController.text.trim();
        await _authService.register(email, password);

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Registration successful! Please login.'),
              backgroundColor: Colors.green,
            ),
          );
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const LoginScreen()),
          );
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(e.toString().replaceAll('Exception: ', '')),
              backgroundColor: Colors.red,
            ),
          );
        }
      } finally {
        if (mounted) setState(() => _isLoading = false);
      }
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
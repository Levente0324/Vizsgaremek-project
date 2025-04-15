import 'package:flutter/material.dart';
import 'package:car_rental_mobile/models/extras.dart';
import 'package:car_rental_mobile/models/protection.dart';
import 'package:car_rental_mobile/screens/booking_confirmation.dart';
import '../../models/car.dart';
import '../../services/booking_service.dart';
import '../../utils/token_manager.dart';

class PaymentScreen extends StatefulWidget {
  final Car car;
  final DateTime startDate;
  final DateTime endDate;
  final Protection? protection;
  final List<Extra> extras;
  final double totalAmount;

  const PaymentScreen({
    super.key,
    required this.car,
    required this.startDate,
    required this.endDate,
    this.protection,
    required this.extras,
    required this.totalAmount,
  });

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final _formKey = GlobalKey<FormState>();
  final _cardNumberController = TextEditingController();
  final _cardHolderController = TextEditingController();
  final _expiryDateController = TextEditingController();
  final _cvvController = TextEditingController();
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Payment Details'),
      backgroundColor: const Color(0xFFAA4D2B),
    ),
    body: SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Total Amount: ${widget.totalAmount.toStringAsFixed(0)} HUF',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 24),
            _buildCardNumberField(),
            const SizedBox(height: 16),
            _buildCardHolderField(),
            const SizedBox(height: 16),
            _buildCardDetailsRow(),
            const SizedBox(height: 32),
            _buildPaymentButton(),
          ],
        ),
      ),
    ),
  );

  Widget _buildCardNumberField() => TextFormField(
    controller: _cardNumberController,
    decoration: const InputDecoration(
      labelText: 'Card Number',
      hintText: '1234 5678 9012 3456',
      border: OutlineInputBorder(),
    ),
    keyboardType: TextInputType.number,
    validator: (value) {
      if (value == null || value.isEmpty) return 'Please enter card number';
      if (value.replaceAll(' ', '').length != 16) return 'Card number must be 16 digits';
      return null;
    },
  );

  Widget _buildCardHolderField() => TextFormField(
    controller: _cardHolderController,
    decoration: const InputDecoration(
      labelText: 'Card Holder Name',
      hintText: 'John Doe',
      border: OutlineInputBorder(),
    ),
    validator: (value) => 
      value == null || value.isEmpty ? 'Please enter card holder name' : null,
  );

  Widget _buildCardDetailsRow() => Row(
    children: [
      Expanded(
        child: TextFormField(
          controller: _expiryDateController,
          decoration: const InputDecoration(
            labelText: 'Expiry Date',
            hintText: 'MM/YY',
            border: OutlineInputBorder(),
          ),
          validator: (value) {
            if (value == null || value.isEmpty) return 'Please enter expiry date';
            if (!RegExp(r'^\d{2}/\d{2}$').hasMatch(value)) return 'Use MM/YY format';
            return null;
          },
        ),
      ),
      const SizedBox(width: 16),
      Expanded(
        child: TextFormField(
          controller: _cvvController,
          decoration: const InputDecoration(
            labelText: 'CVV',
            hintText: '123',
            border: OutlineInputBorder(),
          ),
          obscureText: true,
          keyboardType: TextInputType.number,
          validator: (value) {
            if (value == null || value.isEmpty) return 'Please enter CVV';
            if (value.length != 3) return 'CVV must be 3 digits';
            return null;
          },
        ),
      ),
    ],
  );

  Widget _buildPaymentButton() => SizedBox(
    width: double.infinity,
    child: ElevatedButton(
      onPressed: _isLoading ? null : _handlePayment,
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFAA4D2B),
        padding: const EdgeInsets.symmetric(vertical: 16),
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
              'Confirm Booking',
              style: TextStyle(fontSize: 16, color: Colors.white),
            ),
    ),
  );

  Future<void> _handlePayment() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);
      try {
        final userId = await TokenManager.getUserId();
        if (userId == null) throw Exception('User ID not found');

        final result = await BookingService().createBooking(
          carId: widget.car.id,
          userId: userId,
          startDate: widget.startDate,
          endDate: widget.endDate,
          protection: widget.protection,
          extras: widget.extras.isNotEmpty ? widget.extras : null,
          totalPrice: widget.totalAmount,
        );

        if (!mounted) return;

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => BookingConfirmationScreen(
              bookingDetails: result,
              car: widget.car,
            ),
          ),
        );
      } catch (e) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Booking failed: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      } finally {
        if (mounted) setState(() => _isLoading = false);
      }
    }
  }

  @override
  void dispose() {
    _cardNumberController.dispose();
    _cardHolderController.dispose();
    _expiryDateController.dispose();
    _cvvController.dispose();
    super.dispose();
  }
}
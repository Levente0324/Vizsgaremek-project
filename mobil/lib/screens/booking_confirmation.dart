import 'package:car_rental_mobile/screens/profile_screen.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../models/car.dart';

class BookingConfirmationScreen extends StatelessWidget {
  final Map<String, dynamic> bookingDetails;
  final Car car;

  const BookingConfirmationScreen({
    super.key,
    required this.bookingDetails,
    required this.car,
  });

  @override
  Widget build(BuildContext context) {
    final startDate = DateTime.parse(bookingDetails['startDate']);
    final endDate = DateTime.parse(bookingDetails['endDate']);
    final formattedStartDate = DateFormat('yyyy-MM-dd').format(startDate);
    final formattedEndDate = DateFormat('yyyy-MM-dd').format(endDate);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Booking Confirmed'),
        backgroundColor: const Color(0xFFAA4D2B),
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Icon(
              Icons.check_circle,
              color: Color(0xFFAA4D2B),
              size: 80,
            ),
            const SizedBox(height: 24),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildInfoRow('Vehicle', '${car.manufacturer} ${car.model}'),
                    _buildInfoRow('Rental Period', '$formattedStartDate - $formattedEndDate'),
                    _buildInfoRow(
                      'Protection Package',
                      bookingDetails['protection'] != null
                          ? '${bookingDetails['protection']['name']} - ${bookingDetails['protection']['price'].toStringAsFixed(0)} HUF/day'
                          : 'No Protection',
                    ),
                    _buildInfoRow('Extra Services', _formatExtras(bookingDetails['extras'])),
                    const Divider(height: 32),
                    _buildInfoRow(
                      'Total Amount',
                      '${bookingDetails['totalPrice'].toStringAsFixed(0)} HUF',
                      isTotal: true,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const ProfileScreen()),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFAA4D2B),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text(
                  'View My Bookings',
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  side: const BorderSide(color: Color(0xFFAA4D2B)),
                ),
                child: const Text(
                  'Return to Home',
                  style: TextStyle(fontSize: 16, color: Color(0xFFAA4D2B)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value, {bool isTotal = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: isTotal ? 18 : 16,
              fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              fontSize: isTotal ? 18 : 16,
              fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
              color: isTotal ? const Color(0xFFAA4D2B) : null,
            ),
          ),
        ],
      ),
    );
  }

  String _formatExtras(List? extras) {
    if (extras == null || extras.isEmpty) return 'No extras selected';
    return extras
        .map((e) => '${e['name']} - ${e['price'].toStringAsFixed(0)} HUF/day')
        .join(', ');
  }
}
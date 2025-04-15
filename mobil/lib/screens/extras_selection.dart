import 'package:car_rental_mobile/screens/payment_screen.dart';
import 'package:flutter/material.dart';
import '../../models/car.dart';
import '../../models/extras.dart';
import '../../models/protection.dart';

class ExtrasSelectionScreen extends StatefulWidget {
  final Car car;
  final DateTime startDate;
  final DateTime endDate;
  final Protection? protection;

  const ExtrasSelectionScreen({
    super.key,
    required this.car,
    required this.startDate,
    required this.endDate,
    this.protection,
  });

  @override
  State<ExtrasSelectionScreen> createState() => _ExtrasSelectionScreenState();
}

class _ExtrasSelectionScreenState extends State<ExtrasSelectionScreen> {
  Extra? selectedExtra;

  @override
  Widget build(BuildContext context) {
    final days = widget.endDate.difference(widget.startDate).inDays + 1;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Extras'),
        backgroundColor: const Color(0xFFAA4D2B),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Text(
                  'Additional Services',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 16),
                ...Extra.available.map(_buildExtraCard),
              ],
            ),
          ),
          _buildTotalSection(days),
        ],
      ),
    );
  }

  Widget _buildExtraCard(Extra extra) => Card(
    margin: const EdgeInsets.only(bottom: 16),
    elevation: 2,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
      side: BorderSide(
        color: selectedExtra?.id == extra.id
            ? const Color(0xFFAA4D2B)
            : Colors.transparent,
        width: 2,
      ),
    ),
    child: RadioListTile<Extra>(
      title: Text(
        extra.name ?? 'Unnamed Extra',
        style: TextStyle(
          fontSize: 16,
          fontWeight: selectedExtra?.id == extra.id
              ? FontWeight.bold
              : FontWeight.normal,
        ),
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(extra.description ?? 'No description available'),
          const SizedBox(height: 4),
          Text(
            extra.price == null || extra.price == 0
                ? 'Free'
                : '${extra.price!.toStringAsFixed(0)} HUF/day',
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              color: selectedExtra?.id == extra.id
                  ? const Color(0xFFAA4D2B)
                  : Colors.grey[700],
            ),
          ),
        ],
      ),
      value: extra,
      groupValue: selectedExtra,
      activeColor: const Color(0xFFAA4D2B),
      fillColor: WidgetStateProperty.resolveWith((states) => 
        states.contains(WidgetState.selected)
            ? const Color(0xFFAA4D2B)
            : Colors.grey
      ),
      onChanged: (value) => setState(() => selectedExtra = value),
    ),
  );

  Widget _buildTotalSection(int days) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Colors.white,
      boxShadow: [
        BoxShadow(
          color: Colors.black.withValues(
            red: 0,
            green: 0,
            blue: 0,
            alpha: 25, // 0.1 * 255 ≈ 25
          ),
          blurRadius: 4,
          offset: const Offset(0, -2),
        ),
      ],
    ),
    child: Column(
      children: [
        Text(
          'Total for $days days: ${_calculateTotal(days)} HUF',
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => PaymentScreen(
                  car: widget.car,
                  startDate: widget.startDate,
                  endDate: widget.endDate,
                  protection: widget.protection,
                  extras: selectedExtra != null ? [selectedExtra!] : [],
                  totalAmount: _calculateTotal(days),
                ),
              ),
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFAA4D2B),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: const Text(
              'Continue to Payment',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    ),
  );

  double _calculateTotal(int days) {
    double total = widget.car.priceForOneDay * days;
    if (widget.protection?.price != null) {
      total += widget.protection!.price * days;
    }
    if (selectedExtra?.price != null) {
      total += selectedExtra!.price! * days;
    }
    return total;
  }
}
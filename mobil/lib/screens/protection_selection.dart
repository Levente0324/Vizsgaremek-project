import 'package:car_rental_mobile/screens/extras_selection.dart';
import 'package:flutter/material.dart';
import '../../models/car.dart';
import '../../models/protection.dart';

class ProtectionSelectionScreen extends StatefulWidget {
  final Car car;
  final DateTime startDate;
  final DateTime endDate;

  ProtectionSelectionScreen({
    super.key,
    required this.car,
    required this.startDate,
    required this.endDate,
  }) : assert(
         startDate.isBefore(endDate) || startDate.isAtSameMomentAs(endDate),
         'Start date must be before or equal to end date'
       );

  @override
  State<ProtectionSelectionScreen> createState() => _ProtectionSelectionScreenState();
}

class _ProtectionSelectionScreenState extends State<ProtectionSelectionScreen> {
  Protection? selectedProtection;

  @override
  Widget build(BuildContext context) {
    final days = widget.endDate.difference(widget.startDate).inDays + 1;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Protection'),
        backgroundColor: const Color(0xFFAA4D2B),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Text(
                  'Protection Package',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 16),
                ...Protection.available.map(_buildProtectionCard),
              ],
            ),
          ),
          _buildTotalSection(days),
        ],
      ),
    );
  }

  Widget _buildProtectionCard(Protection protection) => Card(
    margin: const EdgeInsets.only(bottom: 16),
    elevation: 2,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
      side: BorderSide(
        color: selectedProtection?.id == protection.id
            ? const Color(0xFFAA4D2B)
            : Colors.transparent,
        width: 2,
      ),
    ),
    child: RadioListTile<Protection>(
      title: Text(
        protection.name,
        style: TextStyle(
          fontSize: 16,
          fontWeight: selectedProtection?.id == protection.id
              ? FontWeight.bold
              : FontWeight.normal,
        ),
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(protection.description),
          const SizedBox(height: 4),
          Text(
            protection.price == 0
                ? 'Free'
                : '${protection.price.toStringAsFixed(0)} HUF/day',
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              color: selectedProtection?.id == protection.id
                  ? const Color(0xFFAA4D2B)
                  : Colors.grey[700],
            ),
          ),
        ],
      ),
      value: protection,
      groupValue: selectedProtection,
      activeColor: const Color(0xFFAA4D2B),
      fillColor: WidgetStateProperty.resolveWith((states) => 
        states.contains(WidgetState.selected)
            ? const Color(0xFFAA4D2B)
            : Colors.grey
      ),
      onChanged: (value) => setState(() => selectedProtection = value),
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
            onPressed: selectedProtection == null 
              ? null
              : () => Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ExtrasSelectionScreen(
                      car: widget.car,
                      startDate: widget.startDate,
                      endDate: widget.endDate,
                      protection: selectedProtection,
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
              'Continue to Extras',
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
    if (selectedProtection != null) {
      total += selectedProtection!.price * days;
    }
    return total;
  }
}
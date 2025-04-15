import 'package:car_rental_mobile/screens/protection_selection.dart';
import 'package:flutter/material.dart';
import '../../models/car.dart';

class DateSelectionScreen extends StatefulWidget {
  final Car car;

  const DateSelectionScreen({super.key, required this.car});

  @override
  State<DateSelectionScreen> createState() => _DateSelectionScreenState();
}

class _DateSelectionScreenState extends State<DateSelectionScreen> {
  DateTime? startDate;
  DateTime? endDate;

  Future<void> _selectDate(BuildContext context, bool isStartDate) async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
      builder: (context, child) => Theme(
        data: Theme.of(context).copyWith(
          colorScheme: const ColorScheme.light(primary: Color(0xFFAA4D2B)),
        ),
        child: child!,
      ),
    );

    if (picked != null) {
      setState(() {
        if (isStartDate) {
          startDate = picked;
          if (endDate != null && endDate!.isBefore(picked)) {
            endDate = null;
          }
        } else {
          endDate = picked;
        }
      });
    }
  }

  String _formatDate(DateTime? date) => 
    date != null ? '${date.year}-${date.month}-${date.day}' : 'Select date';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Dates'),
        backgroundColor: const Color(0xFFAA4D2B),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${widget.car.manufacturer} ${widget.car.model}',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 24),
            ListTile(
              title: const Text('Start Date'),
              subtitle: Text(_formatDate(startDate)),
              trailing: const Icon(Icons.calendar_today),
              onTap: () => _selectDate(context, true),
            ),
            ListTile(
              title: const Text('End Date'),
              subtitle: Text(_formatDate(endDate)),
              trailing: const Icon(Icons.calendar_today),
              onTap: () => startDate != null 
                ? _selectDate(context, false)
                : ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Please select start date first')),
                  ),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: startDate != null && endDate != null
                  ? () => Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ProtectionSelectionScreen(
                          car: widget.car,
                          startDate: startDate!,
                          endDate: endDate!,
                        ),
                      ),
                    )
                  : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFAA4D2B),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text(
                  'Continue to Protection Selection',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
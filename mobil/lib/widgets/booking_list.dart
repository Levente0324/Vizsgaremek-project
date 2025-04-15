import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/booking.dart';
import '../services/booking_service.dart';

class BookingList extends StatefulWidget {
  const BookingList({super.key});

  @override
  State<BookingList> createState() => _BookingListState();
}

class _BookingListState extends State<BookingList> {
  final _bookingService = BookingService();
  bool _isLoading = false;
  List<Booking>? _bookings;
  int? _cancelingBookingId;

  @override
  void initState() {
    super.initState();
    _loadBookings();
  }

  Future<void> _loadBookings() async {
    try {
      setState(() => _isLoading = true);
      final bookings = await _bookingService.getUserBookings();
      if (mounted) {
        setState(() {
          _bookings = bookings;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isLoading = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to load bookings: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _cancelBooking(int bookingId) async {
    try {
      setState(() => _cancelingBookingId = bookingId);
      await _bookingService.cancelBooking(bookingId);
      await _loadBookings();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to cancel booking: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      if (mounted) setState(() => _cancelingBookingId = null);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_bookings == null || _bookings!.isEmpty) {
      return const Center(child: Text('No active bookings'));
    }

    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: _bookings!.length,
      itemBuilder: (context, index) => _buildBookingCard(_bookings![index]),
    );
  }

  Widget _buildBookingCard(Booking booking) {
    final isBeingCanceled = _cancelingBookingId == booking.id;

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: ExpansionTile(
        title: Text(
          '${booking.car.manufacturer} ${booking.car.model}',
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Text(
          '${DateFormat('yyyy-MM-dd').format(booking.startDate)} - '
          '${DateFormat('yyyy-MM-dd').format(booking.endDate)}',
        ),
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (booking.protection != null)
                  _buildInfoRow(
                    'Protection',
                    booking.protection?.name ?? 'None',
                  ),
                if (booking.extras != null && booking.extras!.isNotEmpty)
                  _buildInfoRow(
                    'Extras',
                    booking.extras!.map((e) => e.name ?? '').join(', '),
                  ),
                _buildInfoRow(
                  'Total Price',
                  '${booking.totalPrice.toStringAsFixed(0)} HUF',
                  isTotal: true,
                ),
                const SizedBox(height: 16),
                _buildCancelButton(isBeingCanceled, booking.id),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCancelButton(bool isBeingCanceled, int bookingId) => SizedBox(
    width: double.infinity,
    child: ElevatedButton(
      onPressed: isBeingCanceled ? null : () => _showCancelDialog(context, bookingId),
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.red,
        foregroundColor: Colors.white,
      ),
      child: isBeingCanceled
          ? const SizedBox(
              height: 20,
              width: 20,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                color: Colors.white,
              ),
            )
          : const Text('Cancel Booking'),
    ),
  );

  Widget _buildInfoRow(String label, String value, {bool isTotal = false}) => 
    Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label),
          Text(
            value,
            style: TextStyle(
              fontWeight: isTotal ? FontWeight.bold : null,
              color: isTotal ? const Color(0xFFAA4D2B) : null,
            ),
          ),
        ],
      ),
    );

  Future<void> _showCancelDialog(BuildContext context, int bookingId) async {
    return showDialog(
      context: context,
      barrierDismissible: true,
      builder: (context) => AlertDialog(
        title: const Text('Cancel Booking'),
        content: const Text('Are you sure you want to cancel this booking?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('No'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _cancelBooking(bookingId);
            },
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Yes, Cancel'),
          ),
        ],
      ),
    );
  }
}
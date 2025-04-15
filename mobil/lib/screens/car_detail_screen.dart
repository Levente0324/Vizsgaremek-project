import 'package:car_rental_mobile/screens/date_selection.dart';
import 'package:flutter/material.dart';
import '../models/car.dart';

class CarDetailScreen extends StatelessWidget {
  final Car car;

  const CarDetailScreen({super.key, required this.car});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${car.manufacturer} ${car.model}'),
        backgroundColor: const Color(0xFFAA4D2B),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Hero(
              tag: 'car-${car.id}',
              child: car.imageUrl.isNotEmpty
                  ? SizedBox(
                      height: 250,
                      width: double.infinity,
                      child: Image.asset(
                        car.imageUrl,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => _buildPlaceholder(),
                      ),
                    )
                  : _buildPlaceholder(),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${car.manufacturer} ${car.model}',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _buildInfoRow('Type', car.type),
                  _buildInfoRow('Seats', car.numberOfSeats.toString()),
                  _buildInfoRow('Suitcases', car.numberOfSuitcases.toString()),
                  _buildInfoRow('Fuel Type', car.fuelType),
                  _buildInfoRow('Transmission', car.clutchType),
                  const SizedBox(height: 24),
                  _buildPriceRow(car.priceForOneDay),
                  const SizedBox(height: 24),
                  _buildBookButton(context, car.isAvailable),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlaceholder() => Container(
        height: 200,
        width: double.infinity,
        color: Colors.grey[200],
        child: const Center(
          child: Icon(
            Icons.directions_car,
            size: 100,
            color: Colors.grey,
          ),
        ),
      );

  Widget _buildInfoRow(String label, String value) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: const TextStyle(fontSize: 16),
            ),
            Text(
              value,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      );

  Widget _buildPriceRow(double price) => Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text(
            'Price per day:',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            '${price.toStringAsFixed(0)} HUF',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Color(0xFFAA4D2B),
            ),
          ),
        ],
      );

  Widget _buildBookButton(BuildContext context, bool isAvailable) => SizedBox(
        width: double.infinity,
        child: ElevatedButton(
          onPressed: isAvailable
              ? () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => DateSelectionScreen(car: car),
                    ),
                  )
              : null,
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFAA4D2B),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(vertical: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          child: Text(
            isAvailable ? 'Book Now' : 'Not Available',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      );
}
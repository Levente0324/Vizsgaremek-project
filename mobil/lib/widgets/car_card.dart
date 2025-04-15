import 'package:flutter/material.dart';
import '../models/car.dart';
import 'car_image.dart';
import '../screens/car_detail_screen.dart';

class CarCard extends StatelessWidget {
  final Car car;

  const CarCard({super.key, required this.car});

  @override
  Widget build(BuildContext context) => Card(
    clipBehavior: Clip.antiAlias,
    elevation: 2,
    child: InkWell(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => CarDetailScreen(car: car),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCarImage(),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildCarTitle(context),
                const SizedBox(height: 4),
                _buildCarType(context),
                const SizedBox(height: 8),
                _buildAvailabilityIndicator(context),
              ],
            ),
          ),
        ],
      ),
    ),
  );

  Widget _buildCarImage() => Hero(
    tag: 'car-${car.id}',
    child: CarImage(
      imagePath: car.imageUrl,
      altText: '${car.manufacturer} ${car.model}',
    ),
  );

  Widget _buildCarTitle(BuildContext context) => Text(
    '${car.manufacturer} ${car.model}',
    style: Theme.of(context).textTheme.titleMedium?.copyWith(
      fontWeight: FontWeight.bold,
    ),
  );

  Widget _buildCarType(BuildContext context) => Text(
    car.type,
    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
      color: Colors.grey[600],
    ),
  );

  Widget _buildAvailabilityIndicator(BuildContext context) => Row(
    children: [
      Icon(
        Icons.circle,
        size: 12,
        color: car.isAvailable ? Colors.green : Colors.red,
      ),
      const SizedBox(width: 8),
      Text(
        car.isAvailable ? 'Available' : 'Not Available',
        style: Theme.of(context).textTheme.bodySmall,
      ),
    ],
  );
}

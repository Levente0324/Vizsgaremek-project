import 'package:flutter/material.dart';
import '../models/car.dart';
import '../services/car_service.dart';
import '../widgets/car_card.dart';

class CarListScreen extends StatefulWidget {
  const CarListScreen({super.key});

  @override
  State<CarListScreen> createState() => _CarListScreenState();
}

class _CarListScreenState extends State<CarListScreen> {
  final CarService _carService = CarService();
  late Future<List<Car>> _carsFuture;

  @override
  void initState() {
    super.initState();
    _carsFuture = _carService.getCars();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Available Cars'),
        backgroundColor: const Color(0xFFAA4D2B),
      ),
      body: FutureBuilder<List<Car>>(
        future: _carsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Error loading cars'),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => setState(() => _carsFuture = _carService.getCars()),
                    child: const Text('Retry'),
                  ),
                ],
              ),
            );
          }

          final cars = snapshot.data ?? [];
          if (cars.isEmpty) {
            return const Center(child: Text('No cars available'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(8),
            itemCount: cars.length,
            itemBuilder: (context, index) => CarCard(car: cars[index]),
          );
        },
      ),
    );
  }
}
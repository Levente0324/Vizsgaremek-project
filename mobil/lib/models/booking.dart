import 'package:car_rental_mobile/models/car.dart';
import 'package:car_rental_mobile/models/extras.dart' as extra_model;
import 'package:car_rental_mobile/models/protection.dart';

class Booking {
  final int id;
  final int carId;
  final int userId;
  final DateTime startDate;
  final DateTime endDate;
  final double totalPrice;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Car car;
  final List<extra_model.Extra>? extras;
  final Protection? protection;

  const Booking({
    required this.id,
    required this.carId,
    required this.userId,
    required this.startDate,
    required this.endDate,
    required this.totalPrice,
    required this.createdAt,
    required this.updatedAt,
    required this.car,
    this.extras,
    this.protection,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'] as int,
      carId: json['carId'] as int,
      userId: json['userId'] as int,
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      totalPrice: (json['totalPrice'] as num).toDouble(),
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
      car: Car.fromJson(json['car'] as Map<String, dynamic>),
      protection: json['protection'] != null ? Protection(
        id: json['protection']['protectionPlanId'] as int,
        name: _getProtectionName(json['protection']['protectionPlanId'] as int),
        price: _getProtectionPrice(json['protection']['protectionPlanId'] as int),
        description: _getProtectionDescription(json['protection']['protectionPlanId'] as int),
      ) : null,
      extras: json['extras'] != null ? (json['extras'] as List<dynamic>).map((e) => 
        extra_model.Extra(
          id: e['extraId'] as int,
          name: _getExtraName(e['extraId'] as int),
          price: _getExtraPrice(e['extraId'] as int),
          description: _getExtraDescription(e['extraId'] as int),
        )
      ).toList() : null,
    );
  }

  static String _getProtectionName(int id) {
    switch (id) {
      case 1: return 'Basic';
      case 2: return 'Premium';
      case 3: return 'Full';
      case 4: return 'None';
      default: return 'Unknown';
    }
  }

  static double _getProtectionPrice(int id) {
    switch (id) {
      case 1: return 5000;
      case 2: return 8000;
      case 3: return 12000;
      case 4: return 0;
      default: return 0;
    }
  }

  static String _getProtectionDescription(int id) {
    switch (id) {
      case 1: return 'Basic coverage for minor damages';
      case 2: return 'Extended coverage including tire and glass';
      case 3: return 'Complete coverage with zero deductible';
      case 4: return 'No additional protection';
      default: return '';
    }
  }

  static String _getExtraName(int id) {
    switch (id) {
      case 1: return 'GPS Navigation';
      case 2: return 'Child Seat';
      case 3: return 'Additional Driver';
      case 4: return 'Airport Pickup';
      default: return 'Unknown';
    }
  }

  static double _getExtraPrice(int id) {
    switch (id) {
      case 1: return 2000;
      case 2: return 3000;
      case 3: return 5000;
      case 4: return 8000;
      default: return 0;
    }
  }

  static String _getExtraDescription(int id) {
    switch (id) {
      case 1: return 'Built in GPS navigation system';
      case 2: return 'Safe and comfortable child seat';
      case 3: return 'Register an additional driver';
      case 4: return 'Pickup service from airport';
      default: return '';
    }
  }
}
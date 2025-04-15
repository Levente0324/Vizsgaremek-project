class Car {
  final int id;
  final String manufacturer;
  final String model;
  final String type;
  final bool isAvailable;
  final int numberOfSeats;
  final int numberOfSuitcases;
  final String fuelType;
  final String clutchType;
  final double priceForOneDay;
  
  String get imageUrl => 'assets/car_images/$id.png';

  const Car({
    required this.id,
    required this.manufacturer,
    required this.model,
    required this.type,
    required this.isAvailable,
    required this.numberOfSeats,
    required this.numberOfSuitcases,
    required this.fuelType,
    required this.clutchType,
    required this.priceForOneDay,
  });

  factory Car.fromJson(Map<String, dynamic> json) => Car(
    id: json['id'] ?? 0,
    manufacturer: json['manufacturer'] ?? 'Unknown',
    model: json['model'] ?? 'Unknown',
    type: json['type'] ?? 'Not specified',
    isAvailable: json['isAvailable'] ?? true,
    numberOfSeats: json['numberOfSeats'] ?? 0,
    numberOfSuitcases: json['numberOfSuitcases'] ?? 0,
    fuelType: json['fuelType'] ?? 'Not specified',
    clutchType: json['clutchType'] ?? 'Not specified',
    priceForOneDay: (json['priceForOneDay'] ?? 0.0).toDouble(),
  );
}
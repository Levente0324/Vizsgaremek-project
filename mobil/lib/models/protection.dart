class Protection {
  final int id;
  final String name;
  final double price;
  final String description;

  const Protection({
    required this.id,
    required this.name,
    required this.price,
    required this.description,
  });

  factory Protection.fromJson(Map<String, dynamic> json) => Protection(
    id: json['id'] as int,
    name: json['name'] as String, 
    price: (json['price'] as num).toDouble(),
    description: json['description'] as String,
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'price': price,
    'description': description,
  };

  static List<Protection> get available => [
    const Protection(
      id: 1,
      name: 'Basic',
      description: 'Basic coverage for minor damages',
      price: 5000,
    ),
    const Protection(
      id: 2,
      name: 'Premium',
      description: 'Extended coverage including tire and glass',
      price: 8000,
    ),
    const Protection(
      id: 3,
      name: 'Full',
      description: 'Complete coverage with zero deductible',
      price: 12000,
    ),
    const Protection(
      id: 4,
      name: 'None',
      description: 'No additional protection',
      price: 0,
    ),
  ];
}
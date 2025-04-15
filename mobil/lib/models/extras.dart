class Extra {
  final int id;
  final String? name;
  final String? description;
  final double? price;

  const Extra({
    required this.id,
    this.name,
    this.description,
    this.price,
  });

  factory Extra.fromJson(Map<String, dynamic> json) => Extra(
    id: json['id'] as int,
    name: json['name'] as String?,
    description: json['description'] as String?,
    price: (json['price'] as num?)?.toDouble(),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'description': description,
    'price': price,
  };

  static List<Extra> get available => [
    const Extra(
      id: 1,
      name: 'GPS Navigation',
      description: 'Built-in GPS navigation system',
      price: 2000,
    ),
    const Extra(
      id: 2,
      name: 'Child Seat',
      description: 'Safe and comfortable child seat',
      price: 3000,
    ),
    const Extra(
      id: 3,
      name: 'Additional Driver',
      description: 'Register an additional driver',
      price: 5000,
    ),
    const Extra(
      id: 4,
      name: 'Airport Pickup',
      description: 'Pickup service from airport',
      price: 8000,
    ),
  ];
}
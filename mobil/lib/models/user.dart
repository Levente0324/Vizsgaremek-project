class User {
  final int? id;
  final String email;
  final String password;

  const User({
    this.id,
    required this.email,
    required this.password,
  });

  Map<String, dynamic> toJson() => {
    'email': email,
    'password': password,
  };

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['id'],
    email: json['email'],
    password: json['password'],
  );
}
import 'package:flutter/material.dart';

class CarImage extends StatelessWidget {
  final String imagePath;
  final String altText;

  const CarImage({
    super.key,
    required this.imagePath,
    required this.altText,
  });

  @override
  Widget build(BuildContext context) => AspectRatio(
    aspectRatio: 16 / 9,
    child: Image.asset(
      imagePath,
      fit: BoxFit.cover,
      errorBuilder: (context, error, stackTrace) => _buildErrorPlaceholder(context),
    ),
  );

  Widget _buildErrorPlaceholder(BuildContext context) => Container(
    color: Colors.grey[200],
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(
          Icons.directions_car,
          size: 64,
          color: Colors.grey,
        ),
        const SizedBox(height: 8),
        Text(
          'Image not found: ${imagePath.split('/').last}',
          style: TextStyle(color: Colors.grey[600]),
        ),
      ],
    ),
  );
}
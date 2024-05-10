import 'package:flutter/material.dart';
import 'package:hlo/Managers/colors.dart';

class HomeScreenButton extends StatelessWidget {
  const HomeScreenButton({
    super.key,
    this.badge,
    required this.name,
    required this.onPressed,
    required this.icon,
    this.showBadge = false,
    this.backgroundColor,
  });

  final String name;
  final VoidCallback onPressed;
  final IconData icon;
  final Widget? badge;
  final bool showBadge;
  final Color? backgroundColor;

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.topRight,
      children: [
        FloatingActionButton(
          heroTag: name, // button name
          mini: true,
          backgroundColor: backgroundColor ?? colors.secondaryColor,
          onPressed: onPressed,
          child: Icon(icon, color: colors.primaryColor),
        ),
        if (showBadge && badge != null)
          Positioned(
            right: 0,
            top: -5,
            child: Container(
              padding: const EdgeInsets.all(6),
              decoration: const BoxDecoration(
                color: colors.accentColor,
                shape: BoxShape.circle,
              ),
              child: badge,
            ),
          ),
      ],
    );
  }
}

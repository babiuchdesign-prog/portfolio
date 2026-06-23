import 'dart:io';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _signInWithGoogle() async {
    setState(() => _isLoading = true);
    final bool success;
    if (Platform.isIOS) {
      success = await AuthService.signInWithGoogleWeb();
    } else {
      success = await AuthService.signInWithGoogle();
    }
    setState(() => _isLoading = false);

    if (success && mounted) {
      context.go('/scan');
    } else if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Nie udało się zalogować. Spróbuj ponownie.'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF3B6D11),
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Column(
              children: [
                const Spacer(flex: 2),

                // Logo
                Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha:0.15),
                    borderRadius: BorderRadius.circular(28),
                  ),
                  child: const Icon(Icons.eco, size: 60, color: Colors.white),
                ),
                const SizedBox(height: 24),
                const Text(
                  'Zielnik',
                  style: TextStyle(
                    fontSize: 40,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                    letterSpacing: 1.5,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Rozpoznaj i zadbaj o swoje rosliny',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.white.withValues(alpha:0.75),
                  ),
                  textAlign: TextAlign.center,
                ),

                const Spacer(flex: 3),

                // Funkcje aplikacji
                _featureRow(
                  Icons.camera_alt_outlined,
                  'Rozpoznawaj rosliny zdjeciem',
                ),
                const SizedBox(height: 12),
                _featureRow(
                  Icons.notifications_outlined,
                  'Przypomnienia o podlewaniu',
                ),
                const SizedBox(height: 12),
                _featureRow(
                  Icons.local_florist_outlined,
                  'Twój własny zielnik',
                ),

                const Spacer(flex: 2),

                // Przycisk Google
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _isLoading ? null : _signInWithGoogle,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: const Color(0xFF1A1A1A),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                      elevation: 0,
                    ),
                    child: _isLoading
                        ? const SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Color(0xFF3B6D11),
                            ),
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              CachedNetworkImage(
                                imageUrl: 'https://www.google.com/favicon.ico',
                                width: 20,
                                height: 20,
                                placeholder: (context, url) =>
                                    const SizedBox(width: 20, height: 20),
                                errorWidget: (context, url, error) => const Icon(
                                  Icons.g_mobiledata,
                                  size: 24,
                                  color: Color(0xFF4285F4),
                                ),
                              ),
                              const SizedBox(width: 12),
                              const Text(
                                'Zaloguj się przez Google',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                  ),
                ),

                const SizedBox(height: 8),
                Text(
                  'Logujac sie akceptujesz Regulamin i Politike prywatnosci',
                  style: TextStyle(
                    fontSize: 11,
                    color: Colors.white.withValues(alpha:0.4),
                  ),
                  textAlign: TextAlign.center,
                ),

                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _featureRow(IconData icon, String text) {
    return Row(
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha:0.15),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, size: 18, color: Colors.white),
        ),
        const SizedBox(width: 12),
        Text(
          text,
          style: TextStyle(fontSize: 15, color: Colors.white.withValues(alpha:0.85)),
        ),
      ],
    );
  }
}

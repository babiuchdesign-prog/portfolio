import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:image_picker/image_picker.dart';
import '../features/plantdex/presentation/providers/plantdex_provider.dart';
import '../fluid_route.dart';
import '../services/ai_service.dart';
import '../services/auth_service.dart';
import '../services/exif_service.dart';
import '../services/subscription_service.dart';
import 'login_screen.dart';
import 'result_screen.dart';

class ScanScreen extends ConsumerStatefulWidget {
  const ScanScreen({super.key});

  @override
  ConsumerState<ScanScreen> createState() => _ScanScreenState();
}

class _ScanScreenState extends ConsumerState<ScanScreen> {
  final ImagePicker _picker = ImagePicker();
  final List<File> _selectedImages = [];
  bool _isAnalyzing = false;
  String _mode = 'plant';
  String _source = 'camera';
  UserLimit? _userLimit;

  @override
  void initState() {
    super.initState();
    if (!AuthService.isLoggedIn) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        Navigator.of(context).pushReplacement(
          FluidRoute(page: const LoginScreen()),
        );
      });
      return;
    }
    _loadLimit();
  }

  Future<void> _loadLimit() async {
    final limit = await SubscriptionService.getCurrentLimit();
    if (mounted) {
      setState(() {
        _userLimit = limit;
      });
    }
  }

  Future<void> _pickImage(ImageSource source) async {
    if (_selectedImages.length >= 2) return;
    try {
      final XFile? photo = await _picker.pickImage(
        source: source,
        imageQuality: 85,
        maxWidth: 1024,
      );
      if (photo == null) return;

      // Weryfikacja EXIF tylko dla galerii w trybie Plantdex (mode == 'plant').
      // Zielnik (AddPlantScreen) nie korzysta z tego przepływu, więc nie jest blokowany.
      if (source == ImageSource.gallery && _mode == 'plant') {
        final hasExif = await ExifService.hasValidCameraExif(photo.path);
        if (!hasExif) {
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text(
                  'Do Plantdexu przyjmujemy tylko autentyczne, własne fotografie. '
                  'Zdjęcie z galerii musi posiadać metadane aparatu 🌱',
                ),
                backgroundColor: Color(0xFF5F5E5A),
                duration: Duration(seconds: 5),
              ),
            );
          }
          return;
        }
      }

      setState(() {
        if (_selectedImages.isEmpty) {
          _source = source == ImageSource.camera ? 'camera' : 'gallery';
        }
        _selectedImages.add(File(photo.path));
      });
    } catch (e) {
      _showError('Nie udało się otworzyć aparatu: $e');
    }
  }

  void _showLimitInfo() {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Plan darmowy — limity'),
        content: const Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('• 3 skany dziennie'),
            SizedBox(height: 6),
            Text('• 4 miejsca'),
            SizedBox(height: 6),
            Text('• 4 rośliny na miejsce'),
            SizedBox(height: 6),
            Text('• 50 gatunków w Plantdexie'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  Future<void> _analyzeImage() async {
    if (_selectedImages.isEmpty) return;
    // Szybki pre-check po stronie klienta (UX) — właściwy enforcement jest na serwerze
    if (_source == 'camera' && _mode == 'plant') {
      final allowed = await SubscriptionService.canScan();
      if (!allowed) {
        _showError('Dzienny limit skanów wyczerpany. Odblokuj Premium po więcej!');
        await _loadLimit();
        return;
      }
    }
    setState(() => _isAnalyzing = true);
    final result = await AiService.analyzeImage(_selectedImages, _mode, source: _source);
    setState(() => _isAnalyzing = false);
    // Odswież licznik po skanie (serwer mógł go zinkrementować)
    await _loadLimit();
    if (result.success) {
      // Odśwież Plantdex i sprawdź osiągnięcia — fire-and-forget
      ref.read(plantdexProvider.notifier).loadData();
    }
    if (mounted) {
      if (!result.success && result.errorMessage != null) {
        _showScanError(result.errorMessage!);
        return;
      }
      Navigator.of(context).push(
          FluidRoute(page: ResultScreen(result: result)));
    }
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red[700]),
    );
  }

  void _showScanError(String message) {
    final isServerBusy = message.contains('⏳');
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor:
            isServerBusy ? const Color(0xFF5F5E5A) : Colors.red[700],
        duration: isServerBusy
            ? const Duration(seconds: 6)
            : const Duration(seconds: 4),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F6F2),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(58, 20, 58, 0),
              child: SizedBox(
                width: double.infinity,
                child: SvgPicture.asset(
                  'assets/icons/ic_logo.svg',
                  fit: BoxFit.fitWidth,
                ),
              ),
            ),
            if (_selectedImages.isEmpty) const Spacer() else const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.fromLTRB(19, 0, 19, 0),
              child: Container(
                height: 35,
                decoration: BoxDecoration(
                  color: const Color(0xFFF2F2F2),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0xFFDDDDDD), width: 0.5),
                ),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    final pillWidth = constraints.maxWidth / 2;
                    final pillLeft = _mode == 'plant' ? 0.0 : pillWidth;
                    return Stack(
                      children: [
                        AnimatedPositioned(
                          duration: const Duration(milliseconds: 320),
                          curve: Curves.easeInOutCubic,
                          left: pillLeft,
                          top: 0,
                          width: pillWidth,
                          height: 35,
                          child: Container(
                            margin: const EdgeInsets.all(3),
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [Color(0xFF203A0C), Color(0xFF5AA020)],
                                begin: Alignment.centerLeft,
                                end: Alignment.centerRight,
                              ),
                              borderRadius: BorderRadius.circular(8),
                            ),
                          ),
                        ),
                        Row(
                          children: [
                            _liquidTab('plant', 'Roślina', 'assets/icons/ic_plant.svg', 20),
                            _liquidTab('disease', 'Choroba', 'assets/icons/ic_disease.svg', 16),
                          ],
                        ),
                      ],
                    );
                  },
                ),
              ),
            ),
            if (_selectedImages.isEmpty) ...[
              const SizedBox(height: 12),
              IntrinsicHeight(child: _buildCameraPlaceholder()),
              const SizedBox(height: 12),
            ] else ...[
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(19, 8, 19, 8),
                  child: _buildImagePreview(),
                ),
              ),
            ],
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 19),
                child: Row(
                  children: [
                    // Galeria
                    Expanded(
                      child: Container(
                        height: 38,
                        decoration: BoxDecoration(
                          color: const Color(0xFFF2F2F2),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: const Color(0xFFDDDDDD),
                            width: 0.5,
                          ),
                        ),
                        child: Material(
                          color: Colors.transparent,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(10),
                            onTap: () => _pickImage(ImageSource.gallery),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                SvgPicture.asset(
                                  'assets/icons/ic_gallery.svg',
                                  width: 24,
                                  height: 24,
                                  colorFilter: const ColorFilter.mode(
                                      Color(0xFF203A0C), BlendMode.srcIn),
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  'Galeria',
                                  style: TextStyle(
                                    color: Color(0xFF203A0C),
                                    fontSize: 12,
                                    fontWeight: FontWeight.w400,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 15),
                    // Zrób zdjęcie / Analizuję
                    Expanded(
                      child: Container(
                        height: 38,
                        decoration: BoxDecoration(
                          color: const Color(0xFF3B6E11),
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: const Color(0xFF3B6E11),
                            width: 0.5,
                          ),
                        ),
                        child: Material(
                          color: Colors.transparent,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(10),
                            onTap: _isAnalyzing ? null : () => _pickImage(ImageSource.camera),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                _isAnalyzing
                                    ? const SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                            color: Colors.white, strokeWidth: 2),
                                      )
                                    : SvgPicture.asset(
                                        'assets/icons/ic_camera.svg',
                                        width: 24,
                                        height: 24,
                                        colorFilter: const ColorFilter.mode(
                                            Colors.white, BlendMode.srcIn),
                                      ),
                                const SizedBox(width: 8),
                                Text(
                                  _isAnalyzing
                                      ? 'Analizuję...'
                                      : _selectedImages.length == 1
                                          ? 'Dodaj 2. zdjęcie'
                                          : 'Zrób zdjęcie',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w300,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              if (_selectedImages.isEmpty) const Spacer(),
              Padding(
                padding: const EdgeInsets.only(bottom: 4),
                child: GestureDetector(
                  onTap: _showLimitInfo,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        _userLimit == null
                            ? 'Ładowanie...'
                            : _userLimit!.isPremium
                                ? '✨ Premium aktywne'
                                : '${_userLimit!.scansLeft} skanów dzisiaj pozostało',
                        style: const TextStyle(fontSize: 11, color: Color(0xFF888780)),
                      ),
                      const SizedBox(width: 4),
                      const Icon(Icons.info_outline, size: 14, color: Color(0xFFBBBBBB)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
    );
  }

  Widget _liquidTab(String mode, String label, String svgPath, double iconSize) {
    final bool isActive = _mode == mode;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _mode = mode),
        child: SizedBox(
          height: double.infinity,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SvgPicture.asset(
                svgPath,
                width: iconSize,
                height: iconSize,
                colorFilter: ColorFilter.mode(
                  isActive ? Colors.white : const Color(0xFF203A0C),
                  BlendMode.srcIn,
                ),
              ),
              const SizedBox(width: 6),
              Text(
                label,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: isActive ? Colors.white : const Color(0xFF203A0C),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCameraPlaceholder() {
    final isPlant = _mode == 'plant';
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(horizontal: 19),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF3B6E11), width: 2),
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 24, 16, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Text.rich(
                TextSpan(children: [
                  TextSpan(
                    text: isPlant
                        ? 'Zrób zdjęcie rośliny\n'
                        : 'Zrób zdjęcie chorego liścia\n',
                    style: const TextStyle(
                      color: Color(0xFF1A3A0A),
                      fontSize: 18,
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  TextSpan(
                    text: isPlant
                        ? 'aby ją zidentyfikować'
                        : 'aby zdiagnozować problem',
                    style: const TextStyle(
                      color: Color(0xFF1A3A0A),
                      fontSize: 18,
                      fontFamily: 'Inter',
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ]),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Jak zrobić dobre zdjęcie?',
              style: TextStyle(
                color: Color(0xFF888780),
                fontSize: 13,
                fontFamily: 'Inter',
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 12),
            if (_mode == 'plant') ...[
              _tipRow('🌿', 'Jeden liść lub cała roślina w kadrze'),
              const SizedBox(height: 12),
              _tipRow('☀️', 'Dobre oświetlenie — najlepiej przy oknie'),
              const SizedBox(height: 12),
              _tipRow('📏', 'Odległość 20–40 cm od rośliny'),
              const SizedBox(height: 12),
              _tipRow('🚫', 'Bez szyby, ciemności i rozmycia'),
            ] else ...[
              _tipRow('🍂', 'Sfotografuj chory liść z bliska'),
              const SizedBox(height: 12),
              _tipRow('☀️', 'Dobre oświetlenie — najlepiej dzienne'),
              const SizedBox(height: 12),
              _tipRow('🔍', 'Pokaż plamy, przebarwienia lub uszkodzenia'),
              const SizedBox(height: 12),
              _tipRow('📏', 'Odległość 10–20 cm od liścia'),
            ],
          ],
        ),
      ),
    );
  }

  Widget _tipRow(String emoji, String text) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(emoji, style: const TextStyle(fontSize: 20)),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(
              color: Color(0xFF5F5E5A),
              fontSize: 12,
              fontFamily: 'Inter',
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildImagePreview() {
    final hasTwoImages = _selectedImages.length == 2;

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF3B6E11), width: 2),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(18),
        child: Stack(
      children: [
        // Tlo — jedno zdjecie pelne, dwa — obok siebie
        if (hasTwoImages)
          Row(
            children: [
              Expanded(
                child: Image.file(_selectedImages[0],
                    height: double.infinity, fit: BoxFit.cover),
              ),
              const SizedBox(width: 2),
              Expanded(
                child: Image.file(_selectedImages[1],
                    height: double.infinity, fit: BoxFit.cover),
              ),
            ],
          )
        else
          Image.file(_selectedImages[0],
              width: double.infinity, fit: BoxFit.cover),

        // Przyciski X na kazda miniaturke
        if (!hasTwoImages)
          Positioned(
            top: 12,
            right: 12,
            child: _closeButton(() =>
                setState(() => _selectedImages.removeAt(0))),
          )
        else ...[
          Positioned(
            top: 12,
            left: 12,
            child: _closeButton(() =>
                setState(() => _selectedImages.removeAt(0))),
          ),
          Positioned(
            top: 12,
            right: 12,
            child: _closeButton(() =>
                setState(() => _selectedImages.removeAt(1))),
          ),
        ],

        // Przycisk Analizuj
        Positioned(
          bottom: 12,
          left: 0,
          right: 0,
          child: Center(
            child: ElevatedButton.icon(
              onPressed: _isAnalyzing ? null : _analyzeImage,
              icon: _isAnalyzing
                  ? const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(
                          color: Colors.white, strokeWidth: 2))
                  : const Icon(Icons.search, size: 18),
              label: Text(_isAnalyzing ? 'Analizuję...' : 'Analizuj zdjęcie'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF3B6D11),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ),
        ),
      ],
        ),
      ),
    );
  }

  Widget _closeButton(VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: Colors.black.withValues(alpha: 0.6),
          borderRadius: BorderRadius.circular(99),
        ),
        child: const Icon(Icons.close, color: Colors.white, size: 18),
      ),
    );
  }

}

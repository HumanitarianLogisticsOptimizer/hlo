import 'package:flutter/material.dart';
import 'package:hlo/Managers/network_manager.dart';
import 'package:hlo/Managers/colors.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:hlo/Screens/tasks.dart';

class ProfilePage extends StatefulWidget {
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final NetworkManager _networkManager = NetworkManager();
  Map<String, dynamic> _profileDetails = {};
  String email = '';
  String password = '';

  @override
  void initState() {
    super.initState();
    _checkLoggedIn();
  }

  Future<void> _checkLoggedIn() async {
    final isLoggedIn = await _networkManager.isUserLoggedIn();
    if (isLoggedIn) {
      _loadProfileDetails();
    }
  }

  Future<void> _loadProfileDetails() async {
    try {
      final profileDetails = await _networkManager.getProfileDetails();
      setState(() {
        _profileDetails = profileDetails;
      });
    } catch (e) {
      // Handle error
      print('Failed to load profile details: $e');
    }
  }

  Future<void> _login(String email, String password) async {
    if (email.isEmpty) {
      _showToast('Email cannot be blank');
      return;
    }
    if (password.isEmpty) {
      _showToast('Password cannot be blank');
      return;
    }

    try {
      final success = await _networkManager.login(email, password);
      if (success) {
        _loadProfileDetails();
      } else {
        _showToast('Login unsuccessful');
      }
    } catch (e) {
      // Handle error
      _showToast('Login unsuccessful');
      print('Failed to login: $e');
    }
  }

  void _showToast(String message) {
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 1,
      backgroundColor: Colors.red,
      textColor: Colors.white,
      fontSize: 16.0,
    );
  }

  Future<void> _logout() async {
    try {
      final success = await _networkManager.logout();
      if (success) {
        setState(() {
          _profileDetails.clear();
        });
      } else {
        // Handle logout failure
      }
    } catch (e) {
      // Handle error
      print('Failed to logout: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Profile'),
        backgroundColor: colors.accentColor,
      ),
      body: Center(
        child: _profileDetails.isNotEmpty ? _buildProfile() : _buildLoginForm(),
      ),
    );
  }

  Widget _buildProfile() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Welcome,',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 5),
        Text(
          _profileDetails['email'],
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(''),
        SizedBox(height: 20),
        SizedBox(
          width: 100,
          child: ElevatedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(colors.accentColor),
            ),
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const TasksPage(),
                ),
              );
            },
            child: Text('Tasks'),
          ),
        ),
        SizedBox(height: 10),
        SizedBox(
          width: 100,
          child: ElevatedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(colors.accentColor),
            ),
            onPressed: _logout,
            child: Text('Logout'),
          ),
        ),
      ],
    );
  }

  Widget _buildLoginForm() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextField(
          onChanged: (value) => email = value,
          decoration: InputDecoration(labelText: 'Email'),
        ),
        TextField(
          onChanged: (value) => password = value,
          decoration: InputDecoration(labelText: 'Password'),
          obscureText: true,
        ),
        SizedBox(height: 20),
        ElevatedButton(
          style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all(colors.accentColor),
          ),
          onPressed: () => _login(email, password),
          child: Text('Login'),
        ),
      ],
    );
  }
}

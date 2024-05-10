import 'package:flutter/material.dart';
import 'package:hlo/Managers/colors.dart';
import 'package:hlo/Managers/network_manager.dart';

class TasksPage extends StatefulWidget {
  const TasksPage({Key? key}) : super(key: key);

  @override
  _TasksPageState createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  final NetworkManager _networkManager = NetworkManager();
  List<Map<String, dynamic>> _tasks = [];
  int _userId = 0; // Initialize user ID
  List<Acc> _accs = [];
  List<Adc> _adcs = [];

  @override
  void initState() {
    super.initState();
    _loadProfileDetails(); // Load profile details to get user ID
    _loadAccs(); // Load ACCs
    _loadAdcs(); // Load ADCs
  }

  Future<void> _loadProfileDetails() async {
    try {
      final profileDetails = await _networkManager.getProfileDetails();
      setState(() {
        _userId = profileDetails['id']; // Assign user ID
      });

      // Determine user type
      final userType = profileDetails['user_type'];
      if (userType == 'volunteer_courier') {
        // Fetch volunteer tasks
        _loadVolunteerTasks();
      } else if (userType == 'enterprise_courier') {
        // Fetch enterprise tasks
        _loadEnterpriseTasks();
      } else {
        // Handle unsupported user type
        print('Unsupported user type: $userType');
      }
    } catch (e) {
      // Handle error
      print('Failed to load profile details: $e');
    }
  }

  Future<void> _loadVolunteerTasks() async {
    try {
      final tasks = await _networkManager.getVolunteerTasks(_userId);
      setState(() {
        _tasks = tasks;
      });
    } catch (e) {
      // Handle error
      print('Failed to load volunteer tasks: $e');
    }
  }

  Future<void> _loadEnterpriseTasks() async {
    try {
      final tasks = await _networkManager.getEnterpriseTasks();
      setState(() {
        _tasks = tasks;
      });
    } catch (e) {
      // Handle error
      print('Failed to load enterprise tasks: $e');
    }
  }

  Future<void> _loadAccs() async {
    try {
      final accs = await _networkManager.getAllAccs();
      setState(() {
        _accs = accs;
      });
    } catch (e) {
      // Handle error
      print('Failed to load ACCs: $e');
    }
  }

  Future<void> _loadAdcs() async {
    try {
      final adcs = await _networkManager.getAllAdcs();
      setState(() {
        _adcs = adcs;
      });
    } catch (e) {
      // Handle error
      print('Failed to load ADCs: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Tasks'),
        backgroundColor: colors.accentColor,
      ),
      body: _buildTaskList(),
    );
  }

 Widget _buildTaskList() {
  if (_tasks.isEmpty) {
    return const Center(
      child: Text('No tasks found'),
    );
  } else {
    return ListView.builder(
      itemCount: _tasks.length,
      itemBuilder: (context, index) {
        final task = _tasks[index];
        final accId = task['source'] as int;
        final adcId = task['target'] as int;
        final accName = _getAccName(accId);
        final adcName = _getAdcName(adcId);
        Color backgroundColor;

        // Set background color based on task status
        switch (task['status']) {
          case 'Pending':
            backgroundColor = Colors.yellow;
            break;
          case 'On the road':
            backgroundColor = Colors.blue;
            break;
          case 'Done':
            backgroundColor = Colors.green;
            break;
          default:
            backgroundColor = Colors.transparent;
            break;
        }

        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
          child: GestureDetector(
            onTap: () => _onTaskTap(task),
            child: Container(
              decoration: BoxDecoration(
                color: backgroundColor,
                borderRadius: BorderRadius.circular(12.0),
              ),
              child: ListTile(
                title: Text("${task['load_quantity']} × " + task['load_type']),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('From: $accName'),
                    Text('To: $adcName'),
                    Text('Status: ${task['status']}'),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}


  String _getAccName(int accId) {
    final acc = _accs.firstWhere((element) => element.id == accId, orElse: () => Acc(0, '', '', '', 0));
    return acc.name;
  }

  String _getAdcName(int adcId) {
    final adc = _adcs.firstWhere((element) => element.id == adcId, orElse: () => Adc(0, '', '', '', 0));
    return adc.name;
  }

  Future<void> _onTaskTap(Map<String, dynamic> task) async {
    String? code;
    if (task['status'] == 'Pending') {
      code = task['source_code'];
    } else if (task['status'] == 'On the road') {
      code = task['target_code'];
    }

    if (code != null) {
      await showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Code: $code'),
            content: Text('From: ${_getAccName(task['source'] as int)}\nTo: ${_getAdcName(task['target'] as int)}\n\n${task['load_quantity']} × ${task['load_type']}'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  //TODO:Refresh the task list
                  _loadProfileDetails();
                },
                child: Text('Close'),
              ),
            ],
          );
        },
      );
    }
  }
}

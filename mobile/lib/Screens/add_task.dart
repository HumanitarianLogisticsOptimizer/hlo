import 'package:flutter/material.dart';
import 'package:hlo/Managers/colors.dart';


class AddTaskPage extends StatelessWidget {
  const AddTaskPage({super.key});


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Task'),
        backgroundColor: colors.accentColor,

      ),
      body: Center(
        child: Text('Tasks will be displayed here.'),
      ),
    );
  }
}

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import {
  sendPushNotification,
  registerForPushNotificationsAsync,
} from '../components/ServiceNotification';




const ReminderNotfyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
      }
    });
  }, []);

  const addTask = async () => {
    if (!title.trim() && !body.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      body,
    };

    setTasks(prev => [...prev, newTask]);
    setTitle('');
    setBody('');

    await sendPushNotification(
      expoPushToken,
      newTask.title,
      newTask.body
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      {item.body ? <Text style={styles.taskBody}>{item.body}</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>

      <TextInput
        placeholder="Enter task title..."
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter task body..."
        placeholderTextColor="#999"
        value={body}
        onChangeText={setBody}
        style={styles.input}
      />

      <TouchableOpacity onPress={addTask} style={styles.button}>
        <Text style={styles.buttonText}>+ Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet 👀 </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ecf0f1',
    marginTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  taskBody: {
    marginTop: 4,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#9CA3AF',
    fontSize: 16,
  },
});

export default ReminderNotfyTask;

import { StyleSheet, View } from 'react-native';

// or any files within the Snack
import ReminderNotfyTask from './components/RemindNotfyTask';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  return (
    <View style={styles.container}>
      <ReminderNotfyTask/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop:20,
  },
  
});

export default App;
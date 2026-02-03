import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice && Platform.OS !== 'web') {
    alert('Must use physical device');
    return;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Permission denied');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);
  return token;
}


export async function sendPushNotification(expoPushToken, taskTitle) {
  if (!expoPushToken) return;
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: '🆕 New Task Added',
    body: taskTitle,
    data: { taskTitle },
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

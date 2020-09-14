//import { Notifications, Permissions } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';

const NOTIFICATION_KEY = 'KEY:KEY';

export function createLocalNotification() {
  return {
    title: 'Deck App',
    body: 'It is time to start reviewing your questions',
    ios: {
      sound: true,
    },
    android: {
      Sound: true,
      Priority: 'hight',
      sticky: false,
      vibrate: true,
    },
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelScheduledNotificationAsync,
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      //the key doesn't exist
      if (data === null) {
        // ask for permission
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            //   if status is granted
            if (status === 'granted') {
              //cancel all existing notifications
              Notifications.cancelScheduledNotificationAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate());
              tomorrow.setHours(18);
              tomorrow.setMinutes(5);

              //schedule the notification
              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                },
              );

              //save the key to local storage
              AsyncStorage.setItem(
                NOTIFICATION_KEY,
                JSON.stringify(true),
              );
            }
          })
          .catch((e) => {
            console.log({ error: e });
          });
      }
    });
}

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ProfileTab: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          ConnectionsTab: {
            screens: {
              ConnectionsScreen: 'connections',
            },
          },
          NotificationsTab: {
            screens: {
              NotificationsScreen: 'notifications',
            },
          }
        },
      },
      NotFound: '*',
    },
  },
};

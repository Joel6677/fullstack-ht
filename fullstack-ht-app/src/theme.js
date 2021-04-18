import { Platform } from 'react-native';

const theme = {
  roundness: 30,
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#FFFFFF',
    primary: '#334b8b',
    mainBackground: 'white',
    error: '#d73a4a',
    divider: '#d1d5da',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 30
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  }
};

export default theme;
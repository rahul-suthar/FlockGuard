import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const Report = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Report</Text>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBg,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 90,
  },
});
